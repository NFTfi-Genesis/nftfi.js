"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _api = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
var _loanCoordinator = /*#__PURE__*/new WeakMap();
var _fixed = /*#__PURE__*/new WeakMap();
var _assetOffer = /*#__PURE__*/new WeakMap();
var _collectionOffer = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var _helper = /*#__PURE__*/new WeakMap();
var _contractFactory = /*#__PURE__*/new WeakMap();
var _ethers = /*#__PURE__*/new WeakMap();
var _assertion = /*#__PURE__*/new WeakMap();
var _validation = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
/**
 * @class
 * Class for working with loans.
 */
var Loans = /*#__PURE__*/function () {
  function Loans() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Loans);
    _classPrivateFieldInitSpec(this, _api, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _loanCoordinator, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _fixed, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _assetOffer, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _collectionOffer, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _helper, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _contractFactory, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _assertion, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _validation, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _error, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    (0, _classPrivateFieldSet2["default"])(this, _api, options === null || options === void 0 ? void 0 : options.api);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _fixed, options === null || options === void 0 ? void 0 : options.fixed);
    (0, _classPrivateFieldSet2["default"])(this, _assetOffer, options === null || options === void 0 ? void 0 : options.assetOffer);
    (0, _classPrivateFieldSet2["default"])(this, _collectionOffer, options === null || options === void 0 ? void 0 : options.collectionOffer);
    (0, _classPrivateFieldSet2["default"])(this, _helper, options === null || options === void 0 ? void 0 : options.helper);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
    (0, _classPrivateFieldSet2["default"])(this, _validation, options === null || options === void 0 ? void 0 : options.validation);
    (0, _classPrivateFieldSet2["default"])(this, _assertion, options === null || options === void 0 ? void 0 : options.assertion);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
  }
  (0, _createClass2["default"])(Loans, [{
    key: "_loanCoordinator",
    get: function get() {
      if (!(0, _classPrivateFieldGet2["default"])(this, _loanCoordinator)) {
        (0, _classPrivateFieldSet2["default"])(this, _loanCoordinator, (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
          address: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.coordinator.address,
          abi: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.coordinator.abi
        }));
      }
      return (0, _classPrivateFieldGet2["default"])(this, _loanCoordinator);
    }
  }, {
    key: "_getLoanData",
    value: function () {
      var _getLoanData2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var loanData, offerType, loanContractAddress;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._loanCoordinator.call({
                "function": 'getLoanDataAndOfferType',
                args: [options.loan.id]
              });
            case 2:
              loanData = _context.sent;
              offerType = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.parseBytes32String(loanData[1]);
              loanContractAddress = loanData[0][0];
              return _context.abrupt("return", {
                offerType: offerType,
                loanContractAddress: loanContractAddress
              });
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function _getLoanData(_x) {
        return _getLoanData2.apply(this, arguments);
      }
      return _getLoanData;
    }()
    /**
     * Gets loans by specific filters.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {object} options.filters - Hashmap of filter options for this method
     * @param {string} options.filters.status - Loan status: `active`, `defaulted`, `repaid` or `liquidated`
     * @param {string} [options.filters.borrower.address] - Address of the borrower
     * @param {string} [options.filters.lender.address] - Address of the lender
     * @param {string} [options.filters.nft.addresses] - Array of NFT addresses being used as collateral
     * @param {object} [options.sort] - Hashmap of config sorting options for this method
     * @param {string} [options.sort.by] - Field to sort by `repayment`, `interest`, `apr`, `duration`, `dueDate`, `nftName`
     * @param {string} [options.sort.direction] - Sort direction: `asc` or `desc`
     * @param {object} [options.pagination] - Hashmap of pagination options for this method
     * @param {number} [options.pagination.page] - Page number
     * @param {number} [options.pagination.limit] - Number of results per page
     * @returns {Array<object>} Array of listing objects
     *
     * @example
     * // Get `active` loans where your account is the `lender`
     * const { data: { results } } = await nftfi.loans.get({
     *   filters: {
     *     lender: {
     *       address: nftfi.account.getAddress()
     *     },
     *     status: 'active'
     *   }
     * });
     *
     * @example
     * // Get `defaulted` loans that your account is either `lender` or `borrower`
     * const { data: { results } } = await nftfi.loans.get({
     *   filters: {
     *     lender: {
     *       address: nftfi.account.getAddress()
     *     },
     *     borrower: {
     *       address: nftfi.account.getAddress()
     *     },
     *     status: 'defaulted'
     *   },
     *   pagination: {
     *    page: 1,
     *    limit: 10
     *   }
     * });
     *
     * @example
     * // Get `repaid` loans that used one of the specified `nft addresses`
     * const { data: { results } } = await nftfi.loans.get({
     *   filters: {
     *     nft: {
     *       addresses: ['0x0', '0x1']
     *     },
     *     status: 'repaid'
     *   },
     *  sort: {
     *    by: 'repayment',
     *    direction: 'desc'
     *  },
     * });
     */
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var options,
          response,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              _context2.prev = 1;
              _context2.next = 4;
              return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                uri: 'v0.2/loans',
                params: (0, _classPrivateFieldGet2["default"])(this, _helper).getParams(options)
              });
            case 4:
              response = _context2.sent;
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(response));
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context2.t0));
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[1, 8]]);
      }));
      function get() {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * Begin a loan. Called by the borrower when accepting a lender's offer.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {object} options.type - Type of the offer `v3.asset` or v3.collection`
     * @param {string} options.offer.nft.address - Address of the NFT being used as collateral
     * @param {string} [options.offer.nft.id] - ID of NFT being used as collateral
     * @param {number} [options.offer.nft.ids.from] - "from" ID of NFT id range of the offer (only when accepting a ranged offer)
     * @param {number} [options.offer.nft.ids.to] - "to" ID of NFT id range of the offer (only when accepting a ranged offer)
     * @param {string} options.offer.terms.loan.currency - Address of the ERC20 contract being used as principal/interest
     * @param {number} options.offer.terms.loan.principal - Sum of money transferred from lender to borrower at the beginning of the loan
     * @param {number} options.offer.terms.loan.repayment - Maximum amount of money that the borrower would be required to retrieve their collateral
     * @param {number} options.offer.terms.loan.origination - Sum of money transferred to the lender at the beginning of the loan
     * @param {number} options.offer.terms.loan.duration - Amount of time (measured in seconds) that may elapse before the lender can liquidate the loan
     * @param {number} options.offer.terms.loan.expiry.seconds - Timestamp (in seconds) of when the signature expires
     * @param {string} [options.borrower.address] - The address of the borrower (owner of nft)
     * @param {string} options.offer.lender.address - Address of the lender that signed the offer
     * @param {string} options.offer.lender.nonce - Nonce used by the lender when they signed the offer
     * @param {number} [options.offer.nftfi.fee.bps] - Percent (measured in basis points) of the interest earned that will be taken as a fee by the contract admins when the loan is repaid
     * @param {string} [options.offer.nftfi.contract.name] - Name of contract used to facilitate the loan: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
     * @param {string} options.offer.signature - ECDSA signature of the lender
     * @returns {object} Response object
     *
     * @example
     * // Begin a loan on v3 offer
     * const result = await nftfi.loans.begin({
     *   type: 'v3.asset',
     *   nft: { address: '0x22222222', id: '2' },
     *   borrower: { address: '0x11111111' },
     *   lender: { address: '0x22222222' },
     *   terms: {
     *     principal: '1000000000000000000',
     *     repayment: '1100000000000000000',
     *     origination: '100000000000000000',
     *     interest: { prorated: true },
     *     duration: 31536000,
     *     currency: '0x00000000',
     *     expiry: { seconds: 1722260287 }
     *   },
     *   signature: "0x000000000"
     * });
     */
  }, {
    key: "begin",
    value: function () {
      var _begin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var _options$offer, _options$offer$nftfi, _options$offer$nftfi$, _options$offer2, errors, response, contractName, offerType, success, _success, _success2, _success3;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              contractName = options === null || options === void 0 ? void 0 : (_options$offer = options.offer) === null || _options$offer === void 0 ? void 0 : (_options$offer$nftfi = _options$offer.nftfi) === null || _options$offer$nftfi === void 0 ? void 0 : (_options$offer$nftfi$ = _options$offer$nftfi.contract) === null || _options$offer$nftfi$ === void 0 ? void 0 : _options$offer$nftfi$.name;
              offerType = options === null || options === void 0 ? void 0 : (_options$offer2 = options.offer) === null || _options$offer2 === void 0 ? void 0 : _options$offer2.type;
              if (!offerType) {
                _context3.next = 23;
                break;
              }
              _context3.t0 = offerType;
              _context3.next = _context3.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.asset.name ? 8 : _context3.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.collection.name ? 13 : 18;
              break;
            case 8:
              _context3.next = 10;
              return (0, _classPrivateFieldGet2["default"])(this, _assetOffer).v1.acceptOffer(options);
            case 10:
              success = _context3.sent;
              response = {
                success: success
              };
              return _context3.abrupt("break", 21);
            case 13:
              _context3.next = 15;
              return (0, _classPrivateFieldGet2["default"])(this, _collectionOffer).v1.acceptOffer(options);
            case 15:
              _success = _context3.sent;
              response = {
                success: _success
              };
              return _context3.abrupt("break", 21);
            case 18:
              errors = {
                'type': ["".concat(offerType, " not supported")]
              };
              response = {
                errors: errors
              };
              return _context3.abrupt("break", 21);
            case 21:
              _context3.next = 39;
              break;
            case 23:
              _context3.t1 = contractName;
              _context3.next = _context3.t1 === 'v2-3.loan.fixed' ? 26 : _context3.t1 === 'v2-3.loan.fixed.collection' ? 31 : 36;
              break;
            case 26:
              _context3.next = 28;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.acceptOffer(options);
            case 28:
              _success2 = _context3.sent;
              response = {
                success: _success2
              };
              return _context3.abrupt("break", 39);
            case 31:
              _context3.next = 33;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.acceptOffer(options);
            case 33:
              _success3 = _context3.sent;
              response = {
                success: _success3
              };
              return _context3.abrupt("break", 39);
            case 36:
              errors = {
                'nftfi.contract.name': ["".concat(contractName, " not supported")]
              };
              response = {
                errors: errors
              };
              return _context3.abrupt("break", 39);
            case 39:
              return _context3.abrupt("return", response);
            case 42:
              _context3.prev = 42;
              _context3.t2 = _context3["catch"](0);
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context3.t2));
            case 45:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 42]]);
      }));
      function begin(_x2) {
        return _begin.apply(this, arguments);
      }
      return begin;
    }()
    /**
     * Liquidate `defaulted` loans in which your account is a participant.
     * Can be called once a loan has finished its duration and the borrower still has not repaid.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {string} options.loan.id - The ID of the loan being liquidated
     * @param {string} [options.nftfi.contract.name] - Name of contract used to facilitate the liquidation: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
     * @returns {object} Response object
     *
     * @example
     * // Liquidate a v3 loan
     * const result = await nftfi.loans.liquidate({
     *   loan: { id: 1 },
     * });
     *
     * @example
     * // Liquidate a v2 loan
     * const result = await nftfi.loans.liquidate({
     *   loan: { id: 2 },
     *   nftfi: {
     *     contract: {
     *       name: 'v2-3.loan.fixed'
     *     }
     *   }
     * });
     */
  }, {
    key: "liquidate",
    value: function () {
      var _liquidate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var _options$nftfi, _options$nftfi$contra, success, contractName, _yield$this$_getLoanD, offerType, loanContractAddress;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              success = false;
              contractName = options === null || options === void 0 ? void 0 : (_options$nftfi = options.nftfi) === null || _options$nftfi === void 0 ? void 0 : (_options$nftfi$contra = _options$nftfi.contract) === null || _options$nftfi$contra === void 0 ? void 0 : _options$nftfi$contra.name;
              if (!(!contractName || contractName.includes('v3'))) {
                _context4.next = 23;
                break;
              }
              _context4.next = 7;
              return this._getLoanData(options);
            case 7:
              _yield$this$_getLoanD = _context4.sent;
              offerType = _yield$this$_getLoanD.offerType;
              loanContractAddress = _yield$this$_getLoanD.loanContractAddress;
              _context4.t0 = offerType;
              _context4.next = _context4.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.asset.value ? 13 : _context4.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.collection.value ? 17 : 21;
              break;
            case 13:
              _context4.next = 15;
              return (0, _classPrivateFieldGet2["default"])(this, _assetOffer).v1.liquidateOverdueLoan(_objectSpread(_objectSpread({}, options), {}, {
                loanContractAddress: loanContractAddress
              }));
            case 15:
              success = _context4.sent;
              return _context4.abrupt("break", 21);
            case 17:
              _context4.next = 19;
              return (0, _classPrivateFieldGet2["default"])(this, _collectionOffer).v1.liquidateOverdueLoan(_objectSpread(_objectSpread({}, options), {}, {
                loanContractAddress: loanContractAddress
              }));
            case 19:
              success = _context4.sent;
              return _context4.abrupt("break", 21);
            case 21:
              _context4.next = 50;
              break;
            case 23:
              _context4.t1 = contractName;
              _context4.next = _context4.t1 === 'v1.loan.fixed' ? 26 : _context4.t1 === 'v2.loan.fixed' ? 30 : _context4.t1 === 'v2.loan.fixed.collection' ? 34 : _context4.t1 === 'v2-3.loan.fixed.collection' ? 38 : _context4.t1 === 'v2-1.loan.fixed' ? 42 : _context4.t1 === 'v2-3.loan.fixed' ? 46 : 50;
              break;
            case 26:
              _context4.next = 28;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v1.liquidateOverdueLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 28:
              success = _context4.sent;
              return _context4.abrupt("break", 50);
            case 30:
              _context4.next = 32;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2.liquidateOverdueLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 32:
              success = _context4.sent;
              return _context4.abrupt("break", 50);
            case 34:
              _context4.next = 36;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2.liquidateOverdueLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 36:
              success = _context4.sent;
              return _context4.abrupt("break", 50);
            case 38:
              _context4.next = 40;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.liquidateOverdueLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 40:
              success = _context4.sent;
              return _context4.abrupt("break", 50);
            case 42:
              _context4.next = 44;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_1.liquidateOverdueLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 44:
              success = _context4.sent;
              return _context4.abrupt("break", 50);
            case 46:
              _context4.next = 48;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.liquidateOverdueLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 48:
              success = _context4.sent;
              return _context4.abrupt("break", 50);
            case 50:
              return _context4.abrupt("return", {
                success: success
              });
            case 53:
              _context4.prev = 53;
              _context4.t2 = _context4["catch"](0);
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context4.t2));
            case 56:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 53]]);
      }));
      function liquidate(_x3) {
        return _liquidate.apply(this, arguments);
      }
      return liquidate;
    }()
    /**
     * Repay a loan. Can be called at any time after the loan has begun and before loan expiry.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {string} options.loan.id - The ID of the loan being repaid
     * @param {string} [options.nftfi.contract.name] - Name of contract used to facilitate the repayment: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
     * @returns {object} Response object
     *
     * @example
     * // Repay a v3 loan
     * const result = await nftfi.loans.repay({
     *   loan: { id: 1 }
     * });
     *
     * @example
     * // Repay a v2 loan
     * const result = await nftfi.loans.repay({
     *   loan: { id: 2 },
     *   nftfi: {
     *     contract: {
     *       name: 'v2-3.loan.fixed.collection'
     *     }
     *   }
     * });
     */
  }, {
    key: "repay",
    value: function () {
      var _repay = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(options) {
        var _options$nftfi2, _options$nftfi2$contr, success, contractName, _yield$this$_getLoanD2, offerType, loanContractAddress;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              success = false;
              contractName = options === null || options === void 0 ? void 0 : (_options$nftfi2 = options.nftfi) === null || _options$nftfi2 === void 0 ? void 0 : (_options$nftfi2$contr = _options$nftfi2.contract) === null || _options$nftfi2$contr === void 0 ? void 0 : _options$nftfi2$contr.name;
              if (!(!contractName || contractName.includes('v3'))) {
                _context5.next = 23;
                break;
              }
              _context5.next = 7;
              return this._getLoanData(options);
            case 7:
              _yield$this$_getLoanD2 = _context5.sent;
              offerType = _yield$this$_getLoanD2.offerType;
              loanContractAddress = _yield$this$_getLoanD2.loanContractAddress;
              _context5.t0 = offerType;
              _context5.next = _context5.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.asset.value ? 13 : _context5.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.collection.value ? 17 : 21;
              break;
            case 13:
              _context5.next = 15;
              return (0, _classPrivateFieldGet2["default"])(this, _assetOffer).v1.payBackLoan(_objectSpread(_objectSpread({}, options), {}, {
                loanContractAddress: loanContractAddress
              }));
            case 15:
              success = _context5.sent;
              return _context5.abrupt("break", 21);
            case 17:
              _context5.next = 19;
              return (0, _classPrivateFieldGet2["default"])(this, _collectionOffer).v1.payBackLoan(_objectSpread(_objectSpread({}, options), {}, {
                loanContractAddress: loanContractAddress
              }));
            case 19:
              success = _context5.sent;
              return _context5.abrupt("break", 21);
            case 21:
              _context5.next = 50;
              break;
            case 23:
              _context5.t1 = contractName;
              _context5.next = _context5.t1 === 'v1.loan.fixed' ? 26 : _context5.t1 === 'v2.loan.fixed' ? 30 : _context5.t1 === 'v2-1.loan.fixed' ? 34 : _context5.t1 === 'v2-3.loan.fixed' ? 38 : _context5.t1 === 'v2.loan.fixed.collection' ? 42 : _context5.t1 === 'v2-3.loan.fixed.collection' ? 46 : 50;
              break;
            case 26:
              _context5.next = 28;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v1.payBackLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 28:
              success = _context5.sent;
              return _context5.abrupt("break", 50);
            case 30:
              _context5.next = 32;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2.payBackLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 32:
              success = _context5.sent;
              return _context5.abrupt("break", 50);
            case 34:
              _context5.next = 36;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_1.payBackLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 36:
              success = _context5.sent;
              return _context5.abrupt("break", 50);
            case 38:
              _context5.next = 40;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.payBackLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 40:
              success = _context5.sent;
              return _context5.abrupt("break", 50);
            case 42:
              _context5.next = 44;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2.payBackLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 44:
              success = _context5.sent;
              return _context5.abrupt("break", 50);
            case 46:
              _context5.next = 48;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.payBackLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 48:
              success = _context5.sent;
              return _context5.abrupt("break", 50);
            case 50:
              return _context5.abrupt("return", {
                success: success
              });
            case 53:
              _context5.prev = 53;
              _context5.t2 = _context5["catch"](0);
              return _context5.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context5.t2));
            case 56:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 53]]);
      }));
      function repay(_x4) {
        return _repay.apply(this, arguments);
      }
      return repay;
    }()
    /**
     * Refinance a given loan.
     *
     * @param {Object} options - The options object containing the loan and offer information.
     * @param {Object} options.loan - The loan being refinanced.
     * @param {Object} options.offer - The offer being used to refinance the loan.
     * @returns {object} Response object
     *
     * @example
     * // Fetch active loans
     * const loans = await borrower.loans.get({
     *   filters: { status: 'active' }
     * });
     * const loan = loans.data.results[0];
     *
     * // Get a v3 offer
     * const offers = await borrower.offers.get({
     *   filters: {
     *     nft: { address: loan.nft.address },
     *     loan: { currency: { address: { eq: loan.terms.loan.currency } } },
     *     type: 'v3.collection'
     *   }
     * });
     * const offer = offers[0];
     *
     * // Mint Obligation Receipt
     * await nftfi.loans.mintObligationReceipt({ loan });
     *
     * // Allow the contract to manage your ORs
     * await borrower.nft.approve({
     *   token: { address: nftfi.config.protocol.v3.obligationReceipt.v1.address },
     *   nftfi: { contract: { name: 'v3.refinance.v1' } }
     * });
     *
     * // If the refinancing proceed is negative, also allow the contract to manage your ERC20 to pay the proceed
     * await borrower.erc20.approveMax({
     *   token: { address: borrower.config.erc20.weth.address },
     *   nftfi: { contract: { name: 'v3.refinance.v1' } }
     * });
     *
     * // Refinance
     * const result = await borrower.loans.refinance({
     *   loan,
     *   offer: {
     *     ...offer,
     *     nft: { ...offer.nft, id: NFT_ID }
     *   }
     * });
     */
  }, {
    key: "refinance",
    value: function () {
      var _refinance = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(options) {
        var _options$offer3, _options$offer3$nftfi, _options$offer3$nftfi2, error, response, contractName, success, _success4, _success5, _success6, _success7, _success8;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              _context6.next = 4;
              return (0, _classPrivateFieldGet2["default"])(this, _validation).refinance.validateCurrencies(options);
            case 4:
              contractName = options === null || options === void 0 ? void 0 : (_options$offer3 = options.offer) === null || _options$offer3 === void 0 ? void 0 : (_options$offer3$nftfi = _options$offer3.nftfi) === null || _options$offer3$nftfi === void 0 ? void 0 : (_options$offer3$nftfi2 = _options$offer3$nftfi.contract) === null || _options$offer3$nftfi2 === void 0 ? void 0 : _options$offer3$nftfi2.name;
              if (contractName) {
                _context6.next = 23;
                break;
              }
              _context6.t0 = options.offer.type;
              _context6.next = _context6.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.asset.name ? 9 : _context6.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.collection.name ? 14 : 19;
              break;
            case 9:
              _context6.next = 11;
              return (0, _classPrivateFieldGet2["default"])(this, _assetOffer).v1.refinanceLoan({
                loan: options.loan,
                offer: options.offer
              });
            case 11:
              success = _context6.sent;
              response = {
                success: success
              };
              return _context6.abrupt("break", 21);
            case 14:
              _context6.next = 16;
              return (0, _classPrivateFieldGet2["default"])(this, _collectionOffer).v1.refinanceCollectionOfferLoan({
                loan: options.loan,
                offer: options.offer
              });
            case 16:
              _success4 = _context6.sent;
              response = {
                success: _success4
              };
              return _context6.abrupt("break", 21);
            case 19:
              error = {
                'type': ["".concat(options.offer.type, " not supported")]
              };
              throw error;
            case 21:
              _context6.next = 48;
              break;
            case 23:
              _context6.t1 = contractName;
              _context6.next = _context6.t1 === 'v2-1.loan.fixed' ? 26 : _context6.t1 === 'v2-3.loan.fixed' ? 31 : _context6.t1 === 'v2.loan.fixed.collection' ? 36 : _context6.t1 === 'v2-3.loan.fixed.collection' ? 41 : 46;
              break;
            case 26:
              _context6.next = 28;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_1.refinanceLoan({
                loan: options.loan,
                offer: options.offer
              });
            case 28:
              _success5 = _context6.sent;
              response = {
                success: _success5
              };
              return _context6.abrupt("break", 48);
            case 31:
              _context6.next = 33;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.refinanceLoan({
                loan: options.loan,
                offer: options.offer
              });
            case 33:
              _success6 = _context6.sent;
              response = {
                success: _success6
              };
              return _context6.abrupt("break", 48);
            case 36:
              _context6.next = 38;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2.refinanceCollectionOfferLoan({
                loan: options.loan,
                offer: options.offer
              });
            case 38:
              _success7 = _context6.sent;
              response = {
                success: _success7
              };
              return _context6.abrupt("break", 48);
            case 41:
              _context6.next = 43;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.refinanceCollectionOfferLoan({
                loan: options.loan,
                offer: options.offer
              });
            case 43:
              _success8 = _context6.sent;
              response = {
                success: _success8
              };
              return _context6.abrupt("break", 48);
            case 46:
              error = {
                'nftfi.contract.name': ["".concat(contractName, " not supported")]
              };
              throw error;
            case 48:
              return _context6.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(response));
            case 51:
              _context6.prev = 51;
              _context6.t2 = _context6["catch"](0);
              return _context6.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context6.t2));
            case 54:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[0, 51]]);
      }));
      function refinance(_x5) {
        return _refinance.apply(this, arguments);
      }
      return refinance;
    }()
    /**
     * Revokes an active offer made by your account.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {object} options.offer.nonce - The nonce of the offer to be deleted
     * @param {string} [options.offer.type] - Type of the offer `v3.asset` or v3.collection`
     * @param {string} [options.nftfi.contract.name] - Name of contract which the offer was created for: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
     * @returns {object} Response object
     *
     * @example
     * // Revoke a v3 offer
     * const revoked = await nftfi.loans.revoke({
     *   offer: {
     *     nonce: '1',
     *     type: 'v3.asset'
     *   }
     * });
     *
     * @example
     * // Revoke a v2 offer
     * const revoked = await nftfi.loans.revoke({
     *   offer: {
     *     nonce: '2'
     *   },
     *   nftfi: {
     *     contract: {
     *       name: 'v2-3.loan.fixed'
     *     }
     *   }
     * });
     */
  }, {
    key: "revokeOffer",
    value: function () {
      var _revokeOffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(options) {
        var _options$offer4, success, offerType, type, result;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              success = false;
              offerType = options === null || options === void 0 ? void 0 : (_options$offer4 = options.offer) === null || _options$offer4 === void 0 ? void 0 : _options$offer4.type;
              if (!offerType) {
                _context7.next = 24;
                break;
              }
              _context7.t0 = offerType;
              _context7.next = _context7.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.asset.name ? 8 : _context7.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.collection.name ? 10 : 12;
              break;
            case 8:
              type = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.asset.value;
              return _context7.abrupt("break", 12);
            case 10:
              type = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.collection.value;
              return _context7.abrupt("break", 12);
            case 12:
              _context7.prev = 12;
              _context7.next = 15;
              return this._loanCoordinator.call({
                "function": 'cancelLoanCommitment',
                args: [(0, _classPrivateFieldGet2["default"])(this, _ethers).utils.formatBytes32String(type), options.offer.nonce]
              });
            case 15:
              result = _context7.sent;
              success = (result === null || result === void 0 ? void 0 : result.status) === 1;
              _context7.next = 22;
              break;
            case 19:
              _context7.prev = 19;
              _context7.t1 = _context7["catch"](12);
              success = false;
            case 22:
              _context7.next = 51;
              break;
            case 24:
              _context7.t2 = options.nftfi.contract.name;
              _context7.next = _context7.t2 === 'v1.loan.fixed' ? 27 : _context7.t2 === 'v2.loan.fixed' ? 31 : _context7.t2 === 'v2-1.loan.fixed' ? 35 : _context7.t2 === 'v2-3.loan.fixed' ? 39 : _context7.t2 === 'v2.loan.fixed.collection' ? 43 : _context7.t2 === 'v2-3.loan.fixed.collection' ? 47 : 51;
              break;
            case 27:
              _context7.next = 29;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v1.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 29:
              success = _context7.sent;
              return _context7.abrupt("break", 51);
            case 31:
              _context7.next = 33;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 33:
              success = _context7.sent;
              return _context7.abrupt("break", 51);
            case 35:
              _context7.next = 37;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_1.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 37:
              success = _context7.sent;
              return _context7.abrupt("break", 51);
            case 39:
              _context7.next = 41;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 41:
              success = _context7.sent;
              return _context7.abrupt("break", 51);
            case 43:
              _context7.next = 45;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 45:
              success = _context7.sent;
              return _context7.abrupt("break", 51);
            case 47:
              _context7.next = 49;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 49:
              success = _context7.sent;
              return _context7.abrupt("break", 51);
            case 51:
              return _context7.abrupt("return", {
                success: success
              });
            case 54:
              _context7.prev = 54;
              _context7.t3 = _context7["catch"](0);
              return _context7.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context7.t3));
            case 57:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[0, 54], [12, 19]]);
      }));
      function revokeOffer(_x6) {
        return _revokeOffer.apply(this, arguments);
      }
      return revokeOffer;
    }()
    /**
     * Mints an obligation receipt for a given loan.
     *
     * @param {Object} options - The options object containing the loan details and contract information.
     * @param {number} options.loan.nftfi.id - The ID of the loan.
     * @param {string} [options.loan.nftfi.contract.name] - Name of contract used to facilitate the loan: `v2-1.loan.fixed`, `v2-3.loan.fixed`, `v2.loan.fixed.collection`, `v2-3.loan.fixed.collection`
     * @returns {object} Response object
     *
     * @example
     * // Mint an Obligation Receipt for a v3 loan
     * const response = await nftfi.loans.mintObligationReceipt({
     *   loan: { id: '1' }
     * });
     *
     * @example
     * // Mint an Obligation Receipt for a v2 loan
     * const response = await nftfi.loans.mintObligationReceipt({
     *   loan: {
     *     id: '2',
     *     nftfi: {
     *       contract: {
     *         name: 'v2-3.loan.fixed'
     *       }
     *     }
     *   },
     * });
     */
  }, {
    key: "mintObligationReceipt",
    value: function () {
      var _mintObligationReceipt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(options) {
        var _options$loan, _options$loan$nftfi, _options$loan$nftfi$c, error, response, contractName, _yield$this$_getLoanD3, offerType, loanContractAddress, success, _success9, _success10, _success11, _success12, _success13;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              contractName = options === null || options === void 0 ? void 0 : (_options$loan = options.loan) === null || _options$loan === void 0 ? void 0 : (_options$loan$nftfi = _options$loan.nftfi) === null || _options$loan$nftfi === void 0 ? void 0 : (_options$loan$nftfi$c = _options$loan$nftfi.contract) === null || _options$loan$nftfi$c === void 0 ? void 0 : _options$loan$nftfi$c.name;
              if (!(!contractName || contractName.includes('v3'))) {
                _context8.next = 26;
                break;
              }
              _context8.next = 6;
              return this._getLoanData(options);
            case 6:
              _yield$this$_getLoanD3 = _context8.sent;
              offerType = _yield$this$_getLoanD3.offerType;
              loanContractAddress = _yield$this$_getLoanD3.loanContractAddress;
              _context8.t0 = offerType;
              _context8.next = _context8.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.asset.value ? 12 : _context8.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.collection.value ? 17 : 22;
              break;
            case 12:
              _context8.next = 14;
              return (0, _classPrivateFieldGet2["default"])(this, _assetOffer).v1.mintObligationReceipt(_objectSpread(_objectSpread({}, options), {}, {
                loanContractAddress: loanContractAddress
              }));
            case 14:
              success = _context8.sent;
              response = {
                success: success
              };
              return _context8.abrupt("break", 24);
            case 17:
              _context8.next = 19;
              return (0, _classPrivateFieldGet2["default"])(this, _collectionOffer).v1.mintObligationReceipt(_objectSpread(_objectSpread({}, options), {}, {
                loanContractAddress: loanContractAddress
              }));
            case 19:
              _success9 = _context8.sent;
              response = {
                success: _success9
              };
              return _context8.abrupt("break", 24);
            case 22:
              error = {
                'type': ["".concat(offerType, " not supported")]
              };
              throw error;
            case 24:
              _context8.next = 51;
              break;
            case 26:
              _context8.t1 = contractName;
              _context8.next = _context8.t1 === 'v2-3.loan.fixed' ? 29 : _context8.t1 === 'v2-1.loan.fixed' ? 34 : _context8.t1 === 'v2-3.loan.fixed.collection' ? 39 : _context8.t1 === 'v2.loan.fixed.collection' ? 44 : 49;
              break;
            case 29:
              _context8.next = 31;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.mintObligationReceipt(options);
            case 31:
              _success10 = _context8.sent;
              response = {
                success: _success10
              };
              return _context8.abrupt("break", 51);
            case 34:
              _context8.next = 36;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_1.mintObligationReceipt(options);
            case 36:
              _success11 = _context8.sent;
              response = {
                success: _success11
              };
              return _context8.abrupt("break", 51);
            case 39:
              _context8.next = 41;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.mintObligationReceipt(options);
            case 41:
              _success12 = _context8.sent;
              response = {
                success: _success12
              };
              return _context8.abrupt("break", 51);
            case 44:
              _context8.next = 46;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2.mintObligationReceipt(options);
            case 46:
              _success13 = _context8.sent;
              response = {
                success: _success13
              };
              return _context8.abrupt("break", 51);
            case 49:
              error = {
                'nftfi.contract.name': ["".concat(contractName, " not supported")]
              };
              throw error;
            case 51:
              return _context8.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(response));
            case 54:
              _context8.prev = 54;
              _context8.t2 = _context8["catch"](0);
              return _context8.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context8.t2));
            case 57:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this, [[0, 54]]);
      }));
      function mintObligationReceipt(_x7) {
        return _mintObligationReceipt.apply(this, arguments);
      }
      return mintObligationReceipt;
    }()
    /**
     * Mints an promissory note for a given loan.
     *
     * @param {Object} options - The options object containing the loan details and contract information.
     * @param {number} options.loan.nftfi.id - The ID of the loan.
     * @returns {object} Response object
     *
     * @example
     * // Mint an Promissory Note for a v3 loan
     * const response = await nftfi.loans.mintObligationReceipt({
     *   loan: { id: '1' }
     * });
     */
  }, {
    key: "mintPromissoryNote",
    value: function () {
      var _mintPromissoryNote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(options) {
        var error, response, _yield$this$_getLoanD4, offerType, loanContractAddress, success, _success14;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              _context9.next = 4;
              return this._getLoanData(options);
            case 4:
              _yield$this$_getLoanD4 = _context9.sent;
              offerType = _yield$this$_getLoanD4.offerType;
              loanContractAddress = _yield$this$_getLoanD4.loanContractAddress;
              _context9.t0 = offerType;
              _context9.next = _context9.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.asset.value ? 10 : _context9.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.collection.value ? 15 : 20;
              break;
            case 10:
              _context9.next = 12;
              return (0, _classPrivateFieldGet2["default"])(this, _assetOffer).v1.mintPromissoryNote(_objectSpread(_objectSpread({}, options), {}, {
                loanContractAddress: loanContractAddress
              }));
            case 12:
              success = _context9.sent;
              response = {
                success: success
              };
              return _context9.abrupt("break", 22);
            case 15:
              _context9.next = 17;
              return (0, _classPrivateFieldGet2["default"])(this, _collectionOffer).v1.mintPromissoryNote(_objectSpread(_objectSpread({}, options), {}, {
                loanContractAddress: loanContractAddress
              }));
            case 17:
              _success14 = _context9.sent;
              response = {
                success: _success14
              };
              return _context9.abrupt("break", 22);
            case 20:
              error = {
                'type': ["".concat(offerType, " not supported")]
              };
              throw error;
            case 22:
              return _context9.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(response));
            case 25:
              _context9.prev = 25;
              _context9.t1 = _context9["catch"](0);
              return _context9.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context9.t1));
            case 28:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[0, 25]]);
      }));
      function mintPromissoryNote(_x8) {
        return _mintPromissoryNote.apply(this, arguments);
      }
      return mintPromissoryNote;
    }()
  }]);
  return Loans;
}();
var _default = Loans;
exports["default"] = _default;