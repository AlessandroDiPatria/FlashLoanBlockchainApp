require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  networks:{
    goerli: {
      url: "https://goerli.infura.io/v3/24bb3c1abedd463aa77ae315aaf18d16",
      accounts: ["7102b7c978be838ac4fb01ed34ce20ff7b5830cc18b317a15744ae9eb4a0ab06"],
    },
  },
};
