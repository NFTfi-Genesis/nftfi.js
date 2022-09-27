const baseConfig = {
  chainId: '',
  ethereum: {
    account: {
      multisig: {
        gnosis: {
          service: {
            url: ''
          }
        }
      }
    }
  },
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
  erc721: {
    abi: []
  },
  erc20: {
    abi: [],
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
mainnetConfig.erc721.abi = [
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function setApprovalForAll(address to, bool approved) public returns()'
];
mainnetConfig.erc20.abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address spender, uint256 value) returns (bool)',
  'function allowance(address owner, address spender) public view returns (uint256)'
];
mainnetConfig.erc20.weth.address = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
mainnetConfig.erc20.weth.symbol = 'wETH';
mainnetConfig.erc20.dai.address = '0x6b175474e89094c44da98b954eedeac495271d0f';
mainnetConfig.erc20.dai.symbol = 'DAI';
mainnetConfig.loan.fixed.v1.name = 'v1.loan.fixed';
mainnetConfig.loan.fixed.v1.address = '0x88341d1a8F672D2780C8dC725902AAe72F143B0c';
mainnetConfig.loan.fixed.v1.abi = [
  'function liquidateOverdueLoan(uint256 _loanId) nonpayable returns()',
  'function payBackLoan(uint256 _loanId)'
];
mainnetConfig.loan.fixed.v2.name = 'v2.loan.fixed';
mainnetConfig.loan.fixed.v2.address = '0xf896527c49b44aAb3Cf22aE356Fa3AF8E331F280';
mainnetConfig.loan.fixed.v2.abi = [
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
mainnetConfig.loan.adminFeeInBasisPoints = '500';
mainnetConfig.ethereum.account.multisig.gnosis.service.url = 'https://safe-transaction.gnosis.io/';

const rinkebyConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy
rinkebyConfig.chainId = 4;
rinkebyConfig.website.baseURI = 'https://integration.nftfi.com';
rinkebyConfig.api.baseURI = 'https://development-sdk-api.nftfi.com';
rinkebyConfig.erc721.abi = [
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function setApprovalForAll(address to, bool approved) public returns()'
];
rinkebyConfig.erc20.abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address spender, uint256 value) returns (bool)',
  'function allowance(address owner, address spender) public view returns (uint256)'
];
rinkebyConfig.erc20.weth.address = '0xc778417e063141139fce010982780140aa0cd5ab';
rinkebyConfig.erc20.weth.symbol = 'wETH';
rinkebyConfig.erc20.dai.address = '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea';
rinkebyConfig.erc20.dai.symbol = 'DAI';
rinkebyConfig.loan.fixed.v1.name = 'v1.loan.fixed';
rinkebyConfig.loan.fixed.v1.address = '0xA2cDED5Ce935eB83d34DcaEA2e2B95e955F967EF';
rinkebyConfig.loan.fixed.v1.abi = [
  'function liquidateOverdueLoan(uint256 _loanId) nonpayable returns()',
  'function payBackLoan(uint256 _loanId)'
];
rinkebyConfig.loan.fixed.v2.name = 'v2.loan.fixed';
rinkebyConfig.loan.fixed.v2.address = '0x33e75763F3705252775C5AEEd92E5B4987622f44';
rinkebyConfig.loan.fixed.v2.abi = [
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
rinkebyConfig.loan.adminFeeInBasisPoints = '500';
rinkebyConfig.ethereum.account.multisig.gnosis.service.url = 'https://safe-transaction.rinkeby.gnosis.io';

const goerliConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy
goerliConfig.chainId = 5;
goerliConfig.website.baseURI = 'https://goerli-integration.nftfi.com';
goerliConfig.api.baseURI = 'https://goerli-integration-sdk-api.nftfi.com';
goerliConfig.erc721.abi = [
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function setApprovalForAll(address to, bool approved) public returns()'
];
goerliConfig.erc20.abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address spender, uint256 value) returns (bool)',
  'function allowance(address owner, address spender) public view returns (uint256)'
];
goerliConfig.erc20.weth.address = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6';
goerliConfig.erc20.weth.symbol = 'wETH';
goerliConfig.erc20.dai.address = '0x0000000000000000000000000000000000000000';
goerliConfig.erc20.dai.symbol = 'DAI';
goerliConfig.loan.fixed.v1.name = 'v1.loan.fixed';
goerliConfig.loan.fixed.v1.address = '0x0000000000000000000000000000000000000000';
goerliConfig.loan.fixed.v1.abi = [
  'function liquidateOverdueLoan(uint256 _loanId) nonpayable returns()',
  'function payBackLoan(uint256 _loanId)'
];
goerliConfig.loan.fixed.v2.name = 'v2.loan.fixed';
goerliConfig.loan.fixed.v2.address = '0x4554ac207156066092C1Fc6BAa48B0f8447496f1';
goerliConfig.loan.fixed.v2.abi = [
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
goerliConfig.loan.adminFeeInBasisPoints = '500';
goerliConfig.ethereum.account.multisig.gnosis.service.url = 'https://safe-transaction.goerli.gnosis.io';

const baseConfigs = {
  [mainnetConfig.chainId]: mainnetConfig,
  [rinkebyConfig.chainId]: rinkebyConfig,
  [goerliConfig.chainId]: goerliConfig
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

export default Config;
