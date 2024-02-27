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
    refinance: {
      abi: [],
      address: ''
    },
    fixed: {
      collection: {
        v2: {
          name: '',
          address: '',
          abi: [],
          obligationReceipt: {
            address: ''
          }
        },
        v2_3: {
          name: '',
          address: '',
          abi: [],
          obligationReceipt: {
            address: ''
          }
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
        abi: [],
        obligationReceipt: {
          address: ''
        }
      },
      v2_3: {
        name: '',
        address: '',
        abi: [],
        obligationReceipt: {
          address: ''
        }
      }
    }
  },
  bundler: {
    v1: {
      name: '',
      address: '',
      abi: []
    },
    v1_1: {
      name: '',
      address: '',
      abi: []
    },
    migrate: {
      v1: {
        address: '',
        abi: ''
      }
    }
  },
  immutable: {
    v1: {
      name: '',
      address: '',
      abi: []
    },
    v1_1: {
      name: '',
      address: '',
      abi: []
    },
    migrate: {
      v1: {
        address: '',
        abi: ''
      }
    }
  },
  erc721: {
    interfaceId: '',
    abi: []
  },
  erc1155: {
    interfaceId: '',
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
  nft: {
    cryptoPunks: {
      address: '',
      abi: [
        'function offerPunkForSaleToAddress(uint256 punkIndex, uint256 minSalePriceInWei, address toAddress)',
        'function punkIndexToAddress(uint256) view returns (address)',
        'function punksOfferedForSale(uint256) view returns (bool isForSale, uint256 punkIndex, address seller, uint256 minValue, address onlySellTo)'
      ]
    }
  },
  website: {
    baseURI: ''
  },
  api: {
    key: '',
    baseURI: ''
  },
  websocket: {
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
    },
    v2_3: {
      address: '',
      abi: []
    }
  },
  auth: {
    token: { key: '' },
    refreshToken: { key: '' },
    tokenError: { key: '' }
  }
};

const mainnetConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy
mainnetConfig.chainId = 1;
mainnetConfig.website.baseURI = 'https://www.nftfi.com';
mainnetConfig.api.baseURI = 'https://sdk-api.nftfi.com';
mainnetConfig.websocket.baseURI = 'https://sdk-websocket.nftfi.com';
mainnetConfig.nft.cryptoPunks.address = '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB';
mainnetConfig.erc721.interfaceId = '0x80ac58cd';
mainnetConfig.erc721.abi = [
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function setApprovalForAll(address to, bool approved) public returns()',
  'function isApprovedForAll(address owner, address operator) view returns (bool)'
];
mainnetConfig.erc1155.interfaceId = '0xd9b67a26';
mainnetConfig.erc1155.abi = [
  'function balanceOf(address _owner, uint256 _id) view returns (uint256)',
  'function isApprovedForAll(address _owner, address _operator) view returns (bool isOperator)',
  'function setApprovalForAll(address operator, bool approved)'
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
  'function mintObligationReceipt(uint32 _loanId)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
mainnetConfig.loan.fixed.collection.v2.obligationReceipt.address = '0xe73ece5988fff33a012cea8bb6fd5b27679fc481';
mainnetConfig.loan.fixed.collection.v2_3.name = 'v2-3.loan.fixed.collection';
mainnetConfig.loan.fixed.collection.v2_3.address = '0xD0C6e59B50C32530C627107F50Acc71958C4341F';
mainnetConfig.loan.fixed.collection.v2_3.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 _nonce)',
  'function liquidateOverdueLoan(uint32 _loanId)',
  'function payBackLoan(uint32 _loanId)',
  'function acceptCollectionOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer), tuple(uint256 nonce, uint256 expiry, address signer, bytes signature), tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints)) returns (uint32)',
  'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)',
  'function mintObligationReceipt(uint32 _loanId)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
mainnetConfig.loan.fixed.collection.v2_3.obligationReceipt.address = '0xaabd3ebcc6ae1e87150c6184c038b94dc01a7708';
mainnetConfig.loan.fixed.v2.name = 'v2.loan.fixed';
mainnetConfig.loan.fixed.v2.address = '0xf896527c49b44aAb3Cf22aE356Fa3AF8E331F280';
mainnetConfig.loan.fixed.v2.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)',
  'function mintObligationReceipt(uint32 _loanId)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
