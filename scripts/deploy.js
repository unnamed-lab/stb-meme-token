const hre = require("hardhat");

async function main() {
  let addr1 = "0xeB01b6B6963A5Dda5F3D7A9f707516bE3150A49a";
  const STBToken = await hre.ethers.getContractFactory('SaveTheBankers');
  const stb = STBToken.deploy(10000000000000, addr1);
  
  await stb.deployed();
  console.log("STB Token successfully deployed: ", stb)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
