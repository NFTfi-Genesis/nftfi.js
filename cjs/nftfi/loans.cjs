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
    _classPrivateFieldInitSpec(this, _error, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _api, options === null || options === void 0 ? void 0 : options.api);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _fixed, options === null || options === void 0 ? void 0 : options.fixed);
    (0, _classPrivateFieldSet2["default"])(this, _helper, options === null || options === void 0 ? void 0 : options.helper);
    (0, _classPrivateFieldSet2["default"])(this, _assertion, options === null || options === void 0 ? void 0 : options.assertion);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
  }

  /**
   * Gets loans in which your account is a participant.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.filters.counterparty - Loans where the counterparty is: `lender` or `borrower`
   * @param {string} options.filters.status - Loan status: `escrow`, `defaulted`, `repaid` or `liquidated`
   * @returns {Array<object>} Array of listing objects
   *
   * @example
   * // Get loans in `escrow` where your account is the `lender`
   * const loans = await nftfi.loans.get({
   *   filters: {
   *     counterparty: 'lender',
   *     status: 'escrow'
   *   }
   * });
   */
  (0, _createClass2["default"])(Loans, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var response, loans;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasAddress();
              _context.next = 4;
              return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                uri: 'v0.1/loans',
                params: {
                  accountAddress: (0, _classPrivateFieldGet2["default"])(this, _account).getAddress(),
                  counterparty: options.filters.counterparty,
                  status: options.filters.status
                }
              });
            case 4:
              response = _context.sent;
              loans = response['results'];
              loans = loans.map((0, _classPrivateFieldGet2["default"])(this, _helper).addCurrencyUnit);
              return _context.abrupt("return", loans);
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t0));
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 10]]);
      }));
      function get(_x) {
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
      function repay(_x4) {
        return _repay.apply(this, arguments);
      }
      return repay;
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
      var _revokeOffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(options) {
        var success;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              success = false;
              _context5.t0 = options.nftfi.contract.name;
              _context5.next = _context5.t0 === 'v1.loan.fixed' ? 6 : _context5.t0 === 'v2.loan.fixed' ? 10 : _context5.t0 === 'v2-1.loan.fixed' ? 14 : _context5.t0 === 'v2-3.loan.fixed' ? 18 : _context5.t0 === 'v2.loan.fixed.collection' ? 22 : _context5.t0 === 'v2-3.loan.fixed.collection' ? 26 : 30;
              break;
            case 6:
              _context5.next = 8;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v1.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 8:
              success = _context5.sent;
              return _context5.abrupt("break", 30);
            case 10:
              _context5.next = 12;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 12:
              success = _context5.sent;
              return _context5.abrupt("break", 30);
            case 14:
              _context5.next = 16;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_1.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 16:
              success = _context5.sent;
              return _context5.abrupt("break", 30);
            case 18:
              _context5.next = 20;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2_3.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 20:
              success = _context5.sent;
              return _context5.abrupt("break", 30);
            case 22:
              _context5.next = 24;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 24:
              success = _context5.sent;
              return _context5.abrupt("break", 30);
            case 26:
              _context5.next = 28;
              return (0, _classPrivateFieldGet2["default"])(this, _fixed).collection.v2_3.cancelLoanCommitmentBeforeLoanHasBegun({
                offer: {
                  nonce: options.offer.nonce
                }
              });
            case 28:
              success = _context5.sent;
              return _context5.abrupt("break", 30);
            case 30:
              return _context5.abrupt("return", {
                success: success
              });
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
      function revokeOffer(_x5) {
        return _revokeOffer.apply(this, arguments);
      }
      return revokeOffer;
    }()
  }]);
  return Loans;
}();
var _default = Loans;
exports["default"] = _default;