mainnetConfig.loan.fixed.v2_1.name = 'v2-1.loan.fixed';
mainnetConfig.loan.fixed.v2_1.address = '0x8252Df1d8b29057d1Afe3062bf5a64D503152BC8';
mainnetConfig.loan.fixed.v2_1.abi = mainnetConfig.loan.fixed.v2.abi;
mainnetConfig.loan.fixed.v2_1.obligationReceipt.address = '0xe73ece5988fff33a012cea8bb6fd5b27679fc481';
mainnetConfig.loan.fixed.v2_3.name = 'v2-3.loan.fixed';
mainnetConfig.loan.fixed.v2_3.address = '0xd0a40eB7FD94eE97102BA8e9342243A2b2E22207';
mainnetConfig.loan.fixed.v2_3.abi = mainnetConfig.loan.fixed.v2.abi;
mainnetConfig.loan.fixed.v2_3.obligationReceipt.address = '0xaabd3ebcc6ae1e87150c6184c038b94dc01a7708';
mainnetConfig.loan.adminFeeInBasisPoints = '500';
mainnetConfig.loan.refinance.name = 'loan.refinance';
mainnetConfig.loan.refinance.address = '0x25fF4B398cD97B5bFBbE68378Aae1F23CBe13bBA';
mainnetConfig.loan.refinance.abi = [
  'function refinanceCollectionOfferLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function refinanceLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)'
];
mainnetConfig.ethereum.account.multisig.gnosis.service.url = 'https://safe-transaction-mainnet.safe.global';
mainnetConfig.signingUtils.v2.address = '0x5a42d72372858e10edc03b26bf449f78ff3c0e6f';
mainnetConfig.signingUtils.v2.abi = [
  'function isValidLenderSignature(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, address _loanContract) public view returns (bool)'
];
mainnetConfig.signingUtils.v2_3.address = '0x43E5a2985897b4E0175Ed3A3f527A597cb29bbEe';
mainnetConfig.signingUtils.v2_3.abi = mainnetConfig.signingUtils.v2.abi;
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
mainnetConfig.bundler.v1_1.name = 'v1-1.bundler';
mainnetConfig.bundler.v1_1.address = '0x0259119359Bf053ebF42C9807752de6bbb4925f3';
mainnetConfig.bundler.v1_1.abi = [
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'event ImmutableMinted(uint256 indexed immutableId, uint256 indexed bundleId)',
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
mainnetConfig.bundler.migrate.v1.name = 'v1.bundler.migrate';
mainnetConfig.bundler.migrate.v1.address = '0xa2Cb0dE6006Eff2B5b20719152231Bcd651BeC2f';
mainnetConfig.bundler.migrate.v1.abi = [
  'event BundleMigrated(uint256 newBundleId)',
  'event BundleBurned(uint256 bundleId)',
  'event ImmutableMigrated(uint256 newImmutableId)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'function migrateBundle(address oldBundleContract, address newBundleContract, uint256 oldBundleId) returns (uint256)',
  'function migrateImmutable(address oldImmutableContract, address newImmutableContract, uint256 oldImmutableId) returns (uint256)',
  'function decomposeAndBurnBundle(address _bundleContract, uint256 _bundleId, address _receiver)',
  'function decomposeAndBurnImmutable(address _immutableContract, uint256 _immutableId, address _receiver)'
];
mainnetConfig.immutable.v1.name = 'v1.immutable.bundle';
mainnetConfig.immutable.v1.address = '0x9a129032F01EB4dDD764c1777c81b771C34a2fbE';
mainnetConfig.immutable.v1.abi = [
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'function bundleOfImmutable(uint256) view returns (uint256)',
  'function immutableOfBundle(uint256) view returns (uint256)',
  'function withdraw(uint256 immutableId, address to)',
  'function withdrawAndDecompose(uint256 immutableId, address to)'
];
mainnetConfig.immutable.v1_1.name = 'v1-1.immutable.bundle';
mainnetConfig.immutable.v1_1.address = '0x46C9CFB32627B74F91e0B5ad575c247AEc7e7847';
mainnetConfig.immutable.v1_1.abi = mainnetConfig.immutable.v1.abi;
mainnetConfig.auth.token.key = 'nftfiSdkToken';
mainnetConfig.auth.refreshToken.key = 'nftfiSdkRefreshToken';
mainnetConfig.auth.tokenError.key = 'nftfiSdkTokenError';

const goerliConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy
goerliConfig.chainId = 5;
goerliConfig.website.baseURI = 'https://goerli-integration.nftfi.com';
goerliConfig.api.baseURI = 'https://goerli-integration-sdk-api.nftfi.com';
goerliConfig.websocket.baseURI = 'https://goerli-integration-sdk-websocket.nftfi.com';
goerliConfig.ethereum.account.multisig.gnosis.service.url = 'https://safe-transaction-goerli.safe.global';
goerliConfig.nft.cryptoPunks.address = '0x7066d903DF9695a5a30B50C24582dA7d1269A09f';
goerliConfig.erc721.interfaceId = '0x80ac58cd';
goerliConfig.erc721.abi = [
  'function approve(address to, uint256 tokenId)',
  'function transferFrom(address from, address to, uint256 tokenId)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function setApprovalForAll(address to, bool approved) public returns()',
  'function isApprovedForAll(address owner, address operator) view returns (bool)'
];
goerliConfig.erc1155.interfaceId = '0xd9b67a26';
goerliConfig.erc1155.abi = [
  'function balanceOf(address _owner, uint256 _id) view returns (uint256)',
  'function isApprovedForAll(address _owner, address _operator) view returns (bool isOperator)',
  'function setApprovalForAll(address operator, bool approved)'
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
  'function mintObligationReceipt(uint32 _loanId)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
goerliConfig.loan.fixed.v2_1.name = 'v2-1.loan.fixed';
goerliConfig.loan.fixed.v2_1.address = '0x77097f421CEb2454eB5F77898d25159ff3C7381d';
goerliConfig.loan.fixed.v2_1.abi = goerliConfig.loan.fixed.v2.abi;
goerliConfig.loan.fixed.v2_1.obligationReceipt.address = '0x3a44cc29c019865aa71c2352abc5700403296d58';
goerliConfig.loan.fixed.v2_3.name = 'v2-3.loan.fixed';
goerliConfig.loan.fixed.v2_3.address = '0x2f42800C426237e535cA9eCccdC38F794f26F6e3';
goerliConfig.loan.fixed.v2_3.abi = goerliConfig.loan.fixed.v2.abi;
goerliConfig.loan.fixed.v2_3.obligationReceipt.address = '0xDeE9b6E2f1aa9c14214d87d2911f3550ef1A87bB';
goerliConfig.loan.fixed.collection.v2.name = 'v2.loan.fixed.collection';
goerliConfig.loan.fixed.collection.v2.address = '0x06aE278EaE3A87d06652843Ac90d03e3E0d2E3f5';
goerliConfig.loan.fixed.collection.v2.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)',
  'function mintObligationReceipt(uint32 _loanId)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
goerliConfig.loan.fixed.collection.v2.obligationReceipt.address = '0x3a44cc29c019865aa71c2352abc5700403296d58';
goerliConfig.loan.fixed.collection.v2_3.name = 'v2-3.loan.fixed.collection';
goerliConfig.loan.fixed.collection.v2_3.address = '0xdA1FfB0Bf2cE637FF12CA31C841Ced04b6483CfD';
goerliConfig.loan.fixed.collection.v2_3.abi = mainnetConfig.loan.fixed.collection.v2_3.abi;
goerliConfig.loan.fixed.collection.v2_3.obligationReceipt.address = '0xDeE9b6E2f1aa9c14214d87d2911f3550ef1A87bB';
goerliConfig.loan.adminFeeInBasisPoints = '500';
goerliConfig.loan.refinance.name = 'loan.refinance';
goerliConfig.loan.refinance.address = '0x0D7d94C2977160e5B4DD1bcc68828F74751b1A27';
goerliConfig.loan.refinance.abi = [
  'function refinanceCollectionOfferLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function refinanceLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)'
];
goerliConfig.signingUtils.v2.address = '0x7e4Dbdb623fBD48b01aF813aC324228575D04834';
goerliConfig.signingUtils.v2.abi = [
  'function isValidLenderSignature(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, address _loanContract) public view returns (bool)'
];
goerliConfig.signingUtils.v2_3.address = '0x4Fb9Ab3d2Ec9e95b0faf36D67E4DEae9A6549244';
goerliConfig.signingUtils.v2_3.abi = goerliConfig.signingUtils.v2.abi;
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
goerliConfig.bundler.v1_1.name = 'v1-1.bundler';
goerliConfig.bundler.v1_1.address = '0x7d5c5c9b6a24db20067fee4ff59c07567def368d';
goerliConfig.bundler.v1_1.abi = [
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'event ImmutableMinted(uint256 indexed immutableId, uint256 indexed bundleId)',
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
goerliConfig.bundler.migrate.v1.name = 'v1.bundler.migrate';
goerliConfig.bundler.migrate.v1.address = '0xFc33A489A8082e9F6F48cbD8ba7D93a6fD36E494';
goerliConfig.bundler.migrate.v1.abi = mainnetConfig.bundler.migrate.v1.abi;
goerliConfig.immutable.v1.name = 'v1.immutable.bundle';
goerliConfig.immutable.v1.address = '0x69a0D346df2659dbb4BcE4b9276DD76B059e8EFc';
goerliConfig.immutable.v1.abi = [
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'function bundleOfImmutable(uint256) view returns (uint256)',
  'function immutableOfBundle(uint256) view returns (uint256)',
  'function withdraw(uint256 immutableId, address to)',
  'function withdrawAndDecompose(uint256 immutableId, address to)'
];
goerliConfig.immutable.v1_1.name = 'v1-1.immutable.bundle';
goerliConfig.immutable.v1_1.address = '0xE78097873C44f45ea06A5A36669a8866f6dC61E2';
goerliConfig.immutable.v1_1.abi = goerliConfig.immutable.v1.abi;
goerliConfig.auth.token.key = 'nftfiSdkToken';
goerliConfig.auth.refreshToken.key = 'nftfiSdkRefreshToken';
goerliConfig.auth.tokenError.key = 'nftfiSdkTokenError';

const sepoliaConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy
sepoliaConfig.chainId = 11155111;
sepoliaConfig.website.baseURI = 'https://sepolia-integration.nftfi.com';
sepoliaConfig.api.baseURI = 'https://sepolia-integration-sdk-api.nftfi.com';
sepoliaConfig.websocket.baseURI = 'https://sepolia-integration-sdk-websocket.nftfi.com';
sepoliaConfig.ethereum.account.multisig.gnosis.service.url = 'https://safe-transaction-sepolia.safe.global';
sepoliaConfig.nft.cryptoPunks.address = '0x89F2E3cACF5A664adc75e989Ad9173dD513d6312';
sepoliaConfig.erc721.interfaceId = '0x80ac58cd';
sepoliaConfig.erc721.abi = [
  'function approve(address to, uint256 tokenId)',
  'function transferFrom(address from, address to, uint256 tokenId)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function setApprovalForAll(address to, bool approved) public returns()',
  'function isApprovedForAll(address owner, address operator) view returns (bool)'
];
sepoliaConfig.erc1155.interfaceId = '0xd9b67a26';
sepoliaConfig.erc1155.abi = [
  'function balanceOf(address _owner, uint256 _id) view returns (uint256)',
  'function isApprovedForAll(address _owner, address _operator) view returns (bool isOperator)',
  'function setApprovalForAll(address operator, bool approved)'
];
sepoliaConfig.erc20.abi = [
  'function mint(address account, uint256 amount)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address spender, uint256 value) returns (bool)',
  'function allowance(address owner, address spender) public view returns (uint256)'
];
sepoliaConfig.erc20.weth.address = '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9';
sepoliaConfig.erc20.weth.symbol = 'wETH';
sepoliaConfig.erc20.weth.unit = 'ether';
sepoliaConfig.erc20.dai.address = '0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6';
sepoliaConfig.erc20.dai.symbol = 'DAI';
sepoliaConfig.erc20.dai.unit = 'ether';
sepoliaConfig.erc20.usdc.address = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
sepoliaConfig.erc20.usdc.symbol = 'USDC';
sepoliaConfig.erc20.usdc.unit = 'mwei';
sepoliaConfig.registry.address = '0x60358b897baae499d4b2520814e2ec35bbf122fa';
sepoliaConfig.registry.abi = ['function getNFTPermit(address _nftContract) view returns (bytes32)'];
sepoliaConfig.loan.fixed.v1.name = 'v1.loan.fixed';
sepoliaConfig.loan.fixed.v1.address = '0x0000000000000000000000000000000000000000';
sepoliaConfig.loan.fixed.v1.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint256 _loanId) nonpayable returns()',
  'function payBackLoan(uint256 _loanId)'
];
sepoliaConfig.loan.fixed.v2.name = 'v2.loan.fixed';
sepoliaConfig.loan.fixed.v2.address = '0x0000000000000000000000000000000000000000';
sepoliaConfig.loan.fixed.v2.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)',
  'function mintObligationReceipt(uint32 _loanId)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
