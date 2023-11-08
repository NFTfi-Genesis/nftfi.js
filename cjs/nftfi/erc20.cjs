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
var _config = /*#__PURE__*/new WeakMap();
var _contractFactory = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
var _BN = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var _assertion = /*#__PURE__*/new WeakMap();
/**
 * @class
 * Class for working with ERC20 tokens.
 */
var Erc20 = /*#__PURE__*/function () {
  function Erc20(options) {
    (0, _classCallCheck2["default"])(this, Erc20);
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _contractFactory, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _BN, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _error, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _assertion, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _BN, options === null || options === void 0 ? void 0 : options.BN);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet2["default"])(this, _assertion, options === null || options === void 0 ? void 0 : options.assertion);
  }
  (0, _createClass2["default"])(Erc20, [{
    key: "_getContractAddress",
    value: function _getContractAddress(contractName) {
      switch (contractName) {
        case 'v1.loan.fixed':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v1.address;
        case 'v2.loan.fixed':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v2.address;
        case 'v2-1.loan.fixed':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v2_1.address;
        case 'v2-3.loan.fixed':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v2_3.address;
        case 'v1.bundler':
          return (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1.address;
        case 'v2.loan.fixed.collection':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2.address;
        case 'v2-3.loan.fixed.collection':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2_3.address;
      }
    }

    /**
     * Returns the ERC20 allowance, for v1 & v2 NFTfi contracts, for your account (by default), or a specified account.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {object} [options.account.address] - The account address to get the allowance of (optional)
     * @param {string} options.token.address - The ERC20 token address
     * @param {string} options.nftfi.contract.name - The name of the contract NFTfi contract (eg. `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`)
     * @returns {number} The user account's token allowance for that contract, in base units (eg. 1000000000000000000 wei)
     *
     * @example
     * const balance = await nftfi.erc20.allowance({
     *  token: { address: '0x00000000' },
     *  nftfi: { contract: { name: 'v2-3.loan.fixed' } }
     * });
     */
  }, {
    key: "allowance",
    value: function () {
      var _allowance = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _options$account, _options$account2, contractName, contractAddress, accountAddress, contract;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              if (!(options !== null && options !== void 0 && (_options$account = options.account) !== null && _options$account !== void 0 && _options$account.address)) {
                (0, _classPrivateFieldGet2["default"])(this, _assertion).hasAddress('Account address required, please provide a value in options.account.address or on sdk initialization.');
              }
              contractName = options.nftfi.contract.name;
              contractAddress = this._getContractAddress(contractName);
              accountAddress = (options === null || options === void 0 ? void 0 : (_options$account2 = options.account) === null || _options$account2 === void 0 ? void 0 : _options$account2.address) || (0, _classPrivateFieldGet2["default"])(this, _account).getAddress();
              contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.token.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).erc20.abi
              });
              _context.next = 8;
              return contract.call({
                "function": 'allowance',
                args: [accountAddress, contractAddress]
              });
            case 8:
              return _context.abrupt("return", _context.sent);
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t0));
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 11]]);
      }));
      function allowance(_x) {
        return _allowance.apply(this, arguments);
      }
      return allowance;
    }()
    /**
     * Approves your account's ERC20 spending amount, if not already approved, for v1 & v2 NFTfi contracts.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {string} options.token.address - The ERC20 token address
     * @param {string} options.nftfi.contract.name - The name of the contract NFTfi contract (eg. `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`)
     * @param {number} options.amount - The token amount to approve, in base units (eg. 1000000000000000000 wei)
     * @returns {boolean} Boolean value indicating whether the operation succeeded
     *
     * @example
     * const results = await nftfi.erc20.approve({
     *   amount: 1000000000000000000,
     *   token: { address: '0x00000000' },
     *   nftfi: { contract: { name: 'v2-3.loan.fixed' } }
     * });
     */
  }, {
    key: "approve",
    value: function () {
      var _approve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var contractName, contractAddress, success, contract, allowance, amount, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasAddress();
              contractName = options.nftfi.contract.name;
              contractAddress = this._getContractAddress(contractName);
              contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.token.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).erc20.abi
              });
              _context2.next = 7;
              return this.allowance(options);
            case 7:
              allowance = _context2.sent;
              amount = options.amount.toLocaleString('fullwide', {
                useGrouping: false
              });
              if (!(allowance.lt(amount) || amount === '0')) {
                _context2.next = 17;
                break;
              }
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              _context2.next = 13;
              return contract.call({
                "function": 'approve',
                args: [contractAddress, amount]
              });
            case 13:
              result = _context2.sent;
              success = (result === null || result === void 0 ? void 0 : result.status) === 1;
              _context2.next = 18;
              break;
            case 17:
              success = true;
            case 18:
              return _context2.abrupt("return", success);
            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context2.t0));
            case 24:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 21]]);
      }));
      function approve(_x2) {
        return _approve.apply(this, arguments);
      }
      return approve;
    }()
    /**
     * Approves your account's ERC20 maximum amount, if not already approved, for v1 & v2 NFTfi contracts.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {string} options.token.address - The ERC20 token address
     * @param {string} options.nftfi.contract.name - The name of the contract NFTfi contract (eg. `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`)
     * @returns {boolean} Boolean value indicating whether the operation succeeded
     *
     * @example
     * const results = await nftfi.erc20.approveMax({
     *   token: { address: '0x00000000' },
     *   nftfi: { contract: { name: 'v2-3.loan.fixed' } }
     * });
     */
  }, {
    key: "approveMax",
    value: function () {
      var _approveMax = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var maxAllowance;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              maxAllowance = new ((0, _classPrivateFieldGet2["default"])(this, _BN))(0).notn(256).toString();
              return _context3.abrupt("return", this.approve(_objectSpread(_objectSpread({}, options), {}, {
                amount: maxAllowance
              })));
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function approveMax(_x3) {
        return _approveMax.apply(this, arguments);
      }
      return approveMax;
    }()
    /**
     * Returns the balance of a given ERC20 token for your account (by default), or a specified account.
     *
     * @param {object} options - Options
     * @param {object} [options.account.address] - The account address to get the balance of (optional)
     * @param {string} options.token.address - The ERC20 token address
     * @returns {number} The user account's token balance, in base units (eg. 1000000000000000000 wei)
     *
     * @example
     * const balance = await nftfi.erc20.balanceOf({
     *   token: { address: '0x00000000' }
     * });
     */
  }, {
    key: "balanceOf",
    value: function () {
      var _balanceOf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var _options$account3, _options$account4, contract, accountAddress, balance;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              if (!(options !== null && options !== void 0 && (_options$account3 = options.account) !== null && _options$account3 !== void 0 && _options$account3.address)) {
                (0, _classPrivateFieldGet2["default"])(this, _assertion).hasAddress('Account address required, please provide a value in options.account.address or on sdk initialization.');
              }
              contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.token.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).erc20.abi
              });
              accountAddress = (options === null || options === void 0 ? void 0 : (_options$account4 = options.account) === null || _options$account4 === void 0 ? void 0 : _options$account4.address) || (0, _classPrivateFieldGet2["default"])(this, _account).getAddress();
              _context4.next = 6;
              return contract.call({
                "function": 'balanceOf',
                args: [accountAddress]
              });
            case 6:
              balance = _context4.sent;
              return _context4.abrupt("return", balance);
            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context4.t0));
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 10]]);
      }));
      function balanceOf(_x4) {
        return _balanceOf.apply(this, arguments);
      }
      return balanceOf;
    }()
  }]);
  return Erc20;
}();
var _default = Erc20;
exports["default"] = _default;