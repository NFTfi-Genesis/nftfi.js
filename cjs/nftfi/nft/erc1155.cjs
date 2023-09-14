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
var _account = /*#__PURE__*/new WeakMap();
/**
 * @class
 * Class for working with ERC1155 multi token standard.
 */
var Erc1155 = /*#__PURE__*/function () {
  function Erc1155(options) {
    (0, _classCallCheck2["default"])(this, Erc1155);
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
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
  }
  (0, _createClass2["default"])(Erc1155, [{
    key: "_getContractAddress",
    value: function _getContractAddress(contractName) {
      switch (contractName) {
        case 'v1.loan.fixed':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v1.address;
        case 'v2.loan.fixed':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v2.address;
        case 'v2-1.loan.fixed':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v2_1.address;
        case 'v2.loan.fixed.collection':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2.address;
      }
    }

    /**
     * Sets the approval of a given NFTfi contract.
     * The NFTfi contract is allowed to transfer all tokens of the sender on their behalf.
     *
     * @param {object} options - Options
     * @param {string} options.token.address - The ERC1155 token address
     * @param {string} options.nftfi.contract.name - The name of the NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`, `v2-1.loan.fixed`)
     * @returns {boolean} Boolean value indicating whether the operation succeeded
     *
     * @example
     * const address = await nftfi.nft.erc1155.setApprovalForAll({
     *   token: {
     *    address: '0x00000000'
     *   },
     *   nftfi: { contract: { name: 'v2-1.loan.fixed' } }
     * });
     */
  }, {
    key: "setApprovalForAll",
    value: function () {
      var _setApprovalForAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var success, contractName, contractAddress, contract, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              contractName = options.nftfi.contract.name;
              contractAddress = this._getContractAddress(contractName);
              contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.token.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).erc1155.abi
              });
              _context.next = 5;
              return contract.call({
                "function": 'setApprovalForAll',
                args: [contractAddress, true]
              });
            case 5:
              result = _context.sent;
              success = (result === null || result === void 0 ? void 0 : result.status) === 1;
              return _context.abrupt("return", success);
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function setApprovalForAll(_x) {
        return _setApprovalForAll.apply(this, arguments);
      }
      return setApprovalForAll;
    }()
    /**
     * Returns the approval of a given NFTfi contract.
     * The NFTfi contract is allowed to transfer all tokens of the sender on their behalf.
     *
     * @param {object} options - Options
     * @param {string} options.token.address - The ERC1155 token address
     * @param {string} options.nftfi.contract.name - The name of the NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`, `v2-1.loan.fixed`)
     * @returns {boolean} Boolean value indicating whether permission has been granted or not
     *
     * @example
     * const address = await nftfi.nft.erc1155.isApprovalForAll({
     *   token: {
     *    address: '0x00000000'
     *   },
     *   nftfi: { contract: { name: 'v2-1.loan.fixed' } }
     * });
     */
  }, {
    key: "isApprovedForAll",
    value: function () {
      var _isApprovedForAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var _options$account;
        var contractName, contractAddress, accountAddress, contract, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              contractName = options.nftfi.contract.name;
              contractAddress = this._getContractAddress(contractName);
              accountAddress = (options === null || options === void 0 ? void 0 : (_options$account = options.account) === null || _options$account === void 0 ? void 0 : _options$account.address) || (0, _classPrivateFieldGet2["default"])(this, _account).getAddress();
              contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.token.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).erc1155.abi
              });
              _context2.next = 6;
              return contract.call({
                "function": 'isApprovedForAll',
                args: [accountAddress, contractAddress]
              });
            case 6:
              result = _context2.sent;
              return _context2.abrupt("return", result);
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function isApprovedForAll(_x2) {
        return _isApprovedForAll.apply(this, arguments);
      }
      return isApprovedForAll;
    }()
    /**
     * Returns the balance of a given ERC1155 token
     *
     * @param {object} options - Options
     * @param {string} options.token.address - The ERC1155 token address
     * @param {string} options.token.id - The ERC1155 token id
     * @param {string} [options.account.address] - The address of the account (If not provided, the signer account address will be used.)
     * @returns {number} The balance of tokens owned by account.
     *
     * @example
     * const balance = await nftfi.nft.erc1155.balanceOf({
     *   token: {
     *    address: '0x00000000',
     *    id: '0'
     *   }
     * });
     *
     * @example
     * const balance = await nftfi.nft.erc1155.balanceOf({
     *   token: {
     *    address: '0x00000000',
     *    id: '0'
     *   },
     *   account: {
     *    address: "0x111111111"
     *   }
     * });
     */
  }, {
    key: "balanceOf",
    value: function () {
      var _balanceOf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var _options$account2, _options$token;
        var accountAddress, tokenId, contract, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              accountAddress = (options === null || options === void 0 ? void 0 : (_options$account2 = options.account) === null || _options$account2 === void 0 ? void 0 : _options$account2.address) || (0, _classPrivateFieldGet2["default"])(this, _account).getAddress();
              tokenId = options === null || options === void 0 ? void 0 : (_options$token = options.token) === null || _options$token === void 0 ? void 0 : _options$token.id;
              contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.token.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).erc1155.abi
              });
              _context3.next = 5;
              return contract.call({
                "function": 'balanceOf',
                args: [accountAddress, tokenId]
              });
            case 5:
              result = _context3.sent;
              return _context3.abrupt("return", result);
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function balanceOf(_x3) {
        return _balanceOf.apply(this, arguments);
      }
      return balanceOf;
    }()
  }]);
  return Erc1155;
}();
var _default = Erc1155;
exports["default"] = _default;