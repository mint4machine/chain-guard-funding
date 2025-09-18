import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy ChainGuardFunding contract
  const ChainGuardFunding = await ethers.getContractFactory("ChainGuardFunding");
  
  // Set verifier address (you can change this to your verifier address)
  const verifierAddress = deployer.address; // For now, using deployer as verifier
  
  const chainGuardFunding = await ChainGuardFunding.deploy(verifierAddress);
  await chainGuardFunding.waitForDeployment();

  const contractAddress = await chainGuardFunding.getAddress();
  
  console.log("ChainGuardFunding deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifierAddress,
    deployerAddress: deployer.address,
    network: await deployer.provider.getNetwork(),
    timestamp: new Date().toISOString()
  };
  
  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
