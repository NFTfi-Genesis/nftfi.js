"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _api = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
var _fixed = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var _helper = /*#__PURE__*/new WeakMap();
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
    _classPrivateFieldInitSpec(this, _fixed, {
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
    (0, _classPrivateFieldSet2["default"])(this, _helper, options === null || options === void 0 ? void 0 : options.helper);
    (0, _classPrivateFieldSet2["default"])(this, _validation, options === null || options === void 0 ? void 0 : options.validation);
    (0, _classPrivateFieldSet2["default"])(this, _assertion, options === null || options === void 0 ? void 0 : options.assertion);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
  }

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
  (0, _createClass2["default"])(Loans, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var options,
          response,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              _context.prev = 1;
              _context.next = 4;
              return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                uri: 'v0.2/loans',
                params: (0, _classPrivateFieldGet2["default"])(this, _helper).getParams(options)
              });
            case 4:
              response = _context.sent;
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(response));
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t0));
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[1, 8]]);
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
     * @param {string} options.offer.nft.address - Address of the NFT being used as collateral
     * @param {string} options.offer.nft.id - ID of NFT being used as collateral
     * @param {string} options.offer.terms.loan.currency - Address of the ERC20 contract being used as principal/interest
     * @param {number} options.offer.terms.loan.principal - Sum of money transferred from lender to borrower at the beginning of the loan
     * @param {number} options.offer.terms.loan.repayment - Maximum amount of money that the borrower would be required to retrieve their collateral
     * @param {number} options.offer.terms.loan.duration - Amount of time (measured in seconds) that may elapse before the lender can liquidate the loan
     * @param {number} options.offer.terms.loan.expiry - Timestamp (in seconds) of when the signature expires
     * @param {string} options.offer.lender.address - Address of the lender that signed the offer
     * @param {string} options.offer.lender.nonce - Nonce used by the lender when they signed the offer
     * @param {string} options.offer.signature - ECDSA signature of the lender
     * @param {number} options.offer.nftfi.fee.bps - Percent (measured in basis points) of the interest earned that will be taken as a fee by the contract admins when the loan is repaid
     * @param {string} options.offer.nftfi.contract.name - Name of contract used to facilitate the loan: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
     * @returns {object} Response object
     *
     * @example
     * // Begin a loan on a lender's offer.
     * const result = await nftfi.loans.begin({
     *   offer: {
     *     nft: {
     *       id: '42',
     *       address: '0x00000000',
     *     },
     *     lender: {
     *       address: '0x00000000',
     *       nonce: '314159265359'
     *     },
     *     terms: {
     *       loan: {
     *         principal: 1000000000000000000,
     *         repayment: 1100000000000000000,
     *         duration: 86400 * 7, // 7 days (in seconds)
     *         currency: "0x00000000",
     *         expiry: 1690548548 // Friday, 28 July 2023 14:49:08 GMT+02:00
     *       }
     *     },
     *     signature: '0x000000000000000000000000000000000000000000000000000',
     *     nftfi: {
     *       fee: { bps: 500 },
     *       contract: { name: 'v2-3.loan.fixed' }
     *     }
     *   }
     * });
     */
  }, {
    key: "begin",
    value: function () {
      var _begin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var errors, response, contractName, success, _success;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              contractName = options.offer.nftfi.contract.name;
              _context2.t0 = contractName;
              _context2.next = _context2.t0 === 'v2-3.loan.fixed' ? 6 : _context2.t0 === 'v2-3.loan.fixed.collection' ? 11 : 16;
              break;
            case 6:
              _context2.next = 8;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.acceptOffer(options);
            case 8:
              success = _context2.sent;
              response = {
                success: success
              };
              return _context2.abrupt("break", 19);
            case 11:
              _context2.next = 13;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.acceptOffer(options);
            case 13:
              _success = _context2.sent;
              response = {
                success: _success
              };
              return _context2.abrupt("break", 19);
            case 16:
              errors = {
                'nftfi.contract.name': ["".concat(contractName, " not supported")]
              };
              response = {
                errors: errors
              };
              return _context2.abrupt("break", 19);
            case 19:
              return _context2.abrupt("return", response);
            case 22:
              _context2.prev = 22;
              _context2.t1 = _context2["catch"](0);
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context2.t1));
            case 25:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 22]]);
      }));
      function begin(_x) {
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
     * @param {string} options.nftfi.contract.name - Name of contract used to facilitate the liquidation: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
     * @returns {object} Response object
     *
     * @example
     * // Liquidate a v2-3 fixed collection loan
     * const result = await nftfi.loans.liquidate({
     *   loan: { id: 3 },
     *   nftfi: {
     *     contract: {
     *       name: 'v2-3.loan.fixed.collection'
     *     }
     *   }
     * });
     *
     * @example
     * // Liquidate a v2.3 fixed loan
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
      var _liquidate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var success;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              success = false;
              _context3.t0 = options.nftfi.contract.name;
              _context3.next = _context3.t0 === 'v1.loan.fixed' ? 6 : _context3.t0 === 'v2.loan.fixed' ? 10 : _context3.t0 === 'v2.loan.fixed.collection' ? 14 : _context3.t0 === 'v2-3.loan.fixed.collection' ? 18 : _context3.t0 === 'v2-1.loan.fixed' ? 22 : _context3.t0 === 'v2-3.loan.fixed' ? 26 : 30;
              break;
            case 6:
              _context3.next = 8;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v1.liquidateOverdueLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 8:
              success = _context3.sent;
              return _context3.abrupt("break", 30);
            case 10:
              _context3.next = 12;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2.liquidateOverdueLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 12:
              success = _context3.sent;
              return _context3.abrupt("break", 30);
            case 14:
              _context3.next = 16;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2.liquidateOverdueLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 16:
              success = _context3.sent;
              return _context3.abrupt("break", 30);
            case 18:
              _context3.next = 20;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.liquidateOverdueLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 20:
              success = _context3.sent;
              return _context3.abrupt("break", 30);
            case 22:
              _context3.next = 24;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_1.liquidateOverdueLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 24:
              success = _context3.sent;
              return _context3.abrupt("break", 30);
            case 26:
              _context3.next = 28;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.liquidateOverdueLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 28:
              success = _context3.sent;
              return _context3.abrupt("break", 30);
            case 30:
              return _context3.abrupt("return", {
                success: success
              });
            case 33:
              _context3.prev = 33;
              _context3.t1 = _context3["catch"](0);
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context3.t1));
            case 36:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 33]]);
      }));
      function liquidate(_x2) {
        return _liquidate.apply(this, arguments);
      }
      return liquidate;
    }()
    /**
     * Repay a loan. Can be called at any time after the loan has begun and before loan expiry.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {string} options.loan.id - The ID of the loan being repaid
     * @param {string} options.nftfi.contract.name - Name of contract used to facilitate the repayment: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
     * @returns {object} Response object
     *
     * @example
     * // Repay a v2.3 fixed loan
     * const result = await nftfi.loans.repay({
     *   loan: { id: 2 },
     *   nftfi: {
     *     contract: {
     *       name: 'v2-3.loan.fixed'
     *     }
     *   }
     * });
     *
     * @example
     * // Repay a v2-3 fixed collection loan
     * const result = await nftfi.loans.repay({
     *   loan: { id: 3 },
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
      var _repay = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var success;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              success = false;
              _context4.t0 = options.nftfi.contract.name;
              _context4.next = _context4.t0 === 'v1.loan.fixed' ? 6 : _context4.t0 === 'v2.loan.fixed' ? 10 : _context4.t0 === 'v2-1.loan.fixed' ? 14 : _context4.t0 === 'v2-3.loan.fixed' ? 18 : _context4.t0 === 'v2.loan.fixed.collection' ? 22 : _context4.t0 === 'v2-3.loan.fixed.collection' ? 26 : 30;
              break;
            case 6:
              _context4.next = 8;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v1.payBackLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 8:
              success = _context4.sent;
              return _context4.abrupt("break", 30);
            case 10:
              _context4.next = 12;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2.payBackLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 12:
              success = _context4.sent;
              return _context4.abrupt("break", 30);
            case 14:
              _context4.next = 16;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_1.payBackLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 16:
              success = _context4.sent;
              return _context4.abrupt("break", 30);
            case 18:
              _context4.next = 20;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.payBackLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 20:
              success = _context4.sent;
              return _context4.abrupt("break", 30);
            case 22:
              _context4.next = 24;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2.payBackLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 24:
              success = _context4.sent;
              return _context4.abrupt("break", 30);
            case 26:
              _context4.next = 28;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.payBackLoan({
                loan: {
                  id: options.loan.id
                }
              });
            case 28:
              success = _context4.sent;
              return _context4.abrupt("break", 30);
            case 30:
              return _context4.abrupt("return", {
                success: success
              });
            case 33:
              _context4.prev = 33;
              _context4.t1 = _context4["catch"](0);
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context4.t1));
            case 36:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 33]]);
      }));
      function repay(_x3) {
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
     * // Identify an active loan where you are the borrower.
     * const { data: { results } } = await nftfi.loans.get({
     *  filters: {
     *   borrower: { address: nftfi.account.getAddress() },
     *   status: 'active'
     * });
     * const loan = results[0];
     *
     * // Fetch offers that match the currency and NFT of the selected loan.
     * // **The offer's currency must align with the loan's currency.**
     * const offers = await borrower.offers.get({
     *   filters: {
     *     nft: { address: loan.nft.address, id: loan.nft.id },
     *     loan: { currency: { address: { eq: loan.terms.loan.currency } } },
     *     nftfi: { contract: { name: nftfi.config.loan.fixed.v2_1.name } }
     *   }
     * });
     * const offer = offers[0];
     *
     * // Approve your obligation receipts with the Refinance contract.
     * const ORApproval = await nftfi.nft.approve({
     *  token: { address: nftfi.config.loan.fixed.v2_1.obligationReceipt.address },
     *  nftfi: { contract: { name: nftfi.config.loan.refinance.name } }
     * });
     *
     * // Approve ERC20 Tokens (if additional payment is needed).
     * const erc20Approval = await nftfi.erc20.approveMax({
     *  token: { address: loan.terms.loan.currency },
     *  nftfi: { contract: { name: nftfi.config.loan.refinance.name } }
     * });
     *
     * // Mint an obligation receipt for this loan.
     * const ORMint = await nftfi.loans.mintObligationReceipt({ loan });
     *
     * // Initiate the refinancing with the selected loan and offer.
     * const refiResult = await nftfi.loans.refinance({
     *   loan,
     *   offer
     * });
     */
  }, {
    key: "refinance",
    value: function () {
      var _refinance = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(options) {
        var error, response, contractName, success, _success2, _success3, _success4;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              _context5.next = 4;
              return (0, _classPrivateFieldGet2["default"])(this, _validation).refinance.validateCurrencies(options);
            case 4:
              contractName = options.offer.nftfi.contract.name;
              _context5.t0 = contractName;
              _context5.next = _context5.t0 === 'v2-1.loan.fixed' ? 8 : _context5.t0 === 'v2-3.loan.fixed' ? 13 : _context5.t0 === 'v2.loan.fixed.collection' ? 18 : _context5.t0 === 'v2-3.loan.fixed.collection' ? 23 : 28;
              break;
            case 8:
              _context5.next = 10;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_1.refinanceLoan({
                loan: options.loan,
                offer: options.offer
              });
            case 10:
              success = _context5.sent;
              response = {
                success: success
              };
              return _context5.abrupt("break", 30);
            case 13:
              _context5.next = 15;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.refinanceLoan({
                loan: options.loan,
                offer: options.offer
              });
            case 15:
              _success2 = _context5.sent;
              response = {
                success: _success2
              };
              return _context5.abrupt("break", 30);
            case 18:
              _context5.next = 20;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2.refinanceCollectionOfferLoan({
                loan: options.loan,
                offer: options.offer
              });
            case 20:
              _success3 = _context5.sent;
              response = {
                success: _success3
              };
              return _context5.abrupt("break", 30);
            case 23:
              _context5.next = 25;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.refinanceCollectionOfferLoan({
                loan: options.loan,
                offer: options.offer
              });
            case 25:
              _success4 = _context5.sent;
              response = {
                success: _success4
              };
              return _context5.abrupt("break", 30);
            case 28:
              error = {
                'nftfi.contract.name': ["".concat(contractName, " not supported")]
              };
              throw error;
            case 30:
              return _context5.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(response));
            case 33:
              _context5.prev = 33;
              _context5.t1 = _context5["catch"](0);
              return _context5.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context5.t1));
            case 36:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 33]]);
      }));
      function refinance(_x4) {
        return _refinance.apply(this, arguments);
      }
      return refinance;
    }()
    /**
     * Revokes an active offer made by your account.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {object} options.offer.nonce - The nonce of the offer to be deleted
     * @param {string} options.nftfi.contract.name - Name of contract which the offer was created for: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
     * @returns {object} Response object
     *
     * @example
     * // Revoke a v2.3 fixed loan offer
     * const revoked = await nftfi.loans.revoke({
     *   offer: {
     *     nonce: '42'
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
      var _revokeOffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(options) {
        var success;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              success = false;
              _context6.t0 = options.nftfi.contract.name;
              _context6.next = _context6.t0 === 'v1.loan.fixed' ? 6 : _context6.t0 === 'v2.loan.fixed' ? 10 : _context6.t0 === 'v2-1.loan.fixed' ? 14 : _context6.t0 === 'v2-3.loan.fixed' ? 18 : _context6.t0 === 'v2.loan.fixed.collection' ? 22 : _context6.t0 === 'v2-3.loan.fixed.collection' ? 26 : 30;
              break;
            case 6:
              _context6.next = 8;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v1.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 8:
              success = _context6.sent;
              return _context6.abrupt("break", 30);
            case 10:
              _context6.next = 12;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 12:
              success = _context6.sent;
              return _context6.abrupt("break", 30);
            case 14:
              _context6.next = 16;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_1.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 16:
              success = _context6.sent;
              return _context6.abrupt("break", 30);
            case 18:
              _context6.next = 20;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 20:
              success = _context6.sent;
              return _context6.abrupt("break", 30);
            case 22:
              _context6.next = 24;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 24:
              success = _context6.sent;
              return _context6.abrupt("break", 30);
            case 26:
              _context6.next = 28;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 28:
              success = _context6.sent;
              return _context6.abrupt("break", 30);
            case 30:
              return _context6.abrupt("return", {
                success: success
              });
            case 33:
              _context6.prev = 33;
              _context6.t1 = _context6["catch"](0);
              return _context6.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context6.t1));
            case 36:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[0, 33]]);
      }));
      function revokeOffer(_x5) {
        return _revokeOffer.apply(this, arguments);
      }
      return revokeOffer;
    }()
    /**
     * Mints an obligation receipt for a given loan.
     *
     * @param {Object} options - The options object containing the loan details and contract information.
     * @param {number} options.loan.nftfi.id - The ID of the loan.
     * @param {string} options.loan.nftfi.contract.name - Name of contract used to facilitate the loan: `v2-1.loan.fixed`, `v2-3.loan.fixed`, `v2.loan.fixed.collection`, `v2-3.loan.fixed.collection`
     * @returns {object} Response object
     *
     * @example
     * // Mint an Obligation Receipt for a v2.3 fixed loan
     * const response = await nftfi.loans.mintObligationReceipt({
     *   loan: {
     *     id: '42',
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
      var _mintObligationReceipt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(options) {
        var error, response, contractName, success, _success5, _success6, _success7;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              contractName = options.loan.nftfi.contract.name;
              _context7.t0 = contractName;
              _context7.next = _context7.t0 === 'v2-3.loan.fixed' ? 6 : _context7.t0 === 'v2-1.loan.fixed' ? 11 : _context7.t0 === 'v2-3.loan.fixed.collection' ? 16 : _context7.t0 === 'v2.loan.fixed.collection' ? 21 : 26;
              break;
            case 6:
              _context7.next = 8;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.mintObligationReceipt(options);
            case 8:
              success = _context7.sent;
              response = {
                success: success
              };
              return _context7.abrupt("break", 28);
            case 11:
              _context7.next = 13;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_1.mintObligationReceipt(options);
            case 13:
              _success5 = _context7.sent;
              response = {
                success: _success5
              };
              return _context7.abrupt("break", 28);
            case 16:
              _context7.next = 18;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.mintObligationReceipt(options);
            case 18:
              _success6 = _context7.sent;
              response = {
                success: _success6
              };
              return _context7.abrupt("break", 28);
            case 21:
              _context7.next = 23;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2.mintObligationReceipt(options);
            case 23:
              _success7 = _context7.sent;
              response = {
                success: _success7
              };
              return _context7.abrupt("break", 28);
            case 26:
              error = {
                'nftfi.contract.name': ["".concat(contractName, " not supported")]
              };
              throw error;
            case 28:
              return _context7.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(response));
            case 31:
              _context7.prev = 31;
              _context7.t1 = _context7["catch"](0);
              return _context7.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context7.t1));
            case 34:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[0, 31]]);
      }));
      function mintObligationReceipt(_x6) {
        return _mintObligationReceipt.apply(this, arguments);
      }
      return mintObligationReceipt;
    }()
  }]);
  return Loans;
}();
var _default = Loans;
exports["default"] = _default;