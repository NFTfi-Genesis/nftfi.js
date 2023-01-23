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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _address = /*#__PURE__*/new WeakMap();
var _owners = /*#__PURE__*/new WeakMap();
var _signer = /*#__PURE__*/new WeakMap();
var _provider = /*#__PURE__*/new WeakMap();
var _ethers = /*#__PURE__*/new WeakMap();
var MultisigGnosis = /*#__PURE__*/function () {
  function MultisigGnosis(options) {
    (0, _classCallCheck2["default"])(this, MultisigGnosis);
    _classPrivateFieldInitSpec(this, _address, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _owners, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _signer, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _provider, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _address, options === null || options === void 0 ? void 0 : options.address);
    (0, _classPrivateFieldSet2["default"])(this, _owners, options === null || options === void 0 ? void 0 : options.owners);
    (0, _classPrivateFieldSet2["default"])(this, _signer, options === null || options === void 0 ? void 0 : options.signer);
    (0, _classPrivateFieldSet2["default"])(this, _provider, options === null || options === void 0 ? void 0 : options.provider);
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
  }
  (0, _createClass2["default"])(MultisigGnosis, [{
    key: "isMultisig",
    value: function isMultisig() {
      var multisig = {
        type: 'gnosis'
      };
      return multisig;
    }
  }, {
    key: "getAddress",
    value: function getAddress() {
      return (0, _classPrivateFieldGet2["default"])(this, _address);
    }
  }, {
    key: "getAuthAddress",
    value: function getAuthAddress() {
      var owner = (0, _classPrivateFieldGet2["default"])(this, _owners)[0];
      var address = owner.getAddress();
      return address;
    }
  }, {
    key: "getSigner",
    value: function getSigner() {
      return (0, _classPrivateFieldGet2["default"])(this, _signer);
    }
  }, {
    key: "execTransaction",
    value: function () {
      var _execTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(tx) {
        var safeSDKs, baseSafeSDK, otherSafeSDKs, safeTransaction, receipt, response;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // Always make sure that value is never undefined
              tx.value = tx.value || '0';
              // Get all safe SDKs
              _context3.next = 3;
              return Promise.all((0, _classPrivateFieldGet2["default"])(this, _owners).map( /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(owner) {
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt("return", owner.getSafeSDK());
                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 3:
              safeSDKs = _context3.sent;
              baseSafeSDK = safeSDKs[0];
              otherSafeSDKs = safeSDKs.slice(1); // Create a safe transaction using the base safe sdk
              _context3.next = 8;
              return baseSafeSDK.createTransaction(tx);
            case 8:
              safeTransaction = _context3.sent;
              _context3.next = 11;
              return Promise.all(otherSafeSDKs.map( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(safeSDK) {
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", safeSDK.signTransaction(safeTransaction));
                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 11:
              _context3.next = 13;
              return baseSafeSDK.executeTransaction(safeTransaction);
            case 13:
              receipt = _context3.sent;
              response = receipt.transactionResponse.wait();
              return _context3.abrupt("return", response);
            case 16:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function execTransaction(_x) {
        return _execTransaction.apply(this, arguments);
      }
      return execTransaction;
    }()
  }, {
    key: "sign",
    value: function () {
      var _sign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(message) {
        var signatures, signature;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this._getMultiSignatures(message);
            case 2:
              signatures = _context4.sent;
              signature = this._concatSignatures(signatures);
              return _context4.abrupt("return", signature);
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function sign(_x4) {
        return _sign.apply(this, arguments);
      }
      return sign;
    }()
  }, {
    key: "authSign",
    value: function () {
      var _authSign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(message) {
        var owner, signer, signedMsg;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              owner = (0, _classPrivateFieldGet2["default"])(this, _owners)[0];
              signer = new ((0, _classPrivateFieldGet2["default"])(this, _ethers).Wallet)(owner.getPrivateKey(), (0, _classPrivateFieldGet2["default"])(this, _provider));
              _context5.next = 4;
              return signer.signMessage(message);
            case 4:
              signedMsg = _context5.sent;
              return _context5.abrupt("return", signedMsg);
            case 6:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function authSign(_x5) {
        return _authSign.apply(this, arguments);
      }
      return authSign;
    }()
  }, {
    key: "_getMultiSignatures",
    value: function () {
      var _getMultiSignatures2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(message) {
        var signatures;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return Promise.all((0, _classPrivateFieldGet2["default"])(this, _owners).map( /*#__PURE__*/function () {
                var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(owner) {
                  var signature;
                  return _regenerator["default"].wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.t0 = owner.getAddress();
                        _context6.next = 3;
                        return owner.sign(message);
                      case 3:
                        _context6.t1 = _context6.sent;
                        signature = {
                          address: _context6.t0,
                          data: _context6.t1
                        };
                        return _context6.abrupt("return", signature);
                      case 6:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6);
                }));
                return function (_x7) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 2:
              signatures = _context7.sent;
              return _context7.abrupt("return", signatures);
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function _getMultiSignatures(_x6) {
        return _getMultiSignatures2.apply(this, arguments);
      }
      return _getMultiSignatures;
    }()
  }, {
    key: "_concatSignatures",
    value: function _concatSignatures(signatures) {
      //https://github.com/safe-global/safe-contracts/blob/c36bcab46578a442862d043e12a83fec41143dec/src/utils/execution.ts#L111
      signatures.sort(function (left, right) {
        return left.address.localeCompare(right.address);
      });
      var signatureBytes = '0x';
      var _iterator = _createForOfIteratorHelper(signatures),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var signature = _step.value;
          signatureBytes += signature.data.slice(2);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return signatureBytes;
    }
  }]);
  return MultisigGnosis;
}();
var _default = MultisigGnosis;
exports["default"] = _default;