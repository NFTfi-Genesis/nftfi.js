"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _baseConfigs;
var baseConfig = {
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
    wrappers: [{
      name: 'ERC721',
      safeTransfer: true
    }, {
      name: 'ERC721_LEGACY',
      safeTransfer: false
    }]
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
      abi: ['function offerPunkForSaleToAddress(uint256 punkIndex, uint256 minSalePriceInWei, address toAddress)', 'function punkIndexToAddress(uint256) view returns (address)', 'function punksOfferedForSale(uint256) view returns (bool isForSale, uint256 punkIndex, address seller, uint256 minValue, address onlySellTo)']
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
    token: {
      key: ''
    },
    refreshToken: {
      key: ''
    },
    tokenError: {
      key: ''
    }
  },
  protocol: {
    v3: {
      coordinator: {
        name: '',
        address: '',
        abi: []
      },
      assetOfferLoan: {
        v1: {
          abi: [],
          name: ''
        }
      },
      collectionOfferLoan: {
        v1: {
          abi: [],
          name: ''
        }
      },
      refinance: {
        v1: {
          name: '',
          address: '',
          abi: []
        }
      },
      obligationReceipt: {
        v1: {
          address: '',
          abi: []
        }
      },
      promissoryNote: {
        v1: {
          address: '',
          abi: []
        }
      },
      escrow: {
        v1: {
          name: '',
          address: '',
          abi: []
        }
      },
      erc20Manager: {
        v1: {
          name: '',
          address: '',
          abi: []
        }
      },
      signingUtils: {
        v1: {
          name: '',
          address: '',
          abi: []
        }
      },
      collectionSigningUtils: {
        v1: {
          name: '',
          address: '',
          abi: []
        }
      },
      type: {
        asset: {
          name: '',
          value: ''
        },
        collection: {
          name: '',
          value: ''
        }
      }
    }
  }
};
var mainnetConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy
mainnetConfig.chainId = 1;
mainnetConfig.website.baseURI = 'https://www.nftfi.com';
mainnetConfig.api.baseURI = 'https://sdk-api.nftfi.com';
mainnetConfig.websocket.baseURI = 'https://sdk-websocket.nftfi.com';
mainnetConfig.nft.cryptoPunks.address = '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB';
mainnetConfig.erc721.interfaceId = '0x80ac58cd';
mainnetConfig.erc721.abi = ['function ownerOf(uint256 tokenId) public view returns (address)', 'function setApprovalForAll(address to, bool approved) public returns()', 'function isApprovedForAll(address owner, address operator) view returns (bool)'];
mainnetConfig.erc1155.interfaceId = '0xd9b67a26';
mainnetConfig.erc1155.abi = ['function balanceOf(address _owner, uint256 _id) view returns (uint256)', 'function isApprovedForAll(address _owner, address _operator) view returns (bool isOperator)', 'function setApprovalForAll(address operator, bool approved)'];
mainnetConfig.erc20.abi = ['function balanceOf(address owner) view returns (uint256)', 'function approve(address spender, uint256 value) returns (bool)', 'function allowance(address owner, address spender) public view returns (uint256)'];
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
mainnetConfig.loan.fixed.v1.abi = ['function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)', 'function liquidateOverdueLoan(uint256 _loanId) nonpayable returns()', 'function payBackLoan(uint256 _loanId)'];
mainnetConfig.loan.fixed.collection.v2.name = 'v2.loan.fixed.collection';
mainnetConfig.loan.fixed.collection.v2.address = '0xE52Cec0E90115AbeB3304BaA36bc2655731f7934';
mainnetConfig.loan.fixed.collection.v2.abi = ['function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)', 'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()', 'function payBackLoan(uint32 _loanId)', 'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)', 'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)', 'function mintObligationReceipt(uint32 _loanId)', 'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'];
mainnetConfig.loan.fixed.collection.v2.obligationReceipt.address = '0xe73ece5988fff33a012cea8bb6fd5b27679fc481';
mainnetConfig.loan.fixed.collection.v2_3.name = 'v2-3.loan.fixed.collection';
mainnetConfig.loan.fixed.collection.v2_3.address = '0xD0C6e59B50C32530C627107F50Acc71958C4341F';
mainnetConfig.loan.fixed.collection.v2_3.abi = ['function cancelLoanCommitmentBeforeLoanHasBegun(uint256 _nonce)', 'function liquidateOverdueLoan(uint32 _loanId)', 'function payBackLoan(uint32 _loanId)', 'function acceptCollectionOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)', 'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer), tuple(uint256 nonce, uint256 expiry, address signer, bytes signature), tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints)) returns (uint32)', 'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)', 'function mintObligationReceipt(uint32 _loanId)', 'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'];
mainnetConfig.loan.fixed.collection.v2_3.obligationReceipt.address = '0xaabd3ebcc6ae1e87150c6184c038b94dc01a7708';
mainnetConfig.loan.fixed.v2.name = 'v2.loan.fixed';
mainnetConfig.loan.fixed.v2.address = '0xf896527c49b44aAb3Cf22aE356Fa3AF8E331F280';
mainnetConfig.loan.fixed.v2.abi = ['function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)', 'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()', 'function payBackLoan(uint32 _loanId)', 'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)', 'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)', 'function mintObligationReceipt(uint32 _loanId)', 'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'];
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
mainnetConfig.loan.refinance.abi = ['function refinanceCollectionOfferLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)', 'function refinanceLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)'];
mainnetConfig.ethereum.account.multisig.gnosis.service.url = 'https://safe-transaction-mainnet.safe.global';
mainnetConfig.signingUtils.v2.address = '0x5a42d72372858e10edc03b26bf449f78ff3c0e6f';
mainnetConfig.signingUtils.v2.abi = ['function isValidLenderSignature(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, address _loanContract) public view returns (bool)'];
mainnetConfig.signingUtils.v2_3.address = '0x43E5a2985897b4E0175Ed3A3f527A597cb29bbEe';
mainnetConfig.signingUtils.v2_3.abi = mainnetConfig.signingUtils.v2.abi;
mainnetConfig.bundler.v1.name = 'v1.bundler';
mainnetConfig.bundler.v1.address = '0x16c583748faeD1C5A5bcd744b4892ee6B6290094';
mainnetConfig.bundler.v1.abi = ['event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)', 'event ImmutableMinted(uint256 indexed immutableId, uint256 indexed bundleId, address indexed personalBundler)', 'function decomposeBundle(uint256 tokenId, address receiver)', 'function addBundleElements(uint256 tokenId, tuple(address tokenContract, uint256[] ids, bool safeTransferable)[] _bundleElements)', 'function removeBundleElements(uint256 tokenId, tuple(address tokenContract, uint256[] ids, bool safeTransferable)[] _bundleElements)', 'function safeMint(address to) returns (uint256)', 'function safeTransferFrom(address from, address to, uint256 tokenId)', 'function totalChildContracts(uint256 tokenId) view returns (uint256)', 'function childContractByIndex(uint256 tokenId, uint256 index) view returns (address childContract)', 'function totalChildTokens(uint256 tokenId, address childContract) view returns (uint256)', 'function childTokenByIndex(uint256 tokenId, address childContract, uint256 index) view returns (uint256 childTokenId)'];
mainnetConfig.bundler.v1_1.name = 'v1-1.bundler';
mainnetConfig.bundler.v1_1.address = '0x0259119359Bf053ebF42C9807752de6bbb4925f3';
mainnetConfig.bundler.v1_1.abi = ['event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)', 'event ImmutableMinted(uint256 indexed immutableId, uint256 indexed bundleId)', 'function decomposeBundle(uint256 tokenId, address receiver)', 'function addBundleElements(uint256 tokenId, tuple(address tokenContract, uint256[] ids, bool safeTransferable)[] _bundleElements)', 'function removeBundleElements(uint256 tokenId, tuple(address tokenContract, uint256[] ids, bool safeTransferable)[] _bundleElements)', 'function safeMint(address to) returns (uint256)', 'function safeTransferFrom(address from, address to, uint256 tokenId)', 'function totalChildContracts(uint256 tokenId) view returns (uint256)', 'function childContractByIndex(uint256 tokenId, uint256 index) view returns (address childContract)', 'function totalChildTokens(uint256 tokenId, address childContract) view returns (uint256)', 'function childTokenByIndex(uint256 tokenId, address childContract, uint256 index) view returns (uint256 childTokenId)'];
mainnetConfig.bundler.migrate.v1.name = 'v1.bundler.migrate';
mainnetConfig.bundler.migrate.v1.address = '0xa2Cb0dE6006Eff2B5b20719152231Bcd651BeC2f';
mainnetConfig.bundler.migrate.v1.abi = ['event BundleMigrated(uint256 newBundleId)', 'event BundleBurned(uint256 bundleId)', 'event ImmutableMigrated(uint256 newImmutableId)', 'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)', 'function migrateBundle(address oldBundleContract, address newBundleContract, uint256 oldBundleId) returns (uint256)', 'function migrateImmutable(address oldImmutableContract, address newImmutableContract, uint256 oldImmutableId) returns (uint256)', 'function decomposeAndBurnBundle(address _bundleContract, uint256 _bundleId, address _receiver)', 'function decomposeAndBurnImmutable(address _immutableContract, uint256 _immutableId, address _receiver)'];
mainnetConfig.immutable.v1.name = 'v1.immutable.bundle';
mainnetConfig.immutable.v1.address = '0x9a129032F01EB4dDD764c1777c81b771C34a2fbE';
mainnetConfig.immutable.v1.abi = ['event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)', 'function bundleOfImmutable(uint256) view returns (uint256)', 'function immutableOfBundle(uint256) view returns (uint256)', 'function withdraw(uint256 immutableId, address to)', 'function withdrawAndDecompose(uint256 immutableId, address to)'];
mainnetConfig.immutable.v1_1.name = 'v1-1.immutable.bundle';
mainnetConfig.immutable.v1_1.address = '0x46C9CFB32627B74F91e0B5ad575c247AEc7e7847';
mainnetConfig.immutable.v1_1.abi = mainnetConfig.immutable.v1.abi;
mainnetConfig.auth.token.key = 'nftfiSdkToken';
mainnetConfig.auth.refreshToken.key = 'nftfiSdkRefreshToken';
mainnetConfig.auth.tokenError.key = 'nftfiSdkTokenError';
mainnetConfig.protocol.v3.coordinator.name = 'v3.coordinator';
mainnetConfig.protocol.v3.coordinator.address = '0xA6D93ABC54268Cf849a93e867c129786f04fd2e6';
mainnetConfig.protocol.v3.coordinator.abi = ['function getWhetherNonceHasBeenUsedForUser(bytes32 _offerType, address _user, uint256 _nonce) view returns (bool)', 'function getDefaultLoanContractForOfferType(bytes32 _offerType) view returns (address)', 'function getLoanData(uint32 _loanId) view returns (tuple(address, uint64, uint8))', 'function getLoanDataAndOfferType(uint32 _loanId) view returns (tuple(address, uint64, uint8), bytes32)', 'function cancelLoanCommitment(bytes32 _offerType, uint256 _nonce)'];
mainnetConfig.protocol.v3.assetOfferLoan.v1.name = 'v3.assetOfferLoan.v1';
mainnetConfig.protocol.v3.assetOfferLoan.v1.abi = ['function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature)', 'function payBackLoan(uint32 _loanId)', 'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()', 'function mintObligationReceipt(uint32 _loanId)', 'function mintPromissoryNote(uint32 _loanId)'];
mainnetConfig.protocol.v3.collectionOfferLoan.v1.name = 'v3.collectionOfferLoan.v1';
mainnetConfig.protocol.v3.collectionOfferLoan.v1.abi = ['function acceptCollectionOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature)', 'function acceptCollectionOfferWithIdRange(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 minId, uint256 maxId) _idRange, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature)', 'function payBackLoan(uint32 _loanId)', 'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()', 'function mintObligationReceipt(uint32 _loanId)', 'function mintPromissoryNote(uint32 _loanId)'];
mainnetConfig.protocol.v3.obligationReceipt.v1.address = '0x48ed998e778Ab2663b6C49Bd09DfFF8Efd16B934';
mainnetConfig.protocol.v3.promissoryNote.v1.address = '0x77B53beb7f13Bd38de9F76Eed2F2c4F9efff7f4C';
mainnetConfig.protocol.v3.refinance.v1.name = 'v3.refinance.v1';
mainnetConfig.protocol.v3.refinance.v1.address = '0x6701B1D2E6d34727c0C37cDBd0cF421d3357DD0c';
mainnetConfig.protocol.v3.refinance.v1.abi = ['function refinanceLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature)', 'function refinanceCollectionOfferLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature)', 'function refinanceCollectionRangeOfferLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 minId, uint256 maxId) _idRange, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature)'];
mainnetConfig.protocol.v3.erc20Manager.v1.name = 'v3.erc20Manager.v1';
mainnetConfig.protocol.v3.erc20Manager.v1.address = '0x6730697f33d6D2490029b32899E7865c0d902Ca0';
mainnetConfig.protocol.v3.escrow.v1.name = 'v3.escrow.v1';
mainnetConfig.protocol.v3.escrow.v1.address = '0x2ae3e46290AdE43593eabd15642eBD67157f5351';
mainnetConfig.protocol.v3.signingUtils.v1.name = 'v3.signingUtils.v1';
mainnetConfig.protocol.v3.signingUtils.v1.address = '0x898D598B1E929dD77910D296c7524b2Bb8C21889';
mainnetConfig.protocol.v3.signingUtils.v1.abi = ['function isValidLenderSignature(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, bytes32 _offerType) public view returns (bool)'];
mainnetConfig.protocol.v3.collectionSigningUtils.v1.name = 'v3.collectionSigningUtils.v1';
mainnetConfig.protocol.v3.collectionSigningUtils.v1.address = '0x4ACD7A10CaC29bb7e53627F4236978A808473caB';
mainnetConfig.protocol.v3.collectionSigningUtils.v1.abi = ['function isValidLenderSignatureWithIdRange(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 minId, uint256 maxId) _idRange, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, bytes32 _offerType) public view returns (bool)'];
mainnetConfig.protocol.v3.type.asset.name = 'v3.asset';
mainnetConfig.protocol.v3.type.asset.value = 'ASSET_OFFER_LOAN';
mainnetConfig.protocol.v3.type.collection.name = 'v3.collection';
mainnetConfig.protocol.v3.type.collection.value = 'COLLECTION_OFFER_LOAN';
var sepoliaConfig = JSON.parse(JSON.stringify(baseConfig)); // Perform deep copy
sepoliaConfig.chainId = 11155111;
sepoliaConfig.website.baseURI = 'https://sepolia-integration.nftfi.com';
sepoliaConfig.api.baseURI = 'https://sepolia-integration-sdk-api.nftfi.com';
sepoliaConfig.websocket.baseURI = 'https://sepolia-integration-sdk-websocket.nftfi.com';
sepoliaConfig.ethereum.account.multisig.gnosis.service.url = 'https://safe-transaction-sepolia.safe.global';
sepoliaConfig.nft.cryptoPunks.address = '0x89F2E3cACF5A664adc75e989Ad9173dD513d6312';
sepoliaConfig.erc721.interfaceId = '0x80ac58cd';
sepoliaConfig.erc721.abi = ['function approve(address to, uint256 tokenId)', 'function transferFrom(address from, address to, uint256 tokenId)', 'function ownerOf(uint256 tokenId) public view returns (address)', 'function setApprovalForAll(address to, bool approved) public returns()', 'function isApprovedForAll(address owner, address operator) view returns (bool)'];
sepoliaConfig.erc1155.interfaceId = '0xd9b67a26';
sepoliaConfig.erc1155.abi = ['function balanceOf(address _owner, uint256 _id) view returns (uint256)', 'function isApprovedForAll(address _owner, address _operator) view returns (bool isOperator)', 'function setApprovalForAll(address operator, bool approved)'];
sepoliaConfig.erc20.abi = ['function mint(address account, uint256 amount)', 'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)', 'function balanceOf(address owner) view returns (uint256)', 'function approve(address spender, uint256 value) returns (bool)', 'function allowance(address owner, address spender) public view returns (uint256)'];
sepoliaConfig.erc20.weth.address = '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9';
sepoliaConfig.erc20.weth.symbol = 'wETH';
sepoliaConfig.erc20.weth.unit = 'ether';
sepoliaConfig.erc20.dai.address = '0x53844f9577c2334e541aec7df7174ece5df1fcf0';
sepoliaConfig.erc20.dai.symbol = 'DAI';
sepoliaConfig.erc20.dai.unit = 'ether';
sepoliaConfig.erc20.usdc.address = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
sepoliaConfig.erc20.usdc.symbol = 'USDC';
sepoliaConfig.erc20.usdc.unit = 'mwei';
sepoliaConfig.registry.address = '0x60358b897baae499d4b2520814e2ec35bbf122fa';
sepoliaConfig.registry.abi = ['function getNFTPermit(address _nftContract) view returns (bytes32)'];
sepoliaConfig.loan.fixed.v1.name = 'v1.loan.fixed';
sepoliaConfig.loan.fixed.v1.address = '0x0000000000000000000000000000000000000000';
sepoliaConfig.loan.fixed.v1.abi = ['function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)', 'function liquidateOverdueLoan(uint256 _loanId) nonpayable returns()', 'function payBackLoan(uint256 _loanId)'];
sepoliaConfig.loan.fixed.v2.name = 'v2.loan.fixed';
sepoliaConfig.loan.fixed.v2.address = '0x0000000000000000000000000000000000000000';
sepoliaConfig.loan.fixed.v2.abi = ['function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)', 'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()', 'function payBackLoan(uint32 _loanId)', 'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)', 'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)', 'function mintObligationReceipt(uint32 _loanId)', 'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'];
sepoliaConfig.loan.fixed.v2_1.name = 'v2-1.loan.fixed';
sepoliaConfig.loan.fixed.v2_1.address = '0x0000000000000000000000000000000000000000';
sepoliaConfig.loan.fixed.v2_1.abi = sepoliaConfig.loan.fixed.v2.abi;
sepoliaConfig.loan.fixed.v2_3.name = 'v2-3.loan.fixed';
sepoliaConfig.loan.fixed.v2_3.address = '0x170605b4753eB8837a08D3e58aF012B68eeD06b9';
sepoliaConfig.loan.fixed.v2_3.abi = sepoliaConfig.loan.fixed.v2.abi;
sepoliaConfig.loan.fixed.v2_3.obligationReceipt.address = '0xB4288B82362ff1C312d09506a88C38bFC39557db';
sepoliaConfig.loan.fixed.collection.v2.name = 'v2.loan.fixed.collection';
sepoliaConfig.loan.fixed.collection.v2.address = '0x0000000000000000000000000000000000000000';
sepoliaConfig.loan.fixed.collection.v2.abi = ['function cancelLoanCommitmentBeforeLoanHasBegun(uint256 nonce)', 'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()', 'function payBackLoan(uint32 _loanId)', 'function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)', 'function getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) view returns (bool)', 'event LoanStarted(uint32 indexed loanId, address indexed borrower, address indexed lender, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address loanERC20Denomination, uint32 loanDuration, uint16 loanInterestRateForDurationInBasisPoints, uint16 loanAdminFeeInBasisPoints, address nftCollateralWrapper, uint64 loanStartTime, address nftCollateralContract, address borrower) loanTerms, tuple(address revenueSharePartner, uint16 revenueShareInBasisPoints, uint16 referralFeeInBasisPoints) loanExtras)'];
sepoliaConfig.loan.fixed.collection.v2_3.name = 'v2-3.loan.fixed.collection';
sepoliaConfig.loan.fixed.collection.v2_3.address = '0x668aa2e694434C5Dc72D3AEb863762A66354EA2A';
sepoliaConfig.loan.fixed.collection.v2_3.abi = mainnetConfig.loan.fixed.collection.v2_3.abi;
sepoliaConfig.loan.fixed.collection.v2_3.obligationReceipt.address = '0xB4288B82362ff1C312d09506a88C38bFC39557db';
sepoliaConfig.loan.adminFeeInBasisPoints = '500';
sepoliaConfig.loan.refinance.name = 'loan.refinance';
sepoliaConfig.loan.refinance.address = '0x4427Eb1ABFA74eE202aeBA0aA171772C405Eb8Be';
sepoliaConfig.loan.refinance.abi = ['function refinanceCollectionOfferLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)', 'function refinanceLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature, tuple(address revenueSharePartner, uint16 referralFeeInBasisPoints) _borrowerSettings)'];
sepoliaConfig.signingUtils.v2.address = '0x0000000000000000000000000000000000000000';
sepoliaConfig.signingUtils.v2.abi = ['function isValidLenderSignature(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, uint16 loanAdminFeeInBasisPoints, address loanERC20Denomination, address referrer) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, address _loanContract) public view returns (bool)'];
sepoliaConfig.signingUtils.v2_3.address = '0xA9bcE822C9C7F342765B9f664c235BfEfFEae85A';
sepoliaConfig.signingUtils.v2_3.abi = sepoliaConfig.signingUtils.v2.abi;
sepoliaConfig.bundler.v1.name = 'v1.bundler';
sepoliaConfig.bundler.v1.address = '0xea092C0728ECd6b0768b02e0563f0b7FAA66b713';
sepoliaConfig.bundler.v1.abi = ['event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)', 'event ImmutableMinted(uint256 indexed immutableId, uint256 indexed bundleId, address indexed personalBundler)', 'function decomposeBundle(uint256 tokenId, address receiver)', 'function addBundleElements(uint256 tokenId, tuple(address tokenContract, uint256[] ids, bool safeTransferable)[] _bundleElements)', 'function removeBundleElements(uint256 tokenId, tuple(address tokenContract, uint256[] ids, bool safeTransferable)[] _bundleElements)', 'function safeMint(address to) returns (uint256)', 'function safeTransferFrom(address from, address to, uint256 tokenId)', 'function totalChildContracts(uint256 tokenId) view returns (uint256)', 'function childContractByIndex(uint256 tokenId, uint256 index) view returns (address childContract)', 'function totalChildTokens(uint256 tokenId, address childContract) view returns (uint256)', 'function childTokenByIndex(uint256 tokenId, address childContract, uint256 index) view returns (uint256 childTokenId)'];
sepoliaConfig.bundler.v1_1.name = 'v1-1.bundler';
sepoliaConfig.bundler.v1_1.address = '0x903d94E87b89F62780C6808d82931C11C10DE375';
sepoliaConfig.bundler.v1_1.abi = ['event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)', 'event ImmutableMinted(uint256 indexed immutableId, uint256 indexed bundleId)', 'function decomposeBundle(uint256 tokenId, address receiver)', 'function addBundleElements(uint256 tokenId, tuple(address tokenContract, uint256[] ids, bool safeTransferable)[] _bundleElements)', 'function removeBundleElements(uint256 tokenId, tuple(address tokenContract, uint256[] ids, bool safeTransferable)[] _bundleElements)', 'function safeMint(address to) returns (uint256)', 'function safeTransferFrom(address from, address to, uint256 tokenId)', 'function totalChildContracts(uint256 tokenId) view returns (uint256)', 'function childContractByIndex(uint256 tokenId, uint256 index) view returns (address childContract)', 'function totalChildTokens(uint256 tokenId, address childContract) view returns (uint256)', 'function childTokenByIndex(uint256 tokenId, address childContract, uint256 index) view returns (uint256 childTokenId)'];
sepoliaConfig.bundler.migrate.v1.name = 'v1.bundler.migrate';
sepoliaConfig.bundler.migrate.v1.address = '0x3C12F251821F24deF784E32192a72DAF676cd9cc';
sepoliaConfig.bundler.migrate.v1.abi = mainnetConfig.bundler.migrate.v1.abi;
sepoliaConfig.immutable.v1.name = 'v1.immutable.bundle';
sepoliaConfig.immutable.v1.address = '0x4b45B6fC98616D4A3E9c59395d4526a863202B6e';
sepoliaConfig.immutable.v1.abi = ['event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)', 'function bundleOfImmutable(uint256) view returns (uint256)', 'function immutableOfBundle(uint256) view returns (uint256)', 'function withdraw(uint256 immutableId, address to)', 'function withdrawAndDecompose(uint256 immutableId, address to)'];
sepoliaConfig.immutable.v1_1.name = 'v1-1.immutable.bundle';
sepoliaConfig.immutable.v1_1.address = '0x0e80A674D3982e1B4Fa0C6c87dD06Aa42DcbA734';
sepoliaConfig.immutable.v1_1.abi = sepoliaConfig.immutable.v1.abi;
sepoliaConfig.auth.token.key = 'nftfiSdkToken';
sepoliaConfig.auth.refreshToken.key = 'nftfiSdkRefreshToken';
sepoliaConfig.auth.tokenError.key = 'nftfiSdkTokenError';
sepoliaConfig.protocol.v3.coordinator.name = 'v3.coordinator';
sepoliaConfig.protocol.v3.coordinator.address = '0x0a6D5D266c5eFA9e200Eab2b2900ABAEE84C765A';
sepoliaConfig.protocol.v3.coordinator.abi = ['function getWhetherNonceHasBeenUsedForUser(bytes32 _offerType, address _user, uint256 _nonce) view returns (bool)', 'function getDefaultLoanContractForOfferType(bytes32 _offerType) view returns (address)', 'function getLoanData(uint32 _loanId) view returns (tuple(address, uint64, uint8))', 'function getLoanDataAndOfferType(uint32 _loanId) view returns (tuple(address, uint64, uint8), bytes32)', 'function cancelLoanCommitment(bytes32 _offerType, uint256 _nonce)'];
sepoliaConfig.protocol.v3.assetOfferLoan.v1.name = 'v3.assetOfferLoan.v1';
sepoliaConfig.protocol.v3.assetOfferLoan.v1.abi = ['function acceptOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature)', 'function payBackLoan(uint32 _loanId)', 'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()', 'function mintObligationReceipt(uint32 _loanId)', 'function mintPromissoryNote(uint32 _loanId)'];
sepoliaConfig.protocol.v3.collectionOfferLoan.v1.name = 'v3.collectionOfferLoan.v1';
sepoliaConfig.protocol.v3.collectionOfferLoan.v1.abi = ['function acceptCollectionOffer(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature)', 'function acceptCollectionOfferWithIdRange(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 minId, uint256 maxId) _idRange, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature)', 'function payBackLoan(uint32 _loanId)', 'function liquidateOverdueLoan(uint32 _loanId) nonpayable returns()', 'function mintObligationReceipt(uint32 _loanId)', 'function mintPromissoryNote(uint32 _loanId)'];
sepoliaConfig.protocol.v3.obligationReceipt.v1.address = '0x05eC80A13De4992dC985ca9B69519d9f88B6f504';
sepoliaConfig.protocol.v3.promissoryNote.v1.address = '0xe13a9BDB46F14561ACBe808Bd70A87f0AD7e3303';
sepoliaConfig.protocol.v3.refinance.v1.name = 'v3.refinance.v1';
sepoliaConfig.protocol.v3.refinance.v1.address = '0x098Ac7DF14e29734adE9e2695B02E060DdA1Db2e';
sepoliaConfig.protocol.v3.refinance.v1.abi = ['function refinanceLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature)', 'function refinanceCollectionOfferLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature)', 'function refinanceCollectionRangeOfferLoan(tuple(uint256 loanIdentifier, address refinanceableContract) _refinancingData, tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 minId, uint256 maxId) _idRange, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _lenderSignature)'];
sepoliaConfig.protocol.v3.erc20Manager.v1.name = 'v3.erc20Manager.v1';
sepoliaConfig.protocol.v3.erc20Manager.v1.address = '0x96991284dcC64139234aDe2ca348D73A344CcA86';
sepoliaConfig.protocol.v3.escrow.v1.name = 'v3.escrow.v1';
sepoliaConfig.protocol.v3.escrow.v1.address = '0xdA1FfB0Bf2cE637FF12CA31C841Ced04b6483CfD';
sepoliaConfig.protocol.v3.signingUtils.v1.name = 'v3.signingUtils.v1';
sepoliaConfig.protocol.v3.signingUtils.v1.address = '0x7d6560a70DB8556C632a7c85d8246FF097E23137';
sepoliaConfig.protocol.v3.signingUtils.v1.abi = ['function isValidLenderSignature(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, bytes32 _offerType) public view returns (bool)'];
sepoliaConfig.protocol.v3.collectionSigningUtils.v1.name = 'v3.collectionSigningUtils.v1';
sepoliaConfig.protocol.v3.collectionSigningUtils.v1.address = '0x389f8380dA80a48046e47A71F6518f0466898365';
sepoliaConfig.protocol.v3.collectionSigningUtils.v1.abi = ['function isValidLenderSignatureWithIdRange(tuple(uint256 loanPrincipalAmount, uint256 maximumRepaymentAmount, uint256 nftCollateralId, address nftCollateralContract, uint32 loanDuration, address loanERC20Denomination, bool isProRata, uint256 originationFee) _offer, tuple(uint256 minId, uint256 maxId) _idRange, tuple(uint256 nonce, uint256 expiry, address signer, bytes signature) _signature, bytes32 _offerType) public view returns (bool)'];
sepoliaConfig.protocol.v3.type.asset.name = 'v3.asset';
sepoliaConfig.protocol.v3.type.asset.value = 'ASSET_OFFER_LOAN';
sepoliaConfig.protocol.v3.type.collection.name = 'v3.collection';
sepoliaConfig.protocol.v3.type.collection.value = 'COLLECTION_OFFER_LOAN';
var baseConfigs = (_baseConfigs = {}, (0, _defineProperty2["default"])(_baseConfigs, mainnetConfig.chainId, mainnetConfig), (0, _defineProperty2["default"])(_baseConfigs, sepoliaConfig.chainId, sepoliaConfig), _baseConfigs);
var Config = /*#__PURE__*/function () {
  function Config() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Config);
    var version = options === null || options === void 0 ? void 0 : options.version;
    var merge = options === null || options === void 0 ? void 0 : options.merge;
    var customConfig = options.config && (0, _typeof2["default"])(options.config) == 'object' ? options.config : {};
    var baseConfig = baseConfigs[options.chainId];
    var mergedConfig = merge(baseConfig, customConfig, {
      version: version
    });
    for (var prop in mergedConfig) {
      this[prop] = mergedConfig[prop];
    }
  }
  (0, _createClass2["default"])(Config, [{
    key: "getContractAddress",
    value: function getContractAddress(contractName) {
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
  }]);
  return Config;
}();
var _default = Config;
exports["default"] = _default;