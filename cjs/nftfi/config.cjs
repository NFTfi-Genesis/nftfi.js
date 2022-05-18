"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _baseConfigs;

var baseConfig = {
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
  },
  rewards: {
    retroactive: {
      distributor: {
        address: '',
        abi: []
      }
    }
  }
};
var mainnetConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy

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
mainnetConfig.rewards.retroactive.distributor.address = '';
mainnetConfig.rewards.retroactive.distributor.abi = ['function claim(uint256 index, address account, uint256 amount, bytes32[] merkleProof) public nonpayable returns()', 'function isClaimed(uint256 index) public view returns (bool)'];
mainnetConfig.rewards.retroactive.distributor.errors = {
  'execution reverted: MerkleDistributor: Transfer failed.': 'Transfer failed',
  'execution reverted: MerkleDistributor: Drop already claimed.': 'Drop already claimed',
  'execution reverted: MerkleDistributor: Invalid proof.': 'Invalid proof'
};
var rinkebyConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy

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
rinkebyConfig.rewards.retroactive.distributor.address = '0xe0d5b1950838f976557B0b3f189B3891a36a6cf2';
rinkebyConfig.rewards.retroactive.distributor.abi = ['function claim(uint256 index, address account, uint256 amount, bytes32[] merkleProof) public nonpayable returns()', 'function isClaimed(uint256 index) public view returns (bool)'];
rinkebyConfig.rewards.retroactive.distributor.errors = {
  'execution reverted: MerkleDistributor: Transfer failed.': 'Transfer failed',
  'execution reverted: MerkleDistributor: Drop already claimed.': 'Drop already claimed',
  'execution reverted: MerkleDistributor: Invalid proof.': 'Invalid proof'
};
var baseConfigs = (_baseConfigs = {}, (0, _defineProperty2["default"])(_baseConfigs, mainnetConfig.chainId, mainnetConfig), (0, _defineProperty2["default"])(_baseConfigs, rinkebyConfig.chainId, rinkebyConfig), _baseConfigs);
var Config = /*#__PURE__*/(0, _createClass2["default"])(function Config() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _classCallCheck2["default"])(this, Config);
  var merge = options === null || options === void 0 ? void 0 : options.merge;
  var customConfig = options.config && (0, _typeof2["default"])(options.config) == 'object' ? options.config : {};
  var baseConfig = baseConfigs[options.chainId];
  var mergedConfig = merge(baseConfig, customConfig);

  for (var prop in mergedConfig) {
    this[prop] = mergedConfig[prop];
  }
});
var _default = Config;
exports["default"] = _default;