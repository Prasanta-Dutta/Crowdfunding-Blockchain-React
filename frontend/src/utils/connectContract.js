import { BrowserProvider, Contract } from 'ethers';
import CrowdFunding from "../contract/CrowdFunding.json";


const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export const getCrowdFundingContract = async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return null;
    }

    const provider = new BrowserProvider(window.ethereum);

    const accounts = await provider.send("eth_accounts", []);
    if (accounts.length === 0) {
        try {
            // ⚠️ Only request connection if needed
            await provider.send("eth_requestAccounts", []);
        } catch (error) {
            console.error("User denied wallet connection", error);
            throw new Error("Wallet connection was denied.");
        }
    }

    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, CrowdFunding.abi, signer);
    return contract;
};