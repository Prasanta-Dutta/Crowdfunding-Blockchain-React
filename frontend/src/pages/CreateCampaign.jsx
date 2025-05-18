import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseEther } from "ethers";
import { getCrowdFundingContract } from "../utils/connectContract";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [campaignType, setCampaignType] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    deadline: "",
  });

  const handleCampaignTypeSelect = (type) => {
    setCampaignType(type);
    setStep(2);
  };

  const handleFileChange = (e) => setPdfFile(e.target.files[0]);

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const typedarray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const text = content.items.map((item) => item.str).join(" ");
          fullText += text + "\n";
        }
        resolve(fullText);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleAnalyze = async () => {
    if (!pdfFile) return alert("Please upload the document.");
    const extractedText = await extractTextFromPDF(pdfFile);

    try {
      const res = await axios.post("/api/keyword/match-keywords", {
        type: campaignType,
        text: extractedText,
      });

      const matched = res.data.matches;

      if (matched.length === 0) {
        alert("Sorry! You are not applicable to create a campaign.");
        return;
      }

      setMatchedKeywords(matched);
      setStep(3);
    } catch (error) {
      console.error("Keyword match error:", error);
      alert("Failed to analyze PDF. Please try again.");
    }
  };

  // const handleChange = (e) =>
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveCampaignToDB = async (campaignData) => {
    try {
      const walletAddress = (await window.ethereum.request({ method: 'eth_accounts' }))[0];

      const res = await axios.post("/api/campaign/create-campaign", campaignData, { withCredentials: true } );
      console.log("✅ Campaign saved to DB:", res.data);
      return res.data;
    } 
    catch (error) {
      console.error("❌ Error saving campaign to DB:", error);
      throw new Error("Failed to save campaign to database.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (connecting) return alert("Please wait, connecting to MetaMask...");

    setLoading(true);
    setConnecting(true);

    const { title, description, targetAmount, deadline } = formData;
    const deadlineTimestamp = new Date(deadline).getTime() / 1000;
    const now = Math.floor(Date.now() / 1000);
    const durationDays = Math.ceil((deadlineTimestamp - now) / (60 * 60 * 24));

    if (durationDays <= 0) {
      alert("Deadline must be in the future!");
      setLoading(false);
      setConnecting(false);
      return;
    }

    try {
      console.log("✅ Checking MetaMask...");
      if (!window.ethereum) {
        alert("Please install MetaMask to continue.");
        setLoading(false);
        setConnecting(false);
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("✅ MetaMask connected");

      const contract = await getCrowdFundingContract();
      console.log("✅ Contract loaded", contract);

      const txn = await contract.createCampaign(
        title,
        description,
        campaignType,
        parseEther(targetAmount),
        durationDays
      );
      console.log("✅ Transaction sent:", txn);

      await txn.wait();
      console.log("✅ Transaction confirmed");

      const campaignData = {
        ...formData,
        type: campaignType
      };
      
      await saveCampaignToDB(campaignData);

      alert("Campaign created successfully!");
      navigate("/");
    } catch (error) {
      console.error("❌ Error creating campaign:", error);
      alert(error?.message || "Failed to create campaign.");
    } finally {
      setLoading(false);
      setConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-emerald-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">
              Step 1: Select Campaign Type
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Educational", "Healthcare", "Wildlife"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleCampaignTypeSelect(type)}
                  className="p-4 bg-emerald-400 hover:bg-emerald-600 rounded-lg text-white font-semibold"
                >
                  {type}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">
              Step 2: Upload the Proof PDF
            </h2>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mb-4"
            />
            <button
              onClick={handleAnalyze}
              className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
            >
              Analyze PDF
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">
              Step 3: Create Campaign
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                rows="4"
                required
              />
              <input
                type="number"
                name="targetAmount"
                placeholder="Target Amount"
                value={formData.targetAmount}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <button
                className="bg-emerald-600 w-full text-white py-2 rounded-lg hover:bg-emerald-700"
                disabled={loading || connecting}
              >
                {loading ? "Creating..." : "Submit Campaign"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateCampaign;
