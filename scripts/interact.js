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
  const stbToken = stbContract;
  const excluderRole = await stbToken.EXCLUDED_ROLE();
  const presidentRole = await stbToken.PRESIDENT_ROLE();
  const governorRole = await stbToken.GOVERNOR_ROLE();

  let addr1 = "0xe738a57f3Efa08d13DDC0a2c026503e04f83e88f";
  console.log("Speaking to the Smart Contract...");

  // console.log("Finding the token name and ticker...");
  // let name = await stbToken.name();
  // let ticker = await stbToken.symbol();
  // console.log(
  //   `The token's name is ${name}. \n The token's ticker/symbol is $${ticker}`
  // );

  // console.log("Finding the token total supply...");
  // let cap = await stbToken.totalSupply();
  // console.log("The token's total supply is: ", cap);

  // console.log("Finding the token decimals...");
  // let decimals = await stbToken.decimals();
  // console.log("The token's decimals are: ", decimals);

  // await stbContract.enableTax();
  // console.log('Tax functionality activated!');

  // await stbToken.disableTax();
  // console.log("Disabled taxes successfully");

  // await stbToken.updateTax(500);
  // console.log("Update tax fees!");

  // await stbToken.updateTaxDestination(addr1);
  // console.log("Update tax address!");

  // console.log('Excluding wallet address from taxation...');
  // await stbContract.addExcludedAddress(addr1);
  // console.log('Tax address neutralized!')

  // console.log('Remoing Excluded wallet address...')
  // await stbToken.removeExcludedAddress(addr1);
  // console.log('Excluded address removed and now taxable');

  // console.log("Check balance")
  // const balance = await stbToken.balanceOf(addr1)
  // console.log(balance)

  // console.log("Begin token burn...")
  // await stbToken.burn(1000000000000000);
  // console.log("Token burnt!")

  // console.log('Get contract admin role...');
  // console.log("President role keccal256: ", presidentRole);
  // console.log("Governor role keccal256: ", governorRole);
  // console.log("Excluder role keccal256: ", excluderRole);

  //   console.log("Checking if role exists...");
  //   let hasRolePresident = await stbToken.hasRole(presidentRole, addr1); // Check for President role
  //   let hasRoleGovernor = await stbToken.hasRole(governorRole, addr1); // Check for Governor role
  //   let hasRoleExcluder = await stbToken.hasRole(excluderRole, addr1); // Check for Excluder role
}

main();

// INTERACT WITH CONTRACT WITH THIS: 
// npx hardhat run scripts/interact.js

