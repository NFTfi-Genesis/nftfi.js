const baseConfig = {
  chainId: '',
  loan: {
    adminFeeInBasisPoints: '',
    fixed: {
      v1: {
        address: ''
      },
      v2: {
        address: ''
      }
    }
  },
  erc20: {
    weth: {
      address: '',
      symbol: ''
    },
    dai: {
      address: '',
      symbol: ''
    }
  },
  website: {
    baseURI: ''
  },
  api: {
    key: '',
    baseURI: ''
  },
  pagination: {
    limit: 20,
    page: 1
  }
};

const mainnetConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy
mainnetConfig.chainId = 1;
mainnetConfig.website.baseURI = 'https://www.nftfi.com';
mainnetConfig.api.baseURI = 'https://sdk-api.nftfi.com';
mainnetConfig.erc20.weth.address = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
mainnetConfig.erc20.weth.symbol = 'wETH';
mainnetConfig.erc20.dai.address = '0x6b175474e89094c44da98b954eedeac495271d0f';
mainnetConfig.erc20.dai.symbol = 'DAI';
mainnetConfig.loan.fixed.v1.address = '0x88341d1a8F672D2780C8dC725902AAe72F143B0c';
mainnetConfig.loan.fixed.v2.address = '0xf896527c49b44aAb3Cf22aE356Fa3AF8E331F280';
mainnetConfig.loan.adminFeeInBasisPoints = '500';

const rinkebyConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy
rinkebyConfig.chainId = 4;
rinkebyConfig.website.baseURI = 'https://integration.nftfi.com';
rinkebyConfig.api.baseURI = 'https://development-sdk-api.nftfi.com';
rinkebyConfig.erc20.weth.address = '0xc778417e063141139fce010982780140aa0cd5ab';
rinkebyConfig.erc20.weth.symbol = 'wETH';
rinkebyConfig.erc20.dai.address = '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea';
rinkebyConfig.erc20.dai.symbol = 'DAI';
rinkebyConfig.loan.fixed.v1.address = '0xA2cDED5Ce935eB83d34DcaEA2e2B95e955F967EF';
rinkebyConfig.loan.fixed.v2.address = '0x33e75763F3705252775C5AEEd92E5B4987622f44';
rinkebyConfig.loan.adminFeeInBasisPoints = '500';

const baseConfigs = {
  [mainnetConfig.chainId]: mainnetConfig,
  [rinkebyConfig.chainId]: rinkebyConfig
};

class Config {
  constructor(options = {}) {
    const merge = options?.merge;
    const customConfig = options.config && typeof options.config == 'object' ? options.config : {};
    const baseConfig = baseConfigs[options.chainId];
    const mergedConfig = merge(baseConfig, customConfig);
    for (const prop in mergedConfig) {
      this[prop] = mergedConfig[prop];
    }
  }
}

module.exports = Config;
