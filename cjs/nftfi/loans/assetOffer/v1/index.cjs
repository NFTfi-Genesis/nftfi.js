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
var _ethers = /*#__PURE__*/new WeakMap();
var _loanContract = /*#__PURE__*/new WeakMap();
var _loanCoordinator = /*#__PURE__*/new WeakMap();
var _refinanceContract = /*#__PURE__*/new WeakMap();
var LoansAssetOfferV1 = /*#__PURE__*/function () {
  function LoansAssetOfferV1(options) {
    (0, _classCallCheck2["default"])(this, LoansAssetOfferV1);
    _classPrivateFieldInitSpec(this, _config, {
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
    _classPrivateFieldInitSpec(this, _loanContract, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _loanCoordinator, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _refinanceContract, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
  }
  (0, _createClass2["default"])(LoansAssetOfferV1, [{
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
    key: "_refinanceContract",
    get: function get() {
      if (!(0, _classPrivateFieldGet2["default"])(this, _refinanceContract)) {
        (0, _classPrivateFieldSet2["default"])(this, _refinanceContract, (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
          address: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.refinance.v1.address,
          abi: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.refinance.v1.abi
        }));
      }
      return (0, _classPrivateFieldGet2["default"])(this, _refinanceContract);
    }
  }, {
    key: "_getLoanData",
    value: function () {
      var _getLoanData2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var loanData, loanContractAddress;
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
              loanContractAddress = loanData[0][0];
              return _context.abrupt("return", loanContractAddress);
            case 5:
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
  }, {
    key: "_getLatestLoanContract",
    value: function () {
      var _getLatestLoanContract2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(type) {
        var loanContractAddress;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if ((0, _classPrivateFieldGet2["default"])(this, _loanContract)) {
                _context2.next = 5;
                break;
              }
              _context2.next = 3;
              return this._loanCoordinator.call({
                "function": 'getDefaultLoanContractForOfferType',
                args: [(0, _classPrivateFieldGet2["default"])(this, _ethers).utils.formatBytes32String(type)]
              });
            case 3:
              loanContractAddress = _context2.sent;
              (0, _classPrivateFieldSet2["default"])(this, _loanContract, (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: loanContractAddress,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.assetOfferLoan.v1.abi
              }));
            case 5:
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _loanContract));
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _getLatestLoanContract(_x2) {
        return _getLatestLoanContract2.apply(this, arguments);
      }
      return _getLatestLoanContract;
    }()
  }, {
    key: "acceptOffer",
    value: function () {
      var _acceptOffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var offer, signature, loanContract, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              offer = {
                loanPrincipalAmount: String(options.offer.terms.loan.principal),
                maximumRepaymentAmount: String(options.offer.terms.loan.repayment),
                nftCollateralId: options.offer.nft.id,
                nftCollateralContract: options.offer.nft.address,
                loanDuration: options.offer.terms.loan.duration,
                loanERC20Denomination: options.offer.terms.loan.currency,
                isProRata: options.offer.terms.loan.interest.prorated,
                originationFee: String(options.offer.terms.loan.origination)
              };
              signature = {
                signer: options.offer.lender.address,
                nonce: options.offer.lender.nonce,
                expiry: options.offer.terms.loan.expiry,
                signature: options.offer.signature
              };
              _context3.next = 4;
              return this._getLatestLoanContract((0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.asset.value);
            case 4:
              loanContract = _context3.sent;
              _context3.next = 7;
              return loanContract.call({
                "function": 'acceptOffer',
                args: [offer, signature]
              });
            case 7:
              result = _context3.sent;
              return _context3.abrupt("return", (result === null || result === void 0 ? void 0 : result.status) === 1);
            case 9:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function acceptOffer(_x3) {
        return _acceptOffer.apply(this, arguments);
      }
      return acceptOffer;
    }()
  }, {
    key: "payBackLoan",
    value: function () {
      var _payBackLoan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var loanContract, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              loanContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.loanContractAddress,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.assetOfferLoan.v1.abi
              });
              _context4.next = 3;
              return loanContract.call({
                "function": 'payBackLoan',
                args: [options.loan.id]
              });
            case 3:
              result = _context4.sent;
              return _context4.abrupt("return", (result === null || result === void 0 ? void 0 : result.status) === 1);
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function payBackLoan(_x4) {
        return _payBackLoan.apply(this, arguments);
      }
      return payBackLoan;
    }()
  }, {
    key: "liquidateOverdueLoan",
    value: function () {
      var _liquidateOverdueLoan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(options) {
        var success, loanContract, result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              loanContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.loanContractAddress,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.assetOfferLoan.v1.abi
              });
              _context5.next = 4;
              return loanContract.call({
                "function": 'liquidateOverdueLoan',
                args: [options.loan.id]
              });
            case 4:
              result = _context5.sent;
              success = (result === null || result === void 0 ? void 0 : result.status) === 1;
              _context5.next = 11;
              break;
            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              success = false;
            case 11:
              return _context5.abrupt("return", success);
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 8]]);
      }));
      function liquidateOverdueLoan(_x5) {
        return _liquidateOverdueLoan.apply(this, arguments);
      }
      return liquidateOverdueLoan;
    }()
  }, {
    key: "refinanceLoan",
    value: function () {
      var _refinanceLoan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(options) {
        var loanContractName, loanContractAddress, refinancingData, offer, signature, extraData, result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              loanContractName = options.loan.nftfi.contract.name;
              _context6.t0 = loanContractName;
              _context6.next = _context6.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.assetOfferLoan.v1.name ? 4 : _context6.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.collectionOfferLoan.v1.name ? 4 : 8;
              break;
            case 4:
              _context6.next = 6;
              return this._getLoanData(options);
            case 6:
              loanContractAddress = _context6.sent;
              return _context6.abrupt("break", 9);
            case 8:
              loanContractAddress = (0, _classPrivateFieldGet2["default"])(this, _config).getContractAddress(options.loan.nftfi.contract.name);
            case 9:
              refinancingData = {
                loanIdentifier: options.loan.id,
                refinanceableContract: loanContractAddress
              };
              offer = {
                loanPrincipalAmount: String(options.offer.terms.loan.principal),
                maximumRepaymentAmount: String(options.offer.terms.loan.repayment),
                nftCollateralId: options.offer.nft.id,
                nftCollateralContract: options.offer.nft.address,
                loanDuration: options.offer.terms.loan.duration,
                loanERC20Denomination: options.offer.terms.loan.currency,
                isProRata: options.offer.terms.loan.interest.prorated,
                originationFee: String(options.offer.terms.loan.origination)
              };
              signature = {
                signer: options.offer.lender.address,
                nonce: options.offer.lender.nonce,
                expiry: options.offer.terms.loan.expiry,
                signature: options.offer.signature
              };
              extraData = (options === null || options === void 0 ? void 0 : options.extraData) || '0x';
              _context6.next = 15;
              return this._refinanceContract.call({
                "function": 'refinanceLoan',
                args: [refinancingData, offer, signature, extraData]
              });
            case 15:
              result = _context6.sent;
              return _context6.abrupt("return", result.status === 1);
            case 17:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function refinanceLoan(_x6) {
        return _refinanceLoan.apply(this, arguments);
      }
      return refinanceLoan;
    }()
  }, {
    key: "mintObligationReceipt",
    value: function () {
      var _mintObligationReceipt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(options) {
        var success, loanContract, result;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              loanContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.loanContractAddress,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.assetOfferLoan.v1.abi
              });
              _context7.next = 4;
              return loanContract.call({
                "function": 'mintObligationReceipt',
                args: [options.loan.id]
              });
            case 4:
              result = _context7.sent;
              success = (result === null || result === void 0 ? void 0 : result.status) === 1;
              _context7.next = 11;
              break;
            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](0);
              success = false;
            case 11:
              return _context7.abrupt("return", success);
            case 12:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[0, 8]]);
      }));
      function mintObligationReceipt(_x7) {
        return _mintObligationReceipt.apply(this, arguments);
      }
      return mintObligationReceipt;
    }()
  }, {
    key: "mintPromissoryNote",
    value: function () {
      var _mintPromissoryNote = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(options) {
        var success, loanContract, result;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              loanContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.loanContractAddress,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.assetOfferLoan.v1.abi
              });
              _context8.next = 4;
              return loanContract.call({
                "function": 'mintPromissoryNote',
                args: [options.loan.id]
              });
            case 4:
              result = _context8.sent;
              success = (result === null || result === void 0 ? void 0 : result.status) === 1;
              _context8.next = 11;
              break;
            case 8:
              _context8.prev = 8;
              _context8.t0 = _context8["catch"](0);
              success = false;
            case 11:
              return _context8.abrupt("return", success);
            case 12:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this, [[0, 8]]);
      }));
      function mintPromissoryNote(_x8) {
        return _mintPromissoryNote.apply(this, arguments);
      }
      return mintPromissoryNote;
    }()
  }, {
    key: "renegotiateLoan",
    value: function () {
      var _renegotiateLoan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(options) {
        var loanContractAddress, loanContract, args, result;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return this._getLoanData(options);
            case 2:
              loanContractAddress = _context9.sent;
              loanContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: loanContractAddress,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.assetOfferLoan.v1.abi
              });
              args = [options.loan.id, options.offer.terms.loan.duration, options.offer.terms.loan.repayment, options.offer.terms.loan.renegotiation.fee, options.offer.lender.nonce, options.offer.terms.loan.expiry.seconds, options.offer.terms.loan.interest.prorated, options.offer.signature];
              _context9.next = 7;
              return loanContract.call({
                "function": 'renegotiateLoan',
                args: args
              });
            case 7:
              result = _context9.sent;
              return _context9.abrupt("return", result.status === 1);
            case 9:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function renegotiateLoan(_x9) {
        return _renegotiateLoan.apply(this, arguments);
      }
      return renegotiateLoan;
    }()
  }]);
  return LoansAssetOfferV1;
}();
var _default = LoansAssetOfferV1;
exports["default"] = _default;