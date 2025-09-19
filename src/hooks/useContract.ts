import { useWriteContract, useReadContract } from 'wagmi';
import { contractABI } from '../lib/contractABI';

// Contract address - replace with your deployed contract address
const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere" as `0x${string}`;

export const useCreateInvoice = () => {
  return useWriteContract({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'createInvoice',
  });
};

export const useRequestFinancing = () => {
  return useWriteContract({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'requestFinancing',
  });
};

export const useSubmitSupplyChainData = () => {
  return useWriteContract({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'recordSupplyChainEvent',
  });
};

export const useGetInvoiceAmount = (invoiceId: number) => {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'getInvoiceAmount',
    args: [BigInt(invoiceId)],
  });
};

export const useGetInvoiceStatus = (invoiceId: number) => {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'getInvoiceStatus',
    args: [BigInt(invoiceId)],
  });
};

export const useGetSupplierReputation = (supplier: `0x${string}`) => {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'getSupplierReputation',
    args: [supplier],
  });
};