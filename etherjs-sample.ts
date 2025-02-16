import { ethers } from "ethers";
import { abi as contractAbi } from "./abi.json";
import dotenv from "dotenv";
dotenv.config();

const abi = contractAbi;
const contractAddress = process.env.CONTRACT_ADDRESS!;
const privateKey = process.env.PRIVATE_KEY!;
const rpcUrl = process.env.SEPOLIA_RPC_URL!;

const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

const subscriptionContract = new ethers.Contract(contractAddress, abi, wallet);

async function subscribe() {
  try {
    const fee = ethers.parseEther("0.01");
    const tx = await subscriptionContract.startSubscription({ value: fee });
    await tx.wait();
    console.log("Subscribed successfully");
  } catch (error) {
    console.log(error);
  }
}

async function cancelSubscription() {
  try {
    const tx = await subscriptionContract.cancelSubscription();
    await tx.wait();
    console.log("Subscription cancelled successfully");
  } catch (error) {
    console.log(error);
  }
}

// subscribe();
cancelSubscription();
