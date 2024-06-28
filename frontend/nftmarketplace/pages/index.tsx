import { useWeb3Contract, useMoralis } from "react-moralis";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ABI, SEPOLIA_CONTRACT_ADDRESS } from "../constants/constants";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function Home() {
  const { isWeb3Enabled } = useMoralis();
  const dispatch = useNotification();
  const { runContractFunction, isFetching, isLoading } = useWeb3Contract({
    abi: ABI,
    contractAddress: SEPOLIA_CONTRACT_ADDRESS,
    functionName: "mintNFT",
    msgValue: ethers.utils.parseUnits("0.011", "ether"),
    params: {},
  });

  async function successNotification(tx: any) {
    try {
      tx.wait(1);
      dispatch({
        type: "success",
        message: "",
        title: "NFT Minted",
        position: "topR",
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function errorNotification() {
    try {
      dispatch({
        type: "error",
        message: "Unknown Error occurred",
        title: "Error",
        position: "topR",
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Header />
      {isWeb3Enabled ? (
        <div className="py-20 items-center justify-center">
          <button
            className="p-5 h-40 w-96 ml-96 text-2xl rounded-lg items-center justify-center bg-gradient-to-br from-purple-900 to-teal-500"
            onClick={async () => {
              runContractFunction({
                onSuccess: successNotification,
                onError: errorNotification,
              });
            }}
            disabled={isFetching || isLoading}
          >
            Mint NFT
          </button>
        </div>
      ) : (
        <p className="py-20 text-center text-md">Please connect your wallet</p>
      )}
      <Footer />
    </>
  );
}
