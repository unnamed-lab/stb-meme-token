const API_KEY = process.env.INFURA_SEPOLIA_ENDPOINT;
const BSC_API_KEY = process.env.BINANCE_TESTNET_ENDPOINT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/SaveTheBankers.sol/SaveTheBankers.json");
// console.log(JSON.stringify(contract.abi));

// Provider 
const bscProvider = new ethers.providers.JsonRpcProvider(BSC_API_KEY, {
  name: "binance",
  chainId: 97,
});

// Signer 
const signer = new ethers.Wallet(PRIVATE_KEY, bscProvider);

// Contract
const stbContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
// console.log(stbContract)

async function main() {
    let addr1 = "0xeB01b6B6963A5Dda5F3D7A9f707516bE3150A49a";

    await stbContract.updateTaxDestination(addr1);
    console.log("Update tax address!");
    
    console.log('Remove tax function from tax address...');
    await stbContract.addExcludedAddress(addr1);
    console.log('Tax address neutralized!')

    // await stbContract.enableTax();
    // console.log('Tax functionality activated!');
}

main();