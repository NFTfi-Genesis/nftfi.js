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
  registry: {
    address: '',
    abi: [],
    wrappers: [
      { name: 'ERC721', safeTransfer: true },
      { name: 'ERC721_LEGACY', safeTransfer: false }
    ]
  },
  loan: {
    adminFeeInBasisPoints: '',
    fixed: {
      collection: {
        v2: {
          name: '',
          address: '',
          abi: []
        }
      },
      v1: {
        name: '',
        address: '',
        abi: []
      },
      v2: {
        name: '',
        address: '',
        abi: []
      },
      v2_1: {
        name: '',
        address: '',
        abi: []
      }
    }
  },
  bundler: {
    v1: {
      address: '',
      abi: []
    }
  },
  immutable: {
    v1: {
      address: '',
      abi: []
    }
  },
  erc721: {
    abi: []
  },
  erc20: {
    abi: [],
    weth: {
      address: '',
      symbol: '',
      unit: ''
    },
    dai: {
      address: '',
      symbol: '',
      unit: ''
    },
    usdc: {
      address: '',
      symbol: '',
      unit: ''
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
  signingUtils: {
    v2: {
      address: '',
      abi: []
    }
  },
  auth: {
    token: { key: '' },
    refreshToken: { key: '' }
  }
};

const mainnetConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy
mainnetConfig.chainId = 1;
mainnetConfig.website.baseURI = 'https://www.nftfi.com';
mainnetConfig.api.baseURI = 'https://sdk-api.nftfi.com';
mainnetConfig.erc721.abi = [
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function setApprovalForAll(address to, bool approved) public returns()',
  'function isApprovedForAll(address owner, address operator) view returns (bool)'
];
mainnetConfig.erc20.abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address spender, uint256 value) returns (bool)',
  'function allowance(address owner, address spender) public view returns (uint256)'
];
mainnetConfig.erc20.weth.address = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
mainnetConfig.erc20.weth.symbol = 'wETH';
mainnetConfig.erc20.weth.unit = 'ether';
mainnetConfig.erc20.dai.address = '0x6b175474e89094c44da98b954eedeac495271d0f';
mainnetConfig.erc20.dai.symbol = 'DAI';
mainnetConfig.erc20.dai.unit = 'ether';
mainnetConfig.erc20.usdc.address = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
mainnetConfig.erc20.usdc.symbol = 'USDC';
mainnetConfig.erc20.usdc.unit = 'mwei';
mainnetConfig.registry.address = '0xadde73498902f61bfcb702e94c31c13c534879ac';
mainnetConfig.registry.abi = ['function getNFTPermit(address _nftContract) view returns (bytes32)'];
mainnetConfig.loan.fixed.v1.name = 'v1.loan.fixed';
mainnetConfig.loan.fixed.v1.address = '0x88341d1a8F672D2780C8dC725902AAe72F143B0c';
mainnetConfig.loan.fixed.v1.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint256 _loanId) nonpayable returns()',
  'function payBackLoan(uint256 _loanId)'
];
mainnetConfig.loan.fixed.collection.v2.name = 'v2.loan.fixed.collection';
mainnetConfig.loan.fixed.collection.v2.address = '0xE52Cec0E90115AbeB3304BaA36bc2655731f7934';
mainnetConfig.loan.fixed.collection.v2.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
mainnetConfig.loan.fixed.v2.name = 'v2.loan.fixed';
mainnetConfig.loan.fixed.v2.address = '0xf896527c49b44aAb3Cf22aE356Fa3AF8E331F280';
mainnetConfig.loan.fixed.v2.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
mainnetConfig.loan.fixed.v2_1.name = 'v2-1.loan.fixed';
mainnetConfig.loan.fixed.v2_1.address = '0x8252Df1d8b29057d1Afe3062bf5a64D503152BC8';
mainnetConfig.loan.fixed.v2_1.abi = mainnetConfig.loan.fixed.v2.abi;
mainnetConfig.loan.adminFeeInBasisPoints = '500';
mainnetConfig.ethereum.account.multisig.gnosis.service.url = 'https://safe-transaction.gnosis.io/';
mainnetConfig.signingUtils.v2.address = '0x5a42d72372858e10edc03b26bf449f78ff3c0e6f';
mainnetConfig.signingUtils.v2.abi = [
  'function isValidLenderSignature(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, address _loanContract) public view returns (bool)'
];
mainnetConfig.bundler.v1.name = 'v1.bundler';
mainnetConfig.bundler.v1.address = '0x16c583748faeD1C5A5bcd744b4892ee6B6290094';
mainnetConfig.bundler.v1.abi = [
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'event ImmutableMinted(uint256 indexed immutableId, uint256 indexed bundleId, address indexed personalBundler)',
  'function decomposeBundle(uint256 tokenId, address receiver)',
  'function addBundleElements(uint256 tokenId, tuple(address tokenContract, uint256[] ids, bool safeTransferable)[] _bundleElements)',
  'function removeBundleElements(uint256 tokenId, tuple(address tokenContract, uint256[] ids, bool safeTransferable)[] _bundleElements)',
  'function safeMint(address to) returns (uint256)',
  'function safeTransferFrom(address from, address to, uint256 tokenId)',
  'function totalChildContracts(uint256 tokenId) view returns (uint256)',
  'function childContractByIndex(uint256 tokenId, uint256 index) view returns (address childContract)',
  'function totalChildTokens(uint256 tokenId, address childContract) view returns (uint256)',
  'function childTokenByIndex(uint256 tokenId, address childContract, uint256 index) view returns (uint256 childTokenId)'
];
mainnetConfig.immutable.v1.name = 'v1.immutable.bundle';
mainnetConfig.immutable.v1.address = '0x9a129032F01EB4dDD764c1777c81b771C34a2fbE';
mainnetConfig.immutable.v1.abi = [
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'function bundleOfImmutable(uint256) view returns (uint256)',
  'function withdraw(uint256 immutableId, address to)'
];
mainnetConfig.auth.token.key = 'nftfiSdkToken';
mainnetConfig.auth.refreshToken.key = 'nftfiSdkRefreshToken';

const rinkebyConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy
rinkebyConfig.chainId = 4;
rinkebyConfig.website.baseURI = 'https://integration.nftfi.com';
rinkebyConfig.api.baseURI = 'https://development-sdk-api.nftfi.com';
rinkebyConfig.erc721.abi = [
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function setApprovalForAll(address to, bool approved) public returns()',
  'function isApprovedForAll(address owner, address operator) view returns (bool)'
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
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint256 _loanId) nonpayable returns()',
  'function payBackLoan(uint256 _loanId)'
];
rinkebyConfig.loan.fixed.collection.v2.name = 'v2.loan.fixed.collection';
rinkebyConfig.loan.fixed.collection.v2.address = '0x9954C7DA264DEa250ef934A3562C70dde8F65B43';
rinkebyConfig.loan.fixed.collection.v2.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
rinkebyConfig.loan.fixed.v2.name = 'v2.loan.fixed';
rinkebyConfig.loan.fixed.v2.address = '0x33e75763F3705252775C5AEEd92E5B4987622f44';
rinkebyConfig.loan.fixed.v2.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
rinkebyConfig.loan.adminFeeInBasisPoints = '500';
rinkebyConfig.ethereum.account.multisig.gnosis.service.url = 'https://safe-transaction.rinkeby.gnosis.io';
rinkebyConfig.signingUtils.v2.address = '0x245BF99045F2638d2EEf762E0F9305B70A5B0575';
rinkebyConfig.signingUtils.v2.abi = [
  'function isValidLenderSignature(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, address _loanContract) public view returns (bool)'
];

const goerliConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy
goerliConfig.chainId = 5;
goerliConfig.website.baseURI = 'https://goerli-integration.nftfi.com';
goerliConfig.api.baseURI = 'https://goerli-integration-sdk-api.nftfi.com';
goerliConfig.ethereum.account.multisig.gnosis.service.url = 'https://safe-transaction.goerli.gnosis.io';
goerliConfig.erc721.abi = [
  'function superOperators(address _operator, bool _status)',
  'function updateApprovedOperator(address _operator, bool _status)',
  'function drip(address _recipient)',
  'function approve(address to, uint256 tokenId)',
  'function transferFrom(address from, address to, uint256 tokenId)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function setApprovalForAll(address to, bool approved) public returns()',
  'function isApprovedForAll(address owner, address operator) view returns (bool)'
];
goerliConfig.erc20.abi = [
  'function mint(address account, uint256 amount)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address spender, uint256 value) returns (bool)',
  'function allowance(address owner, address spender) public view returns (uint256)'
];
goerliConfig.erc20.weth.address = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6';
goerliConfig.erc20.weth.symbol = 'wETH';
goerliConfig.erc20.weth.unit = 'ether';
goerliConfig.erc20.dai.address = '0x11fe4b6ae13d2a6055c8d9cf65c55bac32b5d844';
goerliConfig.erc20.dai.symbol = 'DAI';
goerliConfig.erc20.dai.unit = 'ether';
goerliConfig.erc20.usdc.address = '0x07865c6e87b9f70255377e024ace6630c1eaa37f';
goerliConfig.erc20.usdc.symbol = 'USDC';
goerliConfig.erc20.usdc.unit = 'mwei';
goerliConfig.registry.address = '0x78a911794a51a65ca9be8f94032331f3e8b4f1c2';
goerliConfig.registry.abi = ['function getNFTPermit(address _nftContract) view returns (bytes32)'];
goerliConfig.loan.fixed.v1.name = 'v1.loan.fixed';
goerliConfig.loan.fixed.v1.address = '0x0000000000000000000000000000000000000000';
goerliConfig.loan.fixed.v1.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint256 _loanId) nonpayable returns()',
  'function payBackLoan(uint256 _loanId)'
];
goerliConfig.loan.fixed.v2.name = 'v2.loan.fixed';
goerliConfig.loan.fixed.v2.address = '0x2ffF031e525a20fcF8944aC7Cf3Bdcc3b19a6D77';
goerliConfig.loan.fixed.v2.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
goerliConfig.loan.fixed.v2_1.name = 'v2-1.loan.fixed';
goerliConfig.loan.fixed.v2_1.address = '0x77097f421CEb2454eB5F77898d25159ff3C7381d';
goerliConfig.loan.fixed.v2_1.abi = goerliConfig.loan.fixed.v2.abi;
goerliConfig.loan.fixed.collection.v2.name = 'v2.loan.fixed.collection';
goerliConfig.loan.fixed.collection.v2.address = '0x06aE278EaE3A87d06652843Ac90d03e3E0d2E3f5';
goerliConfig.loan.fixed.collection.v2.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
goerliConfig.loan.adminFeeInBasisPoints = '500';
goerliConfig.ethereum.account.multisig.gnosis.service.url = 'https://safe-transaction.goerli.gnosis.io';
goerliConfig.signingUtils.v2.address = '0x7e4Dbdb623fBD48b01aF813aC324228575D04834';
goerliConfig.signingUtils.v2.abi = [
  'function isValidLenderSignature(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, address _loanContract) public view returns (bool)'
];
goerliConfig.bundler.v1.name = 'v1.bundler';
goerliConfig.bundler.v1.address = '0x17672f745C6c1F8aFF713Ac0EA97B865d97CCf24';
goerliConfig.bundler.v1.abi = [
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'event ImmutableMinted(uint256 indexed immutableId, uint256 indexed bundleId, address indexed personalBundler)',
  'function decomposeBundle(uint256 tokenId, address receiver)',
  'function addBundleElements(uint256 tokenId, tuple(address tokenContract, uint256[] ids, bool safeTransferable)[] _bundleElements)',
  'function removeBundleElements(uint256 tokenId, tuple(address tokenContract, uint256[] ids, bool safeTransferable)[] _bundleElements)',
  'function safeMint(address to) returns (uint256)',
  'function safeTransferFrom(address from, address to, uint256 tokenId)',
  'function totalChildContracts(uint256 tokenId) view returns (uint256)',
  'function childContractByIndex(uint256 tokenId, uint256 index) view returns (address childContract)',
  'function totalChildTokens(uint256 tokenId, address childContract) view returns (uint256)',
  'function childTokenByIndex(uint256 tokenId, address childContract, uint256 index) view returns (uint256 childTokenId)'
];
goerliConfig.immutable.v1.name = 'v1.immutable.bundle';
goerliConfig.immutable.v1.address = '0x69a0D346df2659dbb4BcE4b9276DD76B059e8EFc';
goerliConfig.immutable.v1.abi = [
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'function bundleOfImmutable(uint256) view returns (uint256)',
  'function withdraw(uint256 immutableId, address to)'
];
goerliConfig.auth.token.key = 'nftfiSdkToken';
goerliConfig.auth.refreshToken.key = 'nftfiSdkRefreshToken';

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
