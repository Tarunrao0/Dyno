const { ethers } = require("hardhat");

// Load environment variables
require("dotenv").config();

async function main() {
  // Retrieve the private key from the environment variable
  const privateKey = process.env.PRIVATE_KEY;
  const ownerWallet = new ethers.Wallet(privateKey, ethers.provider);
  const ownerAddress = ownerWallet.address;
  console.log("Owner:", ownerWallet.address);

  // Deploy MockUSDC
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const mockUsdc = await MockUSDC.connect(ownerWallet).deploy(ownerAddress);
  await mockUsdc.deployed();
  const usdcAddress = mockUsdc.address;

  console.log("MockUSDC deployed at:", usdcAddress);

  // Deploy DynoToken
  const DynoToken = await ethers.getContractFactory("DynoToken");
  const dynoToken = await DynoToken.connect(ownerWallet).deploy(ownerAddress);
  await dynoToken.deployed();

  console.log("DynoToken deployed at:", dynoToken.address);

  // Deploy DynoPool
  const DynoPool = await ethers.getContractFactory("DynoPool");
  const dynoPool = await DynoPool.connect(ownerWallet).deploy(
    dynoToken.address,
    usdcAddress,
    ownerAddress
  );
  await dynoPool.deployed();

  console.log("DynoPool deployed at:", dynoPool.address);

  // Deploy DynoSeller
  const DynoSeller = await ethers.getContractFactory("DynoSeller");
  const dynoSeller = await DynoSeller.connect(ownerWallet).deploy(
    dynoToken.address,
    usdcAddress,
    ownerAddress,
    dynoPool.address
  );
  await dynoSeller.deployed();

  console.log("DynoSeller deployed at:", dynoSeller.address);

  // Deploy DynoBuyer
  const DynoBuyer = await ethers.getContractFactory("DynoBuyer");
  const dynoBuyer = await DynoBuyer.connect(ownerWallet).deploy(
    usdcAddress,
    dynoToken.address,
    dynoSeller.address,
    dynoPool.address
  );
  await dynoBuyer.deployed();

  console.log("DynoBuyer deployed at:", dynoBuyer.address);

  // Mint DynoTokens to the DynoPool (initial supply)
  const mintTx = await dynoToken
    .connect(ownerWallet)
    .mint(dynoPool.address, ethers.utils.parseEther("1000000000"));
  await mintTx.wait();

  console.log("Minted DynoTokens to DynoPool");

  //Mint dev account some mockUSDC for testing purposes
  const mintUSDCtx = await mockUsdc
    .connect(ownerWallet)
    .mint(ownerAddress, ethers.utils.parseEther("10000000"));
  await mintUSDCtx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
