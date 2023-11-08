"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _signer = /*#__PURE__*/new WeakMap();
var _ethers = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
var _Contract = /*#__PURE__*/new WeakMap();
var _provider = /*#__PURE__*/new WeakMap();
var _assertion = /*#__PURE__*/new WeakMap();
var ContractFactory = /*#__PURE__*/function () {
  function ContractFactory(options) {
    (0, _classCallCheck2["default"])(this, ContractFactory);
    _classPrivateFieldInitSpec(this, _signer, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _Contract, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _provider, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _assertion, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _signer, options === null || options === void 0 ? void 0 : options.signer);
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _Contract, options === null || options === void 0 ? void 0 : options.Contract);
    (0, _classPrivateFieldSet2["default"])(this, _provider, options === null || options === void 0 ? void 0 : options.provider);
    (0, _classPrivateFieldSet2["default"])(this, _assertion, options === null || options === void 0 ? void 0 : options.assertion);
  }
  (0, _createClass2["default"])(ContractFactory, [{
    key: "create",
    value: function create(options) {
      var ethersContract;
      if ((0, _classPrivateFieldGet2["default"])(this, _signer)) {
        ethersContract = new ((0, _classPrivateFieldGet2["default"])(this, _ethers).Contract)(options === null || options === void 0 ? void 0 : options.address, options === null || options === void 0 ? void 0 : options.abi, (0, _classPrivateFieldGet2["default"])(this, _signer));
      } else {
        (0, _classPrivateFieldGet2["default"])(this, _assertion).hasProvider();
        ethersContract = new ((0, _classPrivateFieldGet2["default"])(this, _ethers).Contract)(options === null || options === void 0 ? void 0 : options.address, options === null || options === void 0 ? void 0 : options.abi, (0, _classPrivateFieldGet2["default"])(this, _provider));
      }
      var contract = new ((0, _classPrivateFieldGet2["default"])(this, _Contract))({
        account: (0, _classPrivateFieldGet2["default"])(this, _account),
        contract: ethersContract
      });
      return contract;
    }
  }]);
  return ContractFactory;
}();
var _default = ContractFactory;
exports["default"] = _default;