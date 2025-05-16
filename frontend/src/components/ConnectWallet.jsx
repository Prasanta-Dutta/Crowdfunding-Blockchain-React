import { MetamaskLogo } from './index';
import { toast } from 'react-toastify';

const ConnectWallet = () => {
    const handleConnectWallet = async () => {
        try {
            if (!window.ethereum) {
                throw new Error("MetaMask is not installed");
            }

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected accounts:", accounts);
        }
        catch (error) {
            console.error("Wallet connection error:", error);
            toast.error(`Failed to connect wallet: ${error.message || error}`, {
                position: 'top-center',
            });
        }
    };

    return (
        <button
            className="h-12 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:text-teal-200 focus:ring-4 focus:ring-gray-100 font-semibold rounded shadow-md text-sm px-6 py-2.5 me-2.5 my-auto dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 text-center inline-flex "
            onClick={handleConnectWallet}
        >
            <MetamaskLogo />
            Connect
        </button>
    );
};

export default ConnectWallet;