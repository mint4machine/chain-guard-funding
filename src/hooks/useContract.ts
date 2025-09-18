import { useContract, useContractRead, useContractWrite, useAccount } from 'wagmi';
import { ChainGuardFundingABI } from '../lib/contractABI';

const CONTRACT_ADDRESS = '0x...'; // Replace with deployed contract address

export function useChainGuardContract() {
  const { address } = useAccount();
  
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ChainGuardFundingABI,
  });

  return {
    contract,
    address,
  };
}

export function useCreateInvoice() {
  const { contract } = useChainGuardContract();
  
  return useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ChainGuardFundingABI,
    functionName: 'createInvoice',
  });
}

export function useRequestFinancing() {
  const { contract } = useChainGuardContract();
  
  return useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ChainGuardFundingABI,
    functionName: 'requestFinancing',
  });
}

export function useApproveFinancing() {
  const { contract } = useChainGuardContract();
  
  return useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ChainGuardFundingABI,
    functionName: 'approveFinancing',
  });
}

export function useFundRequest() {
  const { contract } = useChainGuardContract();
  
  return useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ChainGuardFundingABI,
    functionName: 'fundRequest',
  });
}

export function useSubmitSupplyChainData() {
  const { contract } = useChainGuardContract();
  
  return useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ChainGuardFundingABI,
    functionName: 'submitSupplyChainData',
  });
}

export function useVerifySupplyChain() {
  const { contract } = useChainGuardContract();
  
  return useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ChainGuardFundingABI,
    functionName: 'verifySupplyChain',
  });
}

export function useInvoiceInfo(invoiceId: number) {
  return useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ChainGuardFundingABI,
    functionName: 'getInvoiceInfo',
    args: [BigInt(invoiceId)],
  });
}

export function useFinancingRequestInfo(requestId: number) {
  return useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ChainGuardFundingABI,
    functionName: 'getFinancingRequestInfo',
    args: [BigInt(requestId)],
  });
}

export function useSupplyChainInfo(shipmentId: number) {
  return useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ChainGuardFundingABI,
    functionName: 'getSupplyChainInfo',
    args: [BigInt(shipmentId)],
  });
}
