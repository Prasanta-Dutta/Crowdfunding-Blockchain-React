/*
import { BrowserProvider, Contract } from 'ethers';
import CrowdFunding from "../contract/CrowdFunding.json";


const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

let isConnecting = false;

export const getCrowdFundingContract = async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return null;
    }

    if(isConnecting) {
        console.error(`Wallet connection already in progress.`);
        throw new Error(`Wallet connection already in progress. Please wait.`);
    }

    const provider = new BrowserProvider(window.ethereum);

    let accounts = await provider.send("eth_accounts", []);
    if (accounts.length === 0) {
        try {
            // ⚠️ Only request connection if needed
            isConnecting = true;
            accounts = await provider.send("eth_requestAccounts", []);
        } catch (error) {
            console.error("User denied wallet connection", error);
            throw new Error("Wallet connection was denied.");
        } finally {
            isConnecting = false;
        }
    }

    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, CrowdFunding.abi, signer);
    return contract;
};
*/




import { BrowserProvider, JsonRpcProvider, Contract } from 'ethers';
import CrowdFunding from "../contract/CrowdFunding.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const INFURA_RPC_URL = process.env.REACT_APP_INFURA_RPC_URL;

// 🔄 Export two contract providers
export const getCrowdFundingContract = async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return null;
    }

    const provider = new BrowserProvider(window.ethereum);

    let accounts = await provider.send("eth_accounts", []);
    if (accounts.length === 0) {
        try {
            await provider.send("eth_requestAccounts", []);
        } catch (error) {
            console.error("User denied wallet connection", error);
            throw new Error("Wallet connection was denied.");
        }
    }

    const signer = await provider.getSigner();
    return new Contract(contractAddress, CrowdFunding.abi, signer);
};

export const getCrowdFundingContractReadOnly = () => {
    const readOnlyProvider = new JsonRpcProvider(INFURA_RPC_URL);
    return new Contract(contractAddress, CrowdFunding.abi, readOnlyProvider);
};
