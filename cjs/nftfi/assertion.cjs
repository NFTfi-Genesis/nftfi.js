"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet4 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _account = /*#__PURE__*/new WeakMap();
var _provider = /*#__PURE__*/new WeakMap();
var Assertion = /*#__PURE__*/function () {
  function Assertion() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Assertion);
    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _provider, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _provider, options === null || options === void 0 ? void 0 : options.provider);
  }
  (0, _createClass2["default"])(Assertion, [{
    key: "hasSigner",
    value: function hasSigner(message) {
      var _classPrivateFieldGet2;
      if (!((_classPrivateFieldGet2 = (0, _classPrivateFieldGet4["default"])(this, _account)) !== null && _classPrivateFieldGet2 !== void 0 && _classPrivateFieldGet2.getSigner())) {
        throw new Error(message || 'Authentication required, please provide values for either account.privateKey, account.multisig or web3.provider on initialization.');
      }
    }
  }, {
    key: "hasAddress",
    value: function hasAddress(message) {
      var _classPrivateFieldGet3;
      if (!((_classPrivateFieldGet3 = (0, _classPrivateFieldGet4["default"])(this, _account)) !== null && _classPrivateFieldGet3 !== void 0 && _classPrivateFieldGet3.getAddress())) {
        throw new Error(message || 'Account address required, please provide values for either account.address, account.privateKey, web3.provider or account.multisig on initialization.');
      }
    }
  }, {
    key: "hasProvider",
    value: function hasProvider(message) {
      if (!(0, _classPrivateFieldGet4["default"])(this, _provider)) {
        throw new Error(message || 'Web3 provider required, please provide values for either options.ethereum.web3.provider or options.ethereum.provider.url on initialization.');
      }
    }
  }]);
  return Assertion;
}();
var _default = Assertion;
exports["default"] = _default;