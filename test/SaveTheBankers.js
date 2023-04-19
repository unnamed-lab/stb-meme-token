const { expect } = require('chai');
const hre = require('hardhat');

describe("SaveTheBankers Contract", function(){
  //global vars
  let Token;
  let stbToken;
  let owner;
  let addr1 = "0xeB01b6B6963A5Dda5F3D7A9f707516bE3150A49a";
  let addr2;
  let tokenCap = 10000000000;

  beforeEach(async function() {
    Token = await ethers.getContractFactory('SaveTheBankers');
    owner = hre.ethers.getSigner();

    stbToken = await Token.deploy(
      tokenCap,
      addr1
    );
  });

  describe('Deployment', function(){
    // it("Should set the right owner", async function (){
    //     expect(await stbToken.owner()).to.equal(owner.address);
    // });

    // it("Should assign the total supply of tokens to the owner", async function () {
    //   const ownerBalance = await stbToken.balanceOf(owner.address);
    //   expect(await stbToken.totalSupply()).to.equal(ownerBalance);
    // });

    it("Should set the max capped supply to the argument provided during deployment", async function () {
      const cap = await stbToken.cap();
      expect(Number(hre.ethers.utils.formatEther(cap))).to.equal(tokenCap);
    });
    
    it("Disable the tax function", async function () {
      expect(await stbToken.disableTax());
    });

    it("Update Tax Wallet", async function () {
      expect(await stbToken.updateTaxDestination(addr1));
    });

    it("Add Tax Exclusive Address", async function () {
      expect(await stbToken.addExcludedAddress(addr1))
    });

    it("Mints new tokens to address", async function () {
      expect(await stbToken._mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 1000000));
    });

    it("Destroy Contract", async function () {
      expect(await stbToken.destroy());
    });
  });
});