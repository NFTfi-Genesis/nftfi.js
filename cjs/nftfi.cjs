"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("./nftfi/config.cjs"));
var _account = _interopRequireDefault(require("./nftfi/account.cjs"));
var _http = _interopRequireDefault(require("./nftfi/http.cjs"));
var _utils = _interopRequireDefault(require("./nftfi/utils.cjs"));
var _websocket = _interopRequireDefault(require("./nftfi/websocket.cjs"));
var _auth = _interopRequireDefault(require("./nftfi/auth.cjs"));
var _api = _interopRequireDefault(require("./nftfi/api.cjs"));
var _listings = _interopRequireDefault(require("./nftfi/listings.cjs"));
var _offers = _interopRequireDefault(require("./nftfi/offers.cjs"));
var _signatures = _interopRequireDefault(require("./nftfi/offers/signatures.cjs"));
var _helper = _interopRequireDefault(require("./nftfi/offers/helper.cjs"));
var _validation = _interopRequireDefault(require("./nftfi/offers/validation.cjs"));
var _requests = _interopRequireDefault(require("./nftfi/offers/requests.cjs"));
var _events = _interopRequireDefault(require("./nftfi/events.cjs"));
var _loans = _interopRequireDefault(require("./nftfi/loans.cjs"));
var _index = _interopRequireDefault(require("./nftfi/loans/fixed/index.cjs"));
var _index2 = _interopRequireDefault(require("./nftfi/loans/fixed/v1/index.cjs"));
var _index3 = _interopRequireDefault(require("./nftfi/loans/fixed/v2/index.cjs"));
var _index4 = _interopRequireDefault(require("./nftfi/loans/fixed/v2_1/index.cjs"));
var _bundles = _interopRequireDefault(require("./nftfi/bundles.cjs"));
var _helper2 = _interopRequireDefault(require("./nftfi/bundles/helper.cjs"));
var _index5 = _interopRequireDefault(require("./nftfi/loans/fixed/collection/index.cjs"));
var _immutables = _interopRequireDefault(require("./nftfi/immutables.cjs"));
var _index6 = _interopRequireDefault(require("./nftfi/loans/fixed/collection/v2/index.cjs"));
var _erc = _interopRequireDefault(require("./nftfi/erc20.cjs"));
var _erc2 = _interopRequireDefault(require("./nftfi/erc721.cjs"));
var _erc3 = _interopRequireDefault(require("./nftfi/nft/erc1155.cjs"));
var _cryptoPunks = _interopRequireDefault(require("./nftfi/nft/cryptoPunks.cjs"));
var _nft = _interopRequireDefault(require("./nftfi/nft.cjs"));
var _eoa = _interopRequireDefault(require("./nftfi/account/eoa.cjs"));
var _multisig = _interopRequireDefault(require("./nftfi/account/multisig.cjs"));
var _gnosis = _interopRequireDefault(require("./nftfi/account/multisig/gnosis.cjs"));
var _owner = _interopRequireDefault(require("./nftfi/account/multisig/gnosis/owner.cjs"));
var _factory = _interopRequireDefault(require("./nftfi/contract/factory.cjs"));
var _contract = _interopRequireDefault(require("./nftfi/contract.cjs"));
var _helper3 = _interopRequireDefault(require("./nftfi/shared/helper.cjs"));
var _result = _interopRequireDefault(require("./nftfi/result.cjs"));
var _error = _interopRequireDefault(require("./nftfi/error.cjs"));
var _index7 = _interopRequireDefault(require("./nftfi/index.cjs"));
var _storage = _interopRequireDefault(require("./nftfi/storage.cjs"));
var _safeEthersAdapters = require("@safe-global/safe-ethers-adapters");
var _safeCoreSdk = _interopRequireDefault(require("@safe-global/safe-core-sdk"));
var _safeEthersLib = _interopRequireDefault(require("@safe-global/safe-ethers-lib"));
var _bn = _interopRequireDefault(require("bn.js"));
var _ethers = require("ethers");
var _web = _interopRequireDefault(require("web3"));
var _axios = _interopRequireDefault(require("axios"));
var _lodash = _interopRequireDefault(require("lodash.merge"));
var _lodash2 = _interopRequireDefault(require("lodash.set"));
var _socket = _interopRequireDefault(require("socket.io-client"));
var _index8 = _interopRequireDefault(require("./nftfi/rewards/og/index.cjs"));
var _index9 = _interopRequireDefault(require("./nftfi/rewards/earn/index.cjs"));
var _index10 = _interopRequireDefault(require("./nftfi/rewards/og/allocations/index.cjs"));
var _index11 = _interopRequireDefault(require("./nftfi/rewards/earn/allocations/index.cjs"));
var _index12 = _interopRequireDefault(require("./nftfi/rewards/earn/points/index.cjs"));
var _rewards = _interopRequireDefault(require("./nftfi/rewards.cjs"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  init: function () {
    var _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _options$config, _options$config$api, _options$config2, _options$config2$api, _options$ethereum, _options$ethereum$acc, _options$ethereum$acc2, _options$ethereum$acc3, _options$ethereum$acc4, _options$ethereum$acc5, _options$ethereum2, _options$ethereum2$ac, _options$ethereum2$ac2, _options$ethereum2$ac3, _options$ethereum2$ac4, _options$ethereum3, _options$ethereum3$ac, _options$ethereum4, _options$ethereum4$ac, _options$ethereum5, _options$ethereum5$we, _options$ethereum6, _options$ethereum6$pr, _window, _options$dependencies, _options$ethereum7, _options$ethereum7$we, _options$ethereum8, _options$ethereum8$we, _options$ethereum9, _options$ethereum9$pr, _options$ethereum10, _options$ethereum10$a, _options$ethereum10$a2, _options$dependencies4, _options$dependencies5, _options$dependencies6, _options$dependencies7, _options$logging;
      var options,
        _options$api,
        hasApiKey,
        hasGnosisSafePks,
        hasGnosisSafeAddress,
        hasAccountPk,
        hasAccountAddress,
        hasWeb3Provider,
        hasProviderUrl,
        localStorage,
        ethers,
        provider,
        network,
        config,
        account,
        signer,
        _options$ethereum11,
        _options$ethereum11$a,
        _options$ethereum11$a2,
        _gnosisOptions$safe,
        _gnosisOptions$safe2,
        _gnosisOptions$safe3,
        _options$dependencies2,
        gnosisOptions,
        privateKeys,
        service,
        ethAdapter,
        safeAddress,
        safe,
        safeSigner,
        owners,
        gnosis,
        multisig,
        _options$ethereum12,
        _options$ethereum12$a,
        _options$ethereum13,
        _options$ethereum13$a,
        _options$dependencies3,
        pk,
        address,
        eoa,
        websocket,
        http,
        contractFactory,
        utils,
        storage,
        auth,
        api,
        error,
        result,
        helper,
        listings,
        loanFixedV1,
        loanFixedV2,
        loanFixedV2_1,
        loanFixedCollectionV2,
        loanFixedCollection,
        loanFixed,
        loans,
        offersSignatures,
        erc20,
        offersHelper,
        offersValidator,
        offersRequests,
        offers,
        erc721,
        erc1155,
        cryptoPunks,
        immutables,
        bundlesHelper,
        bundles,
        events,
        allocationsOg,
        rewardsOg,
        allocationsEarn,
        pointsEarn,
        rewardsEarn,
        rewards,
        nft,
        nftfi,
        _args = arguments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            // backwards compatibility: options.api.key to be assigned to options.config.api.key
            if (!(options !== null && options !== void 0 && (_options$config = options.config) !== null && _options$config !== void 0 && (_options$config$api = _options$config.api) !== null && _options$config$api !== void 0 && _options$config$api.key)) {
              (0, _lodash2["default"])(options, 'config.api.key', options === null || options === void 0 ? void 0 : (_options$api = options.api) === null || _options$api === void 0 ? void 0 : _options$api.key);
            }
            hasApiKey = options === null || options === void 0 ? void 0 : (_options$config2 = options.config) === null || _options$config2 === void 0 ? void 0 : (_options$config2$api = _options$config2.api) === null || _options$config2$api === void 0 ? void 0 : _options$config2$api.key;
            hasGnosisSafePks = options === null || options === void 0 ? void 0 : (_options$ethereum = options.ethereum) === null || _options$ethereum === void 0 ? void 0 : (_options$ethereum$acc = _options$ethereum.account) === null || _options$ethereum$acc === void 0 ? void 0 : (_options$ethereum$acc2 = _options$ethereum$acc.multisig) === null || _options$ethereum$acc2 === void 0 ? void 0 : (_options$ethereum$acc3 = _options$ethereum$acc2.gnosis) === null || _options$ethereum$acc3 === void 0 ? void 0 : (_options$ethereum$acc4 = _options$ethereum$acc3.safe) === null || _options$ethereum$acc4 === void 0 ? void 0 : (_options$ethereum$acc5 = _options$ethereum$acc4.owners) === null || _options$ethereum$acc5 === void 0 ? void 0 : _options$ethereum$acc5.privateKeys;
            hasGnosisSafeAddress = options === null || options === void 0 ? void 0 : (_options$ethereum2 = options.ethereum) === null || _options$ethereum2 === void 0 ? void 0 : (_options$ethereum2$ac = _options$ethereum2.account) === null || _options$ethereum2$ac === void 0 ? void 0 : (_options$ethereum2$ac2 = _options$ethereum2$ac.multisig) === null || _options$ethereum2$ac2 === void 0 ? void 0 : (_options$ethereum2$ac3 = _options$ethereum2$ac2.gnosis) === null || _options$ethereum2$ac3 === void 0 ? void 0 : (_options$ethereum2$ac4 = _options$ethereum2$ac3.safe) === null || _options$ethereum2$ac4 === void 0 ? void 0 : _options$ethereum2$ac4.address;
            hasAccountPk = options === null || options === void 0 ? void 0 : (_options$ethereum3 = options.ethereum) === null || _options$ethereum3 === void 0 ? void 0 : (_options$ethereum3$ac = _options$ethereum3.account) === null || _options$ethereum3$ac === void 0 ? void 0 : _options$ethereum3$ac.privateKey;
            hasAccountAddress = options === null || options === void 0 ? void 0 : (_options$ethereum4 = options.ethereum) === null || _options$ethereum4 === void 0 ? void 0 : (_options$ethereum4$ac = _options$ethereum4.account) === null || _options$ethereum4$ac === void 0 ? void 0 : _options$ethereum4$ac.address;
            hasWeb3Provider = options === null || options === void 0 ? void 0 : (_options$ethereum5 = options.ethereum) === null || _options$ethereum5 === void 0 ? void 0 : (_options$ethereum5$we = _options$ethereum5.web3) === null || _options$ethereum5$we === void 0 ? void 0 : _options$ethereum5$we.provider;
            hasProviderUrl = options === null || options === void 0 ? void 0 : (_options$ethereum6 = options.ethereum) === null || _options$ethereum6 === void 0 ? void 0 : (_options$ethereum6$pr = _options$ethereum6.provider) === null || _options$ethereum6$pr === void 0 ? void 0 : _options$ethereum6$pr.url;
            localStorage = typeof window !== 'undefined' && typeof ((_window = window) === null || _window === void 0 ? void 0 : _window.localStorage) !== 'undefined' ? window.localStorage : null;
            if (!(!hasWeb3Provider && !hasProviderUrl)) {
              _context.next = 12;
              break;
            }
            throw 'Please provide a value for the ethereum.provider.url field in the options parameter.';
          case 12:
            if (!(!hasWeb3Provider && !hasGnosisSafePks && !hasAccountPk)) {
              _context.next = 14;
              break;
            }
            throw 'Please provide a value for the ethereum.account.privateKey field in the options parameter.';
          case 14:
            if (hasApiKey) {
              _context.next = 16;
              break;
            }
            throw 'Please provide a value for the api.key field in the options parameter.';
          case 16:
            if (!(!hasGnosisSafeAddress && !hasAccountPk && !hasAccountAddress)) {
              _context.next = 18;
              break;
            }
            throw 'Please provide a value for the ethereum.account.address field in the options parameter.';
          case 18:
            if (!(hasGnosisSafePks && (hasWeb3Provider || hasAccountPk) || hasWeb3Provider && (hasGnosisSafePks || hasAccountPk) || hasAccountPk && (hasGnosisSafePks || hasWeb3Provider))) {
              _context.next = 20;
              break;
            }
            throw 'Please supply values for either account.privateKey, account.web3.provider, or account.multisig.';
          case 20:
            ethers = (options === null || options === void 0 ? void 0 : (_options$dependencies = options.dependencies) === null || _options$dependencies === void 0 ? void 0 : _options$dependencies.ethers) || _ethers.ethers;
            provider = options !== null && options !== void 0 && (_options$ethereum7 = options.ethereum) !== null && _options$ethereum7 !== void 0 && (_options$ethereum7$we = _options$ethereum7.web3) !== null && _options$ethereum7$we !== void 0 && _options$ethereum7$we.provider ? new _ethers.ethers.providers.Web3Provider(options === null || options === void 0 ? void 0 : (_options$ethereum8 = options.ethereum) === null || _options$ethereum8 === void 0 ? void 0 : (_options$ethereum8$we = _options$ethereum8.web3) === null || _options$ethereum8$we === void 0 ? void 0 : _options$ethereum8$we.provider) : new _ethers.ethers.providers.getDefaultProvider(options === null || options === void 0 ? void 0 : (_options$ethereum9 = options.ethereum) === null || _options$ethereum9 === void 0 ? void 0 : (_options$ethereum9$pr = _options$ethereum9.provider) === null || _options$ethereum9$pr === void 0 ? void 0 : _options$ethereum9$pr.url);
            _context.next = 24;
            return provider.getNetwork();
          case 24:
            network = _context.sent;
            config = new _config["default"]({
              merge: _lodash["default"],
              chainId: network === null || network === void 0 ? void 0 : network.chainId,
              config: _objectSpread({}, options.config)
            }); // Create an account, which is either an EOA or Multisig (Gnosis)
            if (!((_options$ethereum10 = options.ethereum) !== null && _options$ethereum10 !== void 0 && (_options$ethereum10$a = _options$ethereum10.account) !== null && _options$ethereum10$a !== void 0 && (_options$ethereum10$a2 = _options$ethereum10$a.multisig) !== null && _options$ethereum10$a2 !== void 0 && _options$ethereum10$a2.gnosis)) {
              _context.next = 43;
              break;
            }
            gnosisOptions = (_options$ethereum11 = options.ethereum) === null || _options$ethereum11 === void 0 ? void 0 : (_options$ethereum11$a = _options$ethereum11.account) === null || _options$ethereum11$a === void 0 ? void 0 : (_options$ethereum11$a2 = _options$ethereum11$a.multisig) === null || _options$ethereum11$a2 === void 0 ? void 0 : _options$ethereum11$a2.gnosis;
            privateKeys = gnosisOptions === null || gnosisOptions === void 0 ? void 0 : (_gnosisOptions$safe = gnosisOptions.safe) === null || _gnosisOptions$safe === void 0 ? void 0 : _gnosisOptions$safe.owners.privateKeys;
            service = new _safeEthersAdapters.SafeService(config.ethereum.account.multisig.gnosis.service.url);
            signer = new _ethers.ethers.Wallet(privateKeys[0], provider);
            ethAdapter = new _safeEthersLib["default"]["default"]({
              ethers: _ethers.ethers,
              signerOrProvider: signer
            });
            safeAddress = gnosisOptions === null || gnosisOptions === void 0 ? void 0 : (_gnosisOptions$safe2 = gnosisOptions.safe) === null || _gnosisOptions$safe2 === void 0 ? void 0 : _gnosisOptions$safe2.address;
            _context.next = 35;
            return _safeCoreSdk["default"]["default"].create({
              ethAdapter: ethAdapter,
              safeAddress: safeAddress
            });
          case 35:
            safe = _context.sent;
            safeSigner = new _safeEthersAdapters.SafeEthersSigner(safe, service, provider);
            owners = privateKeys.map(function (privateKey) {
              return new _owner["default"]({
                multisig: {
                  safe: {
                    address: safeAddress
                  }
                },
                config: config,
                ethers: ethers,
                privateKey: privateKey,
                provider: provider,
                EthersAdapter: _safeEthersLib["default"],
                Safe: _safeCoreSdk["default"]
              });
            });
            gnosis = new _gnosis["default"]({
              address: gnosisOptions === null || gnosisOptions === void 0 ? void 0 : (_gnosisOptions$safe3 = gnosisOptions.safe) === null || _gnosisOptions$safe3 === void 0 ? void 0 : _gnosisOptions$safe3.address,
              owners: owners,
              signer: safeSigner,
              provider: provider,
              ethers: ethers
            });
            multisig = new _multisig["default"]({
              multisig: gnosis
            });
            account = new _account["default"]({
              account: (options === null || options === void 0 ? void 0 : (_options$dependencies2 = options.dependencies) === null || _options$dependencies2 === void 0 ? void 0 : _options$dependencies2.account) || multisig
            });
            _context.next = 55;
            break;
          case 43:
            pk = options === null || options === void 0 ? void 0 : (_options$ethereum12 = options.ethereum) === null || _options$ethereum12 === void 0 ? void 0 : (_options$ethereum12$a = _options$ethereum12.account) === null || _options$ethereum12$a === void 0 ? void 0 : _options$ethereum12$a.privateKey;
            address = (options === null || options === void 0 ? void 0 : (_options$ethereum13 = options.ethereum) === null || _options$ethereum13 === void 0 ? void 0 : (_options$ethereum13$a = _options$ethereum13.account) === null || _options$ethereum13$a === void 0 ? void 0 : _options$ethereum13$a.address) || _ethers.ethers.utils.computeAddress(pk);
            if (pk) {
              _context.next = 51;
              break;
            }
            _context.next = 48;
            return provider.getSigner(address);
          case 48:
            _context.t0 = _context.sent;
            _context.next = 52;
            break;
          case 51:
            _context.t0 = new _ethers.ethers.Wallet(pk, provider);
          case 52:
            signer = _context.t0;
            eoa = new _eoa["default"]({
              address: address,
              signer: signer,
              provider: provider
            });
            account = new _account["default"]({
              account: (options === null || options === void 0 ? void 0 : (_options$dependencies3 = options.dependencies) === null || _options$dependencies3 === void 0 ? void 0 : _options$dependencies3.account) || eoa
            });
          case 55:
            websocket = new _websocket["default"]({
              config: config,
              io: _socket["default"]
            });
            http = new _http["default"]({
              axios: _axios["default"]
            });
            contractFactory = (options === null || options === void 0 ? void 0 : (_options$dependencies4 = options.dependencies) === null || _options$dependencies4 === void 0 ? void 0 : _options$dependencies4.contractFactory) || new _factory["default"]({
              signer: signer,
              ethers: ethers,
              account: account,
              Contract: _contract["default"]
            });
            utils = (options === null || options === void 0 ? void 0 : (_options$dependencies5 = options.dependencies) === null || _options$dependencies5 === void 0 ? void 0 : _options$dependencies5.utils) || new _utils["default"]({
              ethers: ethers,
              BN: _bn["default"],
              Date: Date,
              Math: Math,
              Number: Number,
              web3: _web["default"],
              contractFactory: contractFactory,
              config: config
            });
            storage = (options === null || options === void 0 ? void 0 : (_options$dependencies6 = options.dependencies) === null || _options$dependencies6 === void 0 ? void 0 : _options$dependencies6.storage) || new _storage["default"]({
              storage: localStorage,
              config: config
            });
            auth = new _auth["default"]({
              http: http,
              account: account,
              config: config,
              utils: utils,
              storage: storage
            });
            api = (options === null || options === void 0 ? void 0 : (_options$dependencies7 = options.dependencies) === null || _options$dependencies7 === void 0 ? void 0 : _options$dependencies7.api) || new _api["default"]({
              config: config,
              auth: auth,
              http: http
            });
            error = new _error["default"]();
            result = new _result["default"]();
            helper = new _helper3["default"]({
              config: config
            });
            listings = new _listings["default"]({
              api: api,
              config: config,
              helper: helper
            });
            loanFixedV1 = new _index2["default"]({
              config: config,
              contractFactory: contractFactory
            });
            loanFixedV2 = new _index3["default"]({
              config: config,
              contractFactory: contractFactory
            });
            loanFixedV2_1 = new _index4["default"]({
              config: config,
              contractFactory: contractFactory
            });
            loanFixedCollectionV2 = new _index6["default"]({
              config: config,
              contractFactory: contractFactory
            });
            loanFixedCollection = new _index5["default"]({
              v2: loanFixedCollectionV2
            });
            loanFixed = new _index["default"]({
              v1: loanFixedV1,
              v2: loanFixedV2,
              v2_1: loanFixedV2_1,
              collection: loanFixedCollection
            });
            loans = new _loans["default"]({
              api: api,
              account: account,
              fixed: loanFixed,
              config: config,
              helper: helper
            });
            offersSignatures = new _signatures["default"]({
              account: account,
              ethers: ethers,
              config: config
            });
            erc20 = new _erc["default"]({
              config: config,
              utils: utils,
              account: account,
              contractFactory: contractFactory,
              BN: _bn["default"]
            });
            offersHelper = new _helper["default"]({
              BN: _bn["default"],
              Number: Number,
              utils: utils,
              offersSignatures: offersSignatures,
              config: config,
              account: account
            });
            offersValidator = new _validation["default"]({
              erc20: erc20,
              ethers: ethers,
              config: config,
              contractFactory: contractFactory
            });
            offersRequests = new _requests["default"]({
              api: api,
              account: account,
              config: config,
              result: result,
              error: error
            });
            offers = new _offers["default"]({
              api: api,
              account: account,
              offersHelper: offersHelper,
              offersValidator: offersValidator,
              offersRequests: offersRequests,
              loans: loans,
              config: config,
              result: result,
              error: error,
              helper: helper
            });
            erc721 = new _erc2["default"]({
              config: config,
              contractFactory: contractFactory,
              account: account
            });
            erc1155 = new _erc3["default"]({
              config: config,
              contractFactory: contractFactory,
              account: account
            });
            cryptoPunks = new _cryptoPunks["default"]({
              config: config,
              utils: utils,
              error: error,
              result: result,
              contractFactory: contractFactory
            });
            immutables = new _immutables["default"]({
              config: config,
              account: account,
              error: error,
              result: result,
              contractFactory: contractFactory
            });
            bundlesHelper = new _helper2["default"]({
              config: config,
              contractFactory: contractFactory,
              ethers: ethers
            });
            bundles = new _bundles["default"]({
              config: config,
              account: account,
              error: error,
              result: result,
              helper: bundlesHelper,
              contractFactory: contractFactory
            });
            events = new _events["default"]({
              websocket: websocket
            });
            allocationsOg = new _index10["default"]({
              account: account,
              api: api,
              result: result,
              error: error
            });
            rewardsOg = new _index8["default"]({
              allocations: allocationsOg
            });
            allocationsEarn = new _index11["default"]({
              account: account,
              api: api,
              result: result,
              error: error
            });
            pointsEarn = new _index12["default"]({
              api: api,
              result: result,
              error: error
            });
            rewardsEarn = new _index9["default"]({
              allocations: allocationsEarn,
              points: pointsEarn
            });
            rewards = new _rewards["default"]({
              og: rewardsOg,
              earn: rewardsEarn
            });
            nft = new _nft["default"]({
              config: config,
              result: result,
              nft: {
                erc1155: erc1155,
                cryptoPunks: cryptoPunks,
                erc721: erc721
              },
              ethers: _ethers.ethers,
              account: account,
              contractFactory: contractFactory,
              error: error,
              utils: utils
            });
            nftfi = new _index7["default"]({
              config: config,
              account: account,
              listings: listings,
              offers: offers,
              loans: loans,
              erc20: erc20,
              erc721: erc721,
              bundles: bundles,
              immutables: immutables,
              events: events,
              rewards: rewards,
              nft: nft,
              utils: utils
            });
            if ((options === null || options === void 0 ? void 0 : (_options$logging = options.logging) === null || _options$logging === void 0 ? void 0 : _options$logging.verbose) === true) {
              console.log('NFTfi SDK initialised.');
            }
            return _context.abrupt("return", nftfi);
          case 96:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function init() {
      return _init.apply(this, arguments);
    }
    return init;
  }()
};
exports["default"] = _default;