import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useCreateInvoice, useRequestFinancing, useSubmitSupplyChainData } from '@/hooks/useContract';
import { FileText, Lock, Database, Zap, CheckCircle, AlertCircle, Key, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { 
  createEncryptedInvoiceData, 
  createEncryptedFinancingData, 
  createEncryptedSupplyChainData,
  FHEEncryptedData 
} from '@/lib/fheEncryption';

const ContractInteraction = () => {
  const { address, isConnected } = useAccount();
  const [invoiceData, setInvoiceData] = useState({
    amount: '',
    dueDate: '',
    paymentTerms: '',
    invoiceHash: '',
    buyer: ''
  });
  const [financingData, setFinancingData] = useState({
    invoiceId: '',
    requestedAmount: '',
    interestRate: '',
    requestHash: ''
  });
  const [supplyChainData, setSupplyChainData] = useState({
    invoiceId: '',
    quantity: '',
    qualityScore: '',
    deliveryTime: '',
    trackingHash: ''
  });

  // Contract hooks
  const { writeContract: createInvoice, data: createHash, isPending: isCreating } = useCreateInvoice();
  const { writeContract: requestFinancing, data: requestHash, isPending: isRequesting } = useRequestFinancing();
  const { writeContract: submitSupplyChain, data: supplyHash, isPending: isSubmitting } = useSubmitSupplyChainData();

  // Wait for transaction receipts
  const { isLoading: isConfirmingCreate } = useWaitForTransactionReceipt({
    hash: createHash,
  });

  const { isLoading: isConfirmingRequest } = useWaitForTransactionReceipt({
    hash: requestHash,
  });

  const { isLoading: isConfirmingSupply } = useWaitForTransactionReceipt({
    hash: supplyHash,
  });

  const handleCreateInvoice = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!invoiceData.amount || !invoiceData.dueDate || !invoiceData.paymentTerms || !invoiceData.buyer) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      toast.loading('Encrypting invoice data with FHE...', { id: 'encrypting' });

      // Create FHE encrypted invoice data
      const encryptedInvoiceData = await createEncryptedInvoiceData(
        parseFloat(invoiceData.amount),
        parseInt(invoiceData.dueDate),
        invoiceData.paymentTerms,
        invoiceData.invoiceHash,
        invoiceData.buyer
      );

      toast.loading('Submitting encrypted data to blockchain...', { id: 'encrypting' });

      // Submit encrypted data to smart contract
      await createInvoice({
        args: [
          encryptedInvoiceData.encryptedAmount.encryptedValue,
          encryptedInvoiceData.encryptedDueDate.encryptedValue,
          encryptedInvoiceData.encryptedPaymentTerms.encryptedValue,
          invoiceData.invoiceHash,
          invoiceData.buyer as `0x${string}`,
          encryptedInvoiceData.encryptedAmount.proof
        ],
        value: 0n
      });

      toast.dismiss('encrypting');
      toast.success('FHE Encrypted Invoice created successfully!', {
        description: `Invoice ID: ${Date.now()}, Encrypted with FHE`
      });

      // Reset form
      setInvoiceData({
        amount: '',
        dueDate: '',
        paymentTerms: '',
        invoiceHash: '',
        buyer: ''
      });

    } catch (error) {
      console.error('Error creating FHE encrypted invoice:', error);
      toast.dismiss('encrypting');
      toast.error('Failed to create FHE encrypted invoice', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const handleRequestFinancing = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!financingData.invoiceId || !financingData.requestedAmount || !financingData.interestRate) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      toast.loading('Encrypting financing data with FHE...', { id: 'financing' });

      // Create FHE encrypted financing data
      const encryptedFinancingData = await createEncryptedFinancingData(
        parseInt(financingData.invoiceId),
        parseFloat(financingData.requestedAmount),
        parseFloat(financingData.interestRate),
        financingData.requestHash
      );

      toast.loading('Submitting encrypted financing request to blockchain...', { id: 'financing' });

      await requestFinancing({
        args: [
          BigInt(financingData.invoiceId),
          encryptedFinancingData.encryptedRequestedAmount.encryptedValue,
          encryptedFinancingData.encryptedInterestRate.encryptedValue,
          financingData.requestHash,
          encryptedFinancingData.encryptedRequestedAmount.proof
        ],
        value: 0n
      });

      toast.dismiss('financing');
      toast.success('FHE Encrypted Financing Request submitted!', {
        description: `Request ID: ${Date.now()}, Encrypted with FHE`
      });

      // Reset form
      setFinancingData({
        invoiceId: '',
        requestedAmount: '',
        interestRate: '',
        requestHash: ''
      });

    } catch (error) {
      console.error('Error requesting FHE encrypted financing:', error);
      toast.dismiss('financing');
      toast.error('Failed to submit FHE encrypted financing request', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const handleSubmitSupplyChain = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!supplyChainData.invoiceId || !supplyChainData.quantity || !supplyChainData.qualityScore || !supplyChainData.deliveryTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      toast.loading('Encrypting supply chain data with FHE...', { id: 'supply' });

      // Create FHE encrypted supply chain data
      const encryptedSupplyChainData = await createEncryptedSupplyChainData(
        parseInt(supplyChainData.invoiceId),
        parseFloat(supplyChainData.quantity),
        parseFloat(supplyChainData.qualityScore),
        parseInt(supplyChainData.deliveryTime),
        supplyChainData.trackingHash
      );

      toast.loading('Submitting encrypted supply chain data to blockchain...', { id: 'supply' });

      await submitSupplyChain({
        args: [
          BigInt(supplyChainData.invoiceId),
          encryptedSupplyChainData.encryptedQuantity.encryptedValue,
          encryptedSupplyChainData.encryptedQualityScore.encryptedValue,
          encryptedSupplyChainData.encryptedDeliveryTime.encryptedValue,
          supplyChainData.trackingHash,
          encryptedSupplyChainData.encryptedQuantity.proof
        ],
        value: 0n
      });

      toast.dismiss('supply');
      toast.success('FHE Encrypted Supply Chain Data submitted!', {
        description: `Event ID: ${Date.now()}, Encrypted with FHE`
      });

      // Reset form
      setSupplyChainData({
        invoiceId: '',
        quantity: '',
        qualityScore: '',
        deliveryTime: '',
        trackingHash: ''
      });

    } catch (error) {
      console.error('Error submitting FHE encrypted supply chain data:', error);
      toast.dismiss('supply');
      toast.error('Failed to submit FHE encrypted supply chain data', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };


  if (!isConnected) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Wallet Not Connected</h3>
        <p className="text-muted-foreground">Please connect your wallet to interact with smart contracts</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Create Invoice Section */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-6 h-6 text-gold" />
          <h3 className="text-xl font-semibold">Create Encrypted Invoice</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="amount">Amount (FHE Encrypted)</Label>
            <Input
              id="amount"
              value={invoiceData.amount}
              onChange={(e) => setInvoiceData({...invoiceData, amount: e.target.value})}
              placeholder="Enter amount"
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date (FHE Encrypted)</Label>
            <Input
              id="dueDate"
              value={invoiceData.dueDate}
              onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
              placeholder="Enter due date"
            />
          </div>
          <div>
            <Label htmlFor="paymentTerms">Payment Terms (FHE Encrypted)</Label>
            <Input
              id="paymentTerms"
              value={invoiceData.paymentTerms}
              onChange={(e) => setInvoiceData({...invoiceData, paymentTerms: e.target.value})}
              placeholder="Enter payment terms"
            />
          </div>
          <div>
            <Label htmlFor="buyer">Buyer Address</Label>
            <Input
              id="buyer"
              value={invoiceData.buyer}
              onChange={(e) => setInvoiceData({...invoiceData, buyer: e.target.value})}
              placeholder="0x..."
            />
          </div>
        </div>
        
        <div className="mb-4">
          <Label htmlFor="invoiceHash">Invoice Hash</Label>
          <Input
            id="invoiceHash"
            value={invoiceData.invoiceHash}
            onChange={(e) => setInvoiceData({...invoiceData, invoiceHash: e.target.value})}
            placeholder="Enter invoice hash"
          />
        </div>

        <Button 
          onClick={handleCreateInvoice}
          disabled={isCreating || isConfirmingCreate}
          className="w-full"
        >
          {isCreating || isConfirmingCreate ? (
            <>
              <Key className="w-4 h-4 mr-2 animate-spin" />
              Encrypting & Creating Invoice...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Create FHE Encrypted Invoice
            </>
          )}
        </Button>
      </Card>

      {/* Request Financing Section */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="w-6 h-6 text-trust" />
          <h3 className="text-xl font-semibold">Request Financing</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="invoiceId">Invoice ID</Label>
            <Input
              id="invoiceId"
              value={financingData.invoiceId}
              onChange={(e) => setFinancingData({...financingData, invoiceId: e.target.value})}
              placeholder="Enter invoice ID"
            />
          </div>
          <div>
            <Label htmlFor="requestedAmount">Requested Amount (FHE Encrypted)</Label>
            <Input
              id="requestedAmount"
              value={financingData.requestedAmount}
              onChange={(e) => setFinancingData({...financingData, requestedAmount: e.target.value})}
              placeholder="Enter requested amount"
            />
          </div>
          <div>
            <Label htmlFor="interestRate">Interest Rate (FHE Encrypted)</Label>
            <Input
              id="interestRate"
              value={financingData.interestRate}
              onChange={(e) => setFinancingData({...financingData, interestRate: e.target.value})}
              placeholder="Enter interest rate"
            />
          </div>
          <div>
            <Label htmlFor="requestHash">Request Hash</Label>
            <Input
              id="requestHash"
              value={financingData.requestHash}
              onChange={(e) => setFinancingData({...financingData, requestHash: e.target.value})}
              placeholder="Enter request hash"
            />
          </div>
        </div>

        <Button 
          onClick={handleRequestFinancing}
          disabled={isRequesting || isConfirmingRequest}
          className="w-full"
        >
          {isRequesting || isConfirmingRequest ? (
            <>
              <Key className="w-4 h-4 mr-2 animate-spin" />
              Encrypting & Submitting Request...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Submit FHE Encrypted Financing Request
            </>
          )}
        </Button>
      </Card>

      {/* Submit Supply Chain Data Section */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Database className="w-6 h-6 text-accent" />
          <h3 className="text-xl font-semibold">Submit Supply Chain Data</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="supplyInvoiceId">Invoice ID</Label>
            <Input
              id="supplyInvoiceId"
              value={supplyChainData.invoiceId}
              onChange={(e) => setSupplyChainData({...supplyChainData, invoiceId: e.target.value})}
              placeholder="Enter invoice ID"
            />
          </div>
          <div>
            <Label htmlFor="quantity">Quantity (FHE Encrypted)</Label>
            <Input
              id="quantity"
              value={supplyChainData.quantity}
              onChange={(e) => setSupplyChainData({...supplyChainData, quantity: e.target.value})}
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <Label htmlFor="qualityScore">Quality Score (FHE Encrypted)</Label>
            <Input
              id="qualityScore"
              value={supplyChainData.qualityScore}
              onChange={(e) => setSupplyChainData({...supplyChainData, qualityScore: e.target.value})}
              placeholder="Enter quality score"
            />
          </div>
          <div>
            <Label htmlFor="deliveryTime">Delivery Time (FHE Encrypted)</Label>
            <Input
              id="deliveryTime"
              value={supplyChainData.deliveryTime}
              onChange={(e) => setSupplyChainData({...supplyChainData, deliveryTime: e.target.value})}
              placeholder="Enter delivery time"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <Label htmlFor="trackingHash">Tracking Hash</Label>
          <Input
            id="trackingHash"
            value={supplyChainData.trackingHash}
            onChange={(e) => setSupplyChainData({...supplyChainData, trackingHash: e.target.value})}
            placeholder="Enter tracking hash"
          />
        </div>

        <Button 
          onClick={handleSubmitSupplyChain}
          disabled={isSubmitting || isConfirmingSupply}
          className="w-full"
        >
          {isSubmitting || isConfirmingSupply ? (
            <>
              <Key className="w-4 h-4 mr-2 animate-spin" />
              Encrypting & Submitting Data...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit FHE Encrypted Supply Chain Data
            </>
          )}
        </Button>
      </Card>
    </div>
  );
};

export default ContractInteraction;
