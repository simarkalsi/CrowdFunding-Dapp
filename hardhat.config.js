require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path: './.env.local' })

/** @type import('hardhat/config').HardhatUserConfig */

const privateKey=process.env.NEXT_PUBLIC_PRIVATE_KEY
module.exports = {
  solidity: "0.8.17",
  defaultNetwork:"polygon",
  networks:{
    hardhat:{},
    polygon:{
      url: process.env.NEXT_PUBLIC_RPC_URL,
      accounts:[privateKey]

    }
  }
};
