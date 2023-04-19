const hre = require("hardhat");

async function main() {
  const STBToken = await hre.ethers.getContractFactory('SaveTheBankers');
  const stb = STBToken.deploy(10000000000000);
  
  await stb.deployed();
  console.log("STB Token successfully deployed: ", stb)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
