// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract ChainGuardFunding is SepoliaConfig {
    using FHE for *;
    
    struct Invoice {
        euint32 invoiceId;
        euint32 amount;
        euint32 dueDate;
        euint32 paymentTerms;
        bool isEncrypted;
        bool isApproved;
        bool isPaid;
        string invoiceHash;
        address supplier;
        address buyer;
        address financier;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct FinancingRequest {
        euint32 requestId;
        euint32 requestedAmount;
        euint32 approvedAmount;
        euint32 interestRate;
        bool isApproved;
        bool isFunded;
        string requestHash;
        address requester;
        address approver;
        uint256 createdAt;
        uint256 approvedAt;
    }
    
    struct SupplyChainData {
        euint32 shipmentId;
        euint32 quantity;
        euint32 qualityScore;
        euint32 deliveryTime;
        bool isVerified;
        bool isDelivered;
        string trackingHash;
        address supplier;
        address buyer;
        uint256 createdAt;
    }
    
    mapping(uint256 => Invoice) public invoices;
    mapping(uint256 => FinancingRequest) public financingRequests;
    mapping(uint256 => SupplyChainData) public supplyChainData;
    mapping(address => euint32) public supplierReputation;
    mapping(address => euint32) public buyerReputation;
    mapping(address => euint32) public financierReputation;
    
    uint256 public invoiceCounter;
    uint256 public requestCounter;
    uint256 public shipmentCounter;
    
    address public owner;
    address public verifier;
    
    event InvoiceCreated(uint256 indexed invoiceId, address indexed supplier, string invoiceHash);
    event FinancingRequested(uint256 indexed requestId, uint256 indexed invoiceId, address indexed requester);
    event FinancingApproved(uint256 indexed requestId, address indexed approver, uint32 approvedAmount);
    event PaymentReleased(uint256 indexed invoiceId, address indexed supplier, uint32 amount);
    event SupplyChainVerified(uint256 indexed shipmentId, address indexed verifier);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createInvoice(
        externalEuint32 amount,
        externalEuint32 dueDate,
        externalEuint32 paymentTerms,
        string memory invoiceHash,
        address buyer,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(invoiceHash).length > 0, "Invoice hash cannot be empty");
        require(buyer != address(0), "Invalid buyer address");
        
        uint256 invoiceId = invoiceCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalDueDate = FHE.fromExternal(dueDate, inputProof);
        euint32 internalPaymentTerms = FHE.fromExternal(paymentTerms, inputProof);
        
        invoices[invoiceId] = Invoice({
            invoiceId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            dueDate: internalDueDate,
            paymentTerms: internalPaymentTerms,
            isEncrypted: true,
            isApproved: false,
            isPaid: false,
            invoiceHash: invoiceHash,
            supplier: msg.sender,
            buyer: buyer,
            financier: address(0),
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        emit InvoiceCreated(invoiceId, msg.sender, invoiceHash);
        return invoiceId;
    }
    
    function requestFinancing(
        uint256 invoiceId,
        externalEuint32 requestedAmount,
        externalEuint32 interestRate,
        string memory requestHash,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(invoices[invoiceId].supplier != address(0), "Invoice does not exist");
        require(invoices[invoiceId].supplier == msg.sender, "Only supplier can request financing");
        require(!invoices[invoiceId].isPaid, "Invoice already paid");
        
        uint256 requestId = requestCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalRequestedAmount = FHE.fromExternal(requestedAmount, inputProof);
        euint32 internalInterestRate = FHE.fromExternal(interestRate, inputProof);
        
        financingRequests[requestId] = FinancingRequest({
            requestId: FHE.asEuint32(0), // Will be set properly later
            requestedAmount: internalRequestedAmount,
            approvedAmount: FHE.asEuint32(0),
            interestRate: internalInterestRate,
            isApproved: false,
            isFunded: false,
            requestHash: requestHash,
            requester: msg.sender,
            approver: address(0),
            createdAt: block.timestamp,
            approvedAt: 0
        });
        
        emit FinancingRequested(requestId, invoiceId, msg.sender);
        return requestId;
    }
    
    function approveFinancing(
        uint256 requestId,
        externalEuint32 approvedAmount,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can approve financing");
        require(financingRequests[requestId].requester != address(0), "Request does not exist");
        require(!financingRequests[requestId].isApproved, "Request already approved");
        
        // Convert external encrypted value to internal
        euint32 internalApprovedAmount = FHE.fromExternal(approvedAmount, inputProof);
        
        financingRequests[requestId].approvedAmount = internalApprovedAmount;
        financingRequests[requestId].isApproved = true;
        financingRequests[requestId].approver = msg.sender;
        financingRequests[requestId].approvedAt = block.timestamp;
        
        emit FinancingApproved(requestId, msg.sender, 0); // Amount will be decrypted off-chain
    }
    
    function fundRequest(
        uint256 requestId,
        uint256 invoiceId
    ) public payable {
        require(financingRequests[requestId].isApproved, "Request must be approved");
        require(!financingRequests[requestId].isFunded, "Request already funded");
        require(invoices[invoiceId].supplier != address(0), "Invoice does not exist");
        
        // In a real implementation, the amount would be based on decrypted approvedAmount
        // For now, we'll use a placeholder amount
        uint256 fundingAmount = msg.value;
        require(fundingAmount > 0, "Funding amount must be positive");
        
        financingRequests[requestId].isFunded = true;
        invoices[invoiceId].financier = msg.sender;
        invoices[invoiceId].isApproved = true;
        
        // Transfer funds to supplier
        payable(invoices[invoiceId].supplier).transfer(fundingAmount);
        
        emit PaymentReleased(invoiceId, invoices[invoiceId].supplier, 0); // Amount will be decrypted off-chain
    }
    
    function submitSupplyChainData(
        uint256 invoiceId,
        externalEuint32 quantity,
        externalEuint32 qualityScore,
        externalEuint32 deliveryTime,
        string memory trackingHash,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(invoices[invoiceId].supplier != address(0), "Invoice does not exist");
        require(invoices[invoiceId].supplier == msg.sender, "Only supplier can submit data");
        
        uint256 shipmentId = shipmentCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalQuantity = FHE.fromExternal(quantity, inputProof);
        euint32 internalQualityScore = FHE.fromExternal(qualityScore, inputProof);
        euint32 internalDeliveryTime = FHE.fromExternal(deliveryTime, inputProof);
        
        supplyChainData[shipmentId] = SupplyChainData({
            shipmentId: FHE.asEuint32(0), // Will be set properly later
            quantity: internalQuantity,
            qualityScore: internalQualityScore,
            deliveryTime: internalDeliveryTime,
            isVerified: false,
            isDelivered: false,
            trackingHash: trackingHash,
            supplier: msg.sender,
            buyer: invoices[invoiceId].buyer,
            createdAt: block.timestamp
        });
        
        return shipmentId;
    }
    
    function verifySupplyChain(
        uint256 shipmentId,
        bool isVerified
    ) public {
        require(msg.sender == verifier, "Only verifier can verify supply chain");
        require(supplyChainData[shipmentId].supplier != address(0), "Shipment does not exist");
        
        supplyChainData[shipmentId].isVerified = isVerified;
        supplyChainData[shipmentId].isDelivered = isVerified;
        
        emit SupplyChainVerified(shipmentId, msg.sender);
    }
    
    function updateReputation(
        address user,
        euint32 reputation,
        uint8 userType // 0: supplier, 1: buyer, 2: financier
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        if (userType == 0) {
            supplierReputation[user] = reputation;
        } else if (userType == 1) {
            buyerReputation[user] = reputation;
        } else if (userType == 2) {
            financierReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getInvoiceInfo(uint256 invoiceId) public view returns (
        string memory invoiceHash,
        address supplier,
        address buyer,
        address financier,
        bool isEncrypted,
        bool isApproved,
        bool isPaid,
        uint256 createdAt,
        uint256 updatedAt
    ) {
        Invoice storage invoice = invoices[invoiceId];
        return (
            invoice.invoiceHash,
            invoice.supplier,
            invoice.buyer,
            invoice.financier,
            invoice.isEncrypted,
            invoice.isApproved,
            invoice.isPaid,
            invoice.createdAt,
            invoice.updatedAt
        );
    }
    
    function getFinancingRequestInfo(uint256 requestId) public view returns (
        string memory requestHash,
        address requester,
        address approver,
        bool isApproved,
        bool isFunded,
        uint256 createdAt,
        uint256 approvedAt
    ) {
        FinancingRequest storage request = financingRequests[requestId];
        return (
            request.requestHash,
            request.requester,
            request.approver,
            request.isApproved,
            request.isFunded,
            request.createdAt,
            request.approvedAt
        );
    }
    
    function getSupplyChainInfo(uint256 shipmentId) public view returns (
        string memory trackingHash,
        address supplier,
        address buyer,
        bool isVerified,
        bool isDelivered,
        uint256 createdAt
    ) {
        SupplyChainData storage shipment = supplyChainData[shipmentId];
        return (
            shipment.trackingHash,
            shipment.supplier,
            shipment.buyer,
            shipment.isVerified,
            shipment.isDelivered,
            shipment.createdAt
        );
    }
    
    function getSupplierReputation(address supplier) public view returns (uint8) {
        return 0; // FHE.decrypt(supplierReputation[supplier]) - will be decrypted off-chain
    }
    
    function getBuyerReputation(address buyer) public view returns (uint8) {
        return 0; // FHE.decrypt(buyerReputation[buyer]) - will be decrypted off-chain
    }
    
    function getFinancierReputation(address financier) public view returns (uint8) {
        return 0; // FHE.decrypt(financierReputation[financier]) - will be decrypted off-chain
    }
    
    function withdrawFunds(uint256 invoiceId) public {
        require(invoices[invoiceId].financier == msg.sender, "Only financier can withdraw");
        require(invoices[invoiceId].isPaid, "Invoice must be paid");
        
        // In a real implementation, funds would be transferred based on decrypted amount
        // For now, we'll transfer a placeholder amount
        invoices[invoiceId].isPaid = true;
        
        // payable(msg.sender).transfer(amount);
    }
}
