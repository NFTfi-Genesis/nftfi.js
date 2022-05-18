"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

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

var _auth = _interopRequireDefault(require("./nftfi/auth.cjs"));

var _api = _interopRequireDefault(require("./nftfi/api.cjs"));

var _listings = _interopRequireDefault(require("./nftfi/listings.cjs"));

var _offers = _interopRequireDefault(require("./nftfi/offers.cjs"));

var _signatures = _interopRequireDefault(require("./nftfi/offers/signatures.cjs"));

var _helper = _interopRequireDefault(require("./nftfi/offers/helper.cjs"));

var _loans = _interopRequireDefault(require("./nftfi/loans.cjs"));

var _index = _interopRequireDefault(require("./nftfi/loans/fixed/index.cjs"));

var _index2 = _interopRequireDefault(require("./nftfi/loans/fixed/v1/index.cjs"));

var _index3 = _interopRequireDefault(require("./nftfi/loans/fixed/v2/index.cjs"));

var _erc = _interopRequireDefault(require("./nftfi/erc20.cjs"));

var _index4 = _interopRequireDefault(require("./nftfi/index.cjs"));

var _bn = _interopRequireDefault(require("bn.js"));

var ethersjs = _interopRequireWildcard(require("ethers"));

var _web = _interopRequireDefault(require("web3"));

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = {
  init: function () {
    var _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _options$ethereum, _options$ethereum$web, _options$ethereum2, _options$ethereum2$pr, _options$ethereum3, _options$ethereum3$we, _options$ethereum4, _options$ethereum4$ac, _options$ethereum5, _options$ethereum5$we, _options$ethereum6, _options$ethereum6$ac, _options$api, _options$dependencies, _options$ethereum7, _options$ethereum7$we, _options$ethereum8, _options$ethereum8$we, _options$ethereum9, _options$ethereum9$pr, _options$ethereum10, _options$ethereum10$a, _options$ethereum11, _options$ethereum11$a, _options$dependencies2, _options$api2, _options$dependencies3;

      var options,
          ethers,
          provider,
          network,
          pk,
          address,
          signer,
          account,
          http,
          utils,
          config,
          auth,
          api,
          listings,
          offersSignatures,
          offersHelper,
          offers,
          loanFixedV1,
          loanFixedV2,
          loanFixed,
          loans,
          erc20,
          nftfi,
          _args = arguments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};

              if (!(!(options !== null && options !== void 0 && (_options$ethereum = options.ethereum) !== null && _options$ethereum !== void 0 && (_options$ethereum$web = _options$ethereum.web3) !== null && _options$ethereum$web !== void 0 && _options$ethereum$web.provider) && !(options !== null && options !== void 0 && (_options$ethereum2 = options.ethereum) !== null && _options$ethereum2 !== void 0 && (_options$ethereum2$pr = _options$ethereum2.provider) !== null && _options$ethereum2$pr !== void 0 && _options$ethereum2$pr.url))) {
                _context.next = 3;
                break;
              }

              throw 'Please provide a value for the ethereum.provider.url field in the options parameter.';

            case 3:
              if (!(options !== null && options !== void 0 && (_options$ethereum3 = options.ethereum) !== null && _options$ethereum3 !== void 0 && (_options$ethereum3$we = _options$ethereum3.web3) !== null && _options$ethereum3$we !== void 0 && _options$ethereum3$we.provider && !(options !== null && options !== void 0 && (_options$ethereum4 = options.ethereum) !== null && _options$ethereum4 !== void 0 && (_options$ethereum4$ac = _options$ethereum4.account) !== null && _options$ethereum4$ac !== void 0 && _options$ethereum4$ac.address))) {
                _context.next = 5;
                break;
              }

              throw 'Please provide a value for the ethereum.account.address field in the options parameter.';

            case 5:
              if (!(!(options !== null && options !== void 0 && (_options$ethereum5 = options.ethereum) !== null && _options$ethereum5 !== void 0 && (_options$ethereum5$we = _options$ethereum5.web3) !== null && _options$ethereum5$we !== void 0 && _options$ethereum5$we.provider) && !(options !== null && options !== void 0 && (_options$ethereum6 = options.ethereum) !== null && _options$ethereum6 !== void 0 && (_options$ethereum6$ac = _options$ethereum6.account) !== null && _options$ethereum6$ac !== void 0 && _options$ethereum6$ac.privateKey))) {
                _context.next = 7;
                break;
              }

              throw 'Please provide a value for the ethereum.account.privateKey field in the options parameter.';

            case 7:
              if (options !== null && options !== void 0 && (_options$api = options.api) !== null && _options$api !== void 0 && _options$api.key) {
                _context.next = 9;
                break;
              }

              throw 'Please provide a value for the api.key field in the options parameter.';

            case 9:
              ethers = (options === null || options === void 0 ? void 0 : (_options$dependencies = options.dependencies) === null || _options$dependencies === void 0 ? void 0 : _options$dependencies.ethers) || ethersjs;
              provider = options !== null && options !== void 0 && (_options$ethereum7 = options.ethereum) !== null && _options$ethereum7 !== void 0 && (_options$ethereum7$we = _options$ethereum7.web3) !== null && _options$ethereum7$we !== void 0 && _options$ethereum7$we.provider ? new ethersjs.providers.Web3Provider(options === null || options === void 0 ? void 0 : (_options$ethereum8 = options.ethereum) === null || _options$ethereum8 === void 0 ? void 0 : (_options$ethereum8$we = _options$ethereum8.web3) === null || _options$ethereum8$we === void 0 ? void 0 : _options$ethereum8$we.provider) : new ethersjs.providers.getDefaultProvider(options === null || options === void 0 ? void 0 : (_options$ethereum9 = options.ethereum) === null || _options$ethereum9 === void 0 ? void 0 : (_options$ethereum9$pr = _options$ethereum9.provider) === null || _options$ethereum9$pr === void 0 ? void 0 : _options$ethereum9$pr.url);
              _context.next = 13;
              return provider.getNetwork();

            case 13:
              network = _context.sent;
              pk = options === null || options === void 0 ? void 0 : (_options$ethereum10 = options.ethereum) === null || _options$ethereum10 === void 0 ? void 0 : (_options$ethereum10$a = _options$ethereum10.account) === null || _options$ethereum10$a === void 0 ? void 0 : _options$ethereum10$a.privateKey;
              address = (options === null || options === void 0 ? void 0 : (_options$ethereum11 = options.ethereum) === null || _options$ethereum11 === void 0 ? void 0 : (_options$ethereum11$a = _options$ethereum11.account) === null || _options$ethereum11$a === void 0 ? void 0 : _options$ethereum11$a.address) || ethersjs.utils.computeAddress(pk);

              if (pk) {
                _context.next = 22;
                break;
              }

              _context.next = 19;
              return provider.getSigner(address);

            case 19:
              _context.t0 = _context.sent;
              _context.next = 23;
              break;

            case 22:
              _context.t0 = new ethersjs.Wallet(pk, provider);

            case 23:
              signer = _context.t0;
              account = new _account["default"]({
                address: address,
                signer: signer
              });
              http = new _http["default"]({
                axios: _axios["default"]
              });
              utils = (options === null || options === void 0 ? void 0 : (_options$dependencies2 = options.dependencies) === null || _options$dependencies2 === void 0 ? void 0 : _options$dependencies2.utils) || new _utils["default"]({
                ethers: ethers,
                BN: _bn["default"],
                Date: Date,
                Math: Math,
                Number: Number,
                web3: _web["default"]
              });
              config = new _config["default"]({
                merge: _lodash["default"],
                chainId: network === null || network === void 0 ? void 0 : network.chainId,
                config: _objectSpread(_objectSpread({}, options === null || options === void 0 ? void 0 : options.config), {}, {
                  api: {
                    key: options === null || options === void 0 ? void 0 : (_options$api2 = options.api) === null || _options$api2 === void 0 ? void 0 : _options$api2.key
                  }
                })
              });
              auth = new _auth["default"]({
                http: http,
                account: account,
                config: config,
                utils: utils
              });
              api = (options === null || options === void 0 ? void 0 : (_options$dependencies3 = options.dependencies) === null || _options$dependencies3 === void 0 ? void 0 : _options$dependencies3.api) || new _api["default"]({
                config: config,
                auth: auth,
                http: http
              });
              listings = new _listings["default"]({
                api: api,
                config: config
              });
              offersSignatures = new _signatures["default"]({
                account: account,
                ethers: ethers,
                config: config
              });
              offersHelper = new _helper["default"]({
                BN: _bn["default"],
                Number: Number,
                utils: utils,
                ethers: ethers,
                offersSignatures: offersSignatures,
                config: config,
                account: account
              });
              offers = new _offers["default"]({
                api: api,
                account: account,
                offersHelper: offersHelper
              });
              loanFixedV1 = new _index2["default"]({
                account: account,
                ethers: ethers,
                config: config
              });
              loanFixedV2 = new _index3["default"]({
                account: account,
                ethers: ethers,
                config: config
              });
              loanFixed = new _index["default"]({
                v1: loanFixedV1,
                v2: loanFixedV2
              });
              loans = new _loans["default"]({
                api: api,
                account: account,
                fixed: loanFixed
              });
              erc20 = new _erc["default"]({
                config: config,
                ethers: ethers,
                account: account
              });
              nftfi = new _index4["default"]({
                config: config,
                account: account,
                listings: listings,
                offers: offers,
                loans: loans,
                erc20: erc20,
                utils: utils
              });

              if ((options === null || options === void 0 ? void 0 : options.verbose) === true) {
                console.log('NFTfi SDK initialised.');
              }

              return _context.abrupt("return", nftfi);

            case 42:
            case "end":
              return _context.stop();
          }
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