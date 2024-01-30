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
var _config = /*#__PURE__*/new WeakMap();
var _contractFactory = /*#__PURE__*/new WeakMap();
var _loanContract = /*#__PURE__*/new WeakMap();
var _refinanceContract = /*#__PURE__*/new WeakMap();
var LoansFixedCollectionV2_3 = /*#__PURE__*/function () {
  function LoansFixedCollectionV2_3(options) {
    (0, _classCallCheck2["default"])(this, LoansFixedCollectionV2_3);
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _contractFactory, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _loanContract, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _refinanceContract, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
  }
  (0, _createClass2["default"])(LoansFixedCollectionV2_3, [{
    key: "_loanContract",
    get: function get() {
      if (!(0, _classPrivateFieldGet2["default"])(this, _loanContract)) {
        (0, _classPrivateFieldSet2["default"])(this, _loanContract, (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
          address: (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2_3.address,
          abi: (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2_3.abi
        }));
      }
      return (0, _classPrivateFieldGet2["default"])(this, _loanContract);
    }
  }, {
    key: "_refinanceContract",
    get: function get() {
      if (!(0, _classPrivateFieldGet2["default"])(this, _refinanceContract)) {
        (0, _classPrivateFieldSet2["default"])(this, _refinanceContract, (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
          address: (0, _classPrivateFieldGet2["default"])(this, _config).loan.refinance.address,
          abi: (0, _classPrivateFieldGet2["default"])(this, _config).loan.refinance.abi
        }));
      }
      return (0, _classPrivateFieldGet2["default"])(this, _refinanceContract);
    }
  }, {
    key: "acceptOffer",
    value: function () {
      var _acceptOffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var success, offer, signature, borrowerSettings, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              offer = {
                loanERC20Denomination: options.offer.terms.loan.currency,
                loanPrincipalAmount: String(options.offer.terms.loan.principal),
                maximumRepaymentAmount: String(options.offer.terms.loan.repayment),
                nftCollateralContract: options.offer.nft.address,
                nftCollateralId: options.offer.nft.id,
                referrer: '0x0000000000000000000000000000000000000000',
                loanDuration: options.offer.terms.loan.duration,
                loanAdminFeeInBasisPoints: options.offer.nftfi.fee.bps
              };
              signature = {
                signer: options.offer.lender.address,
                nonce: options.offer.lender.nonce,
                expiry: options.offer.terms.loan.expiry,
                signature: options.offer.signature
              };
              borrowerSettings = {
                revenueSharePartner: '0x0000000000000000000000000000000000000000',
                referralFeeInBasisPoints: 0
              };
              _context.next = 6;
              return this._loanContract.call({
                "function": 'acceptCollectionOffer',
                args: [offer, signature, borrowerSettings]
              });
            case 6:
              result = _context.sent;
              success = (result === null || result === void 0 ? void 0 : result.status) === 1;
              _context.next = 13;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              success = false;
            case 13:
              return _context.abrupt("return", success);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 10]]);
      }));
      function acceptOffer(_x) {
        return _acceptOffer.apply(this, arguments);
      }
      return acceptOffer;
    }()
  }, {
    key: "liquidateOverdueLoan",
    value: function () {
      var _liquidateOverdueLoan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var success, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this._loanContract.call({
                "function": 'liquidateOverdueLoan',
                args: [options.loan.id]
              });
            case 3:
              result = _context2.sent;
              success = (result === null || result === void 0 ? void 0 : result.status) === 1;
              _context2.next = 10;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              success = false;
            case 10:
              return _context2.abrupt("return", success);
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 7]]);
      }));
      function liquidateOverdueLoan(_x2) {
        return _liquidateOverdueLoan.apply(this, arguments);
      }
      return liquidateOverdueLoan;
    }()
  }, {
    key: "payBackLoan",
    value: function () {
      var _payBackLoan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var success, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return this._loanContract.call({
                "function": 'payBackLoan',
                args: [options.loan.id]
              });
            case 3:
              result = _context3.sent;
              success = (result === null || result === void 0 ? void 0 : result.status) === 1 ? true : false;
              _context3.next = 10;
              break;
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              success = false;
            case 10:
              return _context3.abrupt("return", success);
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 7]]);
      }));
      function payBackLoan(_x3) {
        return _payBackLoan.apply(this, arguments);
      }
      return payBackLoan;
    }()
  }, {
    key: "cancelLoanCommitmentBeforeLoanHasBegun",
    value: function () {
      var _cancelLoanCommitmentBeforeLoanHasBegun = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var success, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return this._loanContract.call({
                "function": 'cancelLoanCommitmentBeforeLoanHasBegun',
                args: [options.offer.nonce]
              });
            case 3:
              result = _context4.sent;
              success = (result === null || result === void 0 ? void 0 : result.status) === 1;
              _context4.next = 10;
              break;
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              success = false;
            case 10:
              return _context4.abrupt("return", success);
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 7]]);
      }));
      function cancelLoanCommitmentBeforeLoanHasBegun(_x4) {
        return _cancelLoanCommitmentBeforeLoanHasBegun.apply(this, arguments);
      }
      return cancelLoanCommitmentBeforeLoanHasBegun;
    }()
  }, {
    key: "mintObligationReceipt",
    value: function () {
      var _mintObligationReceipt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(options) {
        var success, result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return this._loanContract.call({
                "function": 'mintObligationReceipt',
                args: [options.loan.id]
              });
            case 3:
              result = _context5.sent;
              success = (result === null || result === void 0 ? void 0 : result.status) === 1;
              _context5.next = 10;
              break;
            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              success = false;
            case 10:
              return _context5.abrupt("return", success);
            case 11:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 7]]);
      }));
      function mintObligationReceipt(_x5) {
        return _mintObligationReceipt.apply(this, arguments);
      }
      return mintObligationReceipt;
    }()
  }, {
    key: "refinanceCollectionOfferLoan",
    value: function () {
      var _refinanceCollectionOfferLoan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(options) {
        var success, refinanceableContract, refinancingData, offer, signature, borrowerSettings, result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              refinanceableContract = (0, _classPrivateFieldGet2["default"])(this, _config).getContractAddress(options.loan.nftfi.contract.name);
              refinancingData = {
                loanIdentifier: options.loan.id,
                refinanceableContract: refinanceableContract
              };
              offer = {
                loanERC20Denomination: options.offer.terms.loan.currency,
                loanPrincipalAmount: String(options.offer.terms.loan.principal),
                maximumRepaymentAmount: String(options.offer.terms.loan.repayment),
                nftCollateralContract: options.offer.nft.address,
                nftCollateralId: options.offer.nft.id,
                referrer: '0x0000000000000000000000000000000000000000',
                loanDuration: options.offer.terms.loan.duration,
                loanAdminFeeInBasisPoints: options.offer.nftfi.fee.bps
              };
              signature = {
                signer: options.offer.lender.address,
                nonce: options.offer.lender.nonce,
                expiry: options.offer.terms.loan.expiry,
                signature: options.offer.signature
              };
              borrowerSettings = {
                revenueSharePartner: '0x0000000000000000000000000000000000000000',
                referralFeeInBasisPoints: 0
              };
              _context6.next = 8;
              return this._refinanceContract.call({
                "function": 'refinanceCollectionOfferLoan',
                args: [refinancingData, offer, signature, borrowerSettings]
              });
            case 8:
              result = _context6.sent;
              success = result.status === 1;
              _context6.next = 15;
              break;
            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](0);
              success = false;
            case 15:
              return _context6.abrupt("return", success);
            case 16:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[0, 12]]);
      }));
      function refinanceCollectionOfferLoan(_x6) {
        return _refinanceCollectionOfferLoan.apply(this, arguments);
      }
      return refinanceCollectionOfferLoan;
    }()
  }]);
  return LoansFixedCollectionV2_3;
}();
var _default = LoansFixedCollectionV2_3;
exports["default"] = _default;