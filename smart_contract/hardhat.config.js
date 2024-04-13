require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-mainnet.g.alchemy.com/v2/er3bL_CXAx6fXdN6DlDQDS3Lbei2KVsf',
      accounts: ['13d4d73429cdc9f1c7543d0e03577dbe28bf66b8f6274b9e6699136f79cff436 '],
    },
  },
};