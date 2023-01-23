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
var _multisig = /*#__PURE__*/new WeakMap();
var Multisig = /*#__PURE__*/function () {
  function Multisig(options) {
    (0, _classCallCheck2["default"])(this, Multisig);
    _classPrivateFieldInitSpec(this, _multisig, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _multisig, options === null || options === void 0 ? void 0 : options.multisig);
  }
  (0, _createClass2["default"])(Multisig, [{
    key: "isMultisig",
    value: function isMultisig() {
      return (0, _classPrivateFieldGet2["default"])(this, _multisig).isMultisig();
    }
  }, {
    key: "getAddress",
    value: function getAddress() {
      return (0, _classPrivateFieldGet2["default"])(this, _multisig).getAddress();
    }
  }, {
    key: "getAuthAddress",
    value: function getAuthAddress() {
      return (0, _classPrivateFieldGet2["default"])(this, _multisig).getAuthAddress();
    }
  }, {
    key: "getSigner",
    value: function getSigner() {
      return (0, _classPrivateFieldGet2["default"])(this, _multisig).getSigner();
    }
  }, {
    key: "sign",
    value: function () {
      var _sign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(msg) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _multisig).sign(msg));
            case 1:
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
    key: "authSign",
    value: function () {
      var _authSign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(msg) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _multisig).authSign(msg));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function authSign(_x2) {
        return _authSign.apply(this, arguments);
      }
      return authSign;
    }()
  }, {
    key: "execTransaction",
    value: function () {
      var _execTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(tx) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _multisig).execTransaction(tx));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function execTransaction(_x3) {
        return _execTransaction.apply(this, arguments);
      }
      return execTransaction;
    }()
  }]);
  return Multisig;
}();
var _default = Multisig;
exports["default"] = _default;