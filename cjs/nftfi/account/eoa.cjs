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
var _address = /*#__PURE__*/new WeakMap();
var _signer = /*#__PURE__*/new WeakMap();
var _provider = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var EOA = /*#__PURE__*/function () {
  function EOA() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, EOA);
    _classPrivateFieldInitSpec(this, _address, {
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
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _address, options === null || options === void 0 ? void 0 : options.address);
    (0, _classPrivateFieldSet2["default"])(this, _signer, options === null || options === void 0 ? void 0 : options.signer);
    (0, _classPrivateFieldSet2["default"])(this, _provider, options === null || options === void 0 ? void 0 : options.provider);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
  }
  (0, _createClass2["default"])(EOA, [{
    key: "isMultisig",
    value: function isMultisig() {
      return false;
    }
  }, {
    key: "getAddress",
    value: function getAddress() {
      return (0, _classPrivateFieldGet2["default"])(this, _address);
    }
  }, {
    key: "getAuthAddress",
    value: function getAuthAddress() {
      return this.getAddress();
    }
  }, {
    key: "getSigner",
    value: function getSigner() {
      return (0, _classPrivateFieldGet2["default"])(this, _signer);
    }
  }, {
    key: "sign",
    value: function () {
      var _sign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(msg) {
        var signedMsg;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              signedMsg = (0, _classPrivateFieldGet2["default"])(this, _signer).signMessage(msg);
              return _context.abrupt("return", signedMsg);
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function sign(_x) {
        return _sign.apply(this, arguments);
      }
      return sign;
    }()
  }, {
    key: "signTypedData",
    value: function () {
      var _signTypedData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(domain, types, value) {
        var signature, _signature;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(typeof (0, _classPrivateFieldGet2["default"])(this, _signer).signTypedData === 'function')) {
                _context2.next = 7;
                break;
              }
              _context2.next = 3;
              return (0, _classPrivateFieldGet2["default"])(this, _signer).signTypedData(domain, types, value);
            case 3:
              signature = _context2.sent;
              return _context2.abrupt("return", signature);
            case 7:
              if (!(typeof (0, _classPrivateFieldGet2["default"])(this, _signer)._signTypedData === 'function')) {
                _context2.next = 14;
                break;
              }
              _context2.next = 10;
              return (0, _classPrivateFieldGet2["default"])(this, _signer)._signTypedData(domain, types, value);
            case 10:
              _signature = _context2.sent;
              return _context2.abrupt("return", _signature);
            case 14:
              throw new Error('Neither signTypedData nor _signTypedData method is available on the signer');
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function signTypedData(_x2, _x3, _x4) {
        return _signTypedData.apply(this, arguments);
      }
      return signTypedData;
    }()
  }, {
    key: "authSign",
    value: function () {
      var _authSign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(msg) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.sign(msg));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function authSign(_x5) {
        return _authSign.apply(this, arguments);
      }
      return authSign;
    }()
  }, {
    key: "execTransaction",
    value: function () {
      var _execTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(tx) {
        var receipt, confirmations;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _classPrivateFieldGet2["default"])(this, _signer).sendTransaction(tx);
            case 2:
              receipt = _context4.sent;
              confirmations = typeof (0, _classPrivateFieldGet2["default"])(this, _config).ethereum.block.confirmations === 'number' ? (0, _classPrivateFieldGet2["default"])(this, _config).ethereum.block.confirmations : null;
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _provider).waitForTransaction(receipt.hash, confirmations));
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function execTransaction(_x6) {
        return _execTransaction.apply(this, arguments);
      }
      return execTransaction;
    }()
  }]);
  return EOA;
}();
var _default = EOA;
exports["default"] = _default;