sepoliaConfig.loan.fixed.v2_1.name = 'v2-1.loan.fixed';
sepoliaConfig.loan.fixed.v2_1.address = '0x0000000000000000000000000000000000000000';
sepoliaConfig.loan.fixed.v2_1.abi = sepoliaConfig.loan.fixed.v2.abi;
sepoliaConfig.loan.fixed.v2_3.name = 'v2-3.loan.fixed';
sepoliaConfig.loan.fixed.v2_3.address = '0x170605b4753eB8837a08D3e58aF012B68eeD06b9';
sepoliaConfig.loan.fixed.v2_3.abi = sepoliaConfig.loan.fixed.v2.abi;
sepoliaConfig.loan.fixed.v2_3.obligationReceipt.address = '0xB4288B82362ff1C312d09506a88C38bFC39557db';
sepoliaConfig.loan.fixed.collection.v2.name = 'v2.loan.fixed.collection';
sepoliaConfig.loan.fixed.collection.v2.address = '0x0000000000000000000000000000000000000000';
sepoliaConfig.loan.fixed.collection.v2.abi = [
  'function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)',
  'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()',
  'function payBackLoan(uint32 _loanId)',
  'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)',
  'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'
];
sepoliaConfig.loan.fixed.collection.v2_3.name = 'v2-3.loan.fixed.collection';
sepoliaConfig.loan.fixed.collection.v2_3.address = '0x668aa2e694434C5Dc72D3AEb863762A66354EA2A';
sepoliaConfig.loan.fixed.collection.v2_3.abi = mainnetConfig.loan.fixed.collection.v2_3.abi;
sepoliaConfig.loan.fixed.collection.v2_3.obligationReceipt.address = '0xB4288B82362ff1C312d09506a88C38bFC39557db';
sepoliaConfig.loan.adminFeeInBasisPoints = '500';
sepoliaConfig.loan.refinance.name = 'loan.refinance';
sepoliaConfig.loan.refinance.address = '0x4427Eb1ABFA74eE202aeBA0aA171772C405Eb8Be';
sepoliaConfig.loan.refinance.abi = [
  'function refinanceCollectionOfferLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)',
  'function refinanceLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)'
];
sepoliaConfig.signingUtils.v2.address = '0x0000000000000000000000000000000000000000';
sepoliaConfig.signingUtils.v2.abi = [
  'function isValidLenderSignature(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, address _loanContract) public view returns (bool)'
];
sepoliaConfig.signingUtils.v2_3.address = '0xA9bcE822C9C7F342765B9f664c235BfEfFEae85A';
sepoliaConfig.signingUtils.v2_3.abi = sepoliaConfig.signingUtils.v2.abi;
sepoliaConfig.bundler.v1.name = 'v1.bundler';
sepoliaConfig.bundler.v1.address = '0x0000000000000000000000000000000000000000';
sepoliaConfig.bundler.v1.abi = [
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
sepoliaConfig.bundler.v1_1.name = 'v1-1.bundler';
sepoliaConfig.bundler.v1_1.address = '0x903d94E87b89F62780C6808d82931C11C10DE375';
sepoliaConfig.bundler.v1_1.abi = [
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'event ImmutableMinted(uint256 indexed immutableId, uint256 indexed bundleId)',
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
sepoliaConfig.bundler.migrate.v1.name = 'v1.bundler.migrate';
sepoliaConfig.bundler.migrate.v1.address = '0x3C12F251821F24deF784E32192a72DAF676cd9cc';
sepoliaConfig.bundler.migrate.v1.abi = mainnetConfig.bundler.migrate.v1.abi;
sepoliaConfig.immutable.v1.name = 'v1.immutable.bundle';
sepoliaConfig.immutable.v1.address = '0x0000000000000000000000000000000000000000';
sepoliaConfig.immutable.v1.abi = [
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'function bundleOfImmutable(uint256) view returns (uint256)',
  'function immutableOfBundle(uint256) view returns (uint256)',
  'function withdraw(uint256 immutableId, address to)',
  'function withdrawAndDecompose(uint256 immutableId, address to)'
];
sepoliaConfig.immutable.v1_1.name = 'v1-1.immutable.bundle';
sepoliaConfig.immutable.v1_1.address = '0x0e80A674D3982e1B4Fa0C6c87dD06Aa42DcbA734';
sepoliaConfig.immutable.v1_1.abi = sepoliaConfig.immutable.v1.abi;
sepoliaConfig.auth.token.key = 'nftfiSdkToken';
sepoliaConfig.auth.refreshToken.key = 'nftfiSdkRefreshToken';
sepoliaConfig.auth.tokenError.key = 'nftfiSdkTokenError';

const baseConfigs = {
  [mainnetConfig.chainId]: mainnetConfig,
  [goerliConfig.chainId]: goerliConfig,
  [sepoliaConfig.chainId]: sepoliaConfig
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

  getContractAddress(contractName) {
    switch (contractName) {
      case 'v2-1.loan.fixed':
        return this.loan.fixed.v2_1.address;
      case 'v2-3.loan.fixed':
        return this.loan.fixed.v2_3.address;
      case 'v2.loan.fixed.collection':
        return this.loan.fixed.collection.v2.address;
      case 'v2-3.loan.fixed.collection':
        return this.loan.fixed.collection.v2_3.address;
    }
  }
}

export default Config;
