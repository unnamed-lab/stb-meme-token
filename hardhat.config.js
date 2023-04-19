require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    //  //  ETHEREUM SEPOLIA TEST NETWORK DEPLOYMENT - SUCCESS
    // sepolia: {
    //   url: process.env.INFURA_SEPOLIA_ENDPOINT,
    //   accounts: [process.env.PRIVATE_KEY],
    // },

    //  BNB NETWORKS DEPLOYMENT

    // BNB TEST NETWORK DEPLOYMENT
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY],
    },

    // // BNB MAIN NETWORK DEPLOYMENT
    // mainnet: {
    //   url: "https://bsc-dataseed.binance.org/",
    //   chainId: 56,
    //   gasPrice: 20000000000,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
};
