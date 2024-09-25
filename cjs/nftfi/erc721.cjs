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
var _assertion = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
/**
 * @class
 * Class for working with ERC721 non-fungible tokens.
 */
var Erc721 = /*#__PURE__*/function () {
  function Erc721(options) {
    (0, _classCallCheck2["default"])(this, Erc721);
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
    _classPrivateFieldInitSpec(this, _assertion, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _error, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _assertion, options === null || options === void 0 ? void 0 : options.assertion);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
  }
  (0, _createClass2["default"])(Erc721, [{
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
        case 'v1-1.bundler':
          return (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1_1.address;
        case 'v2.loan.fixed.collection':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2.address;
        case 'v2-3.loan.fixed.collection':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2_3.address;
        case 'v1.bundler.migrate':
          return (0, _classPrivateFieldGet2["default"])(this, _config).bundler.migrate.v1.address;
        case 'loan.refinance':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.refinance.address;
        case 'v3.refinance.v1':
          return (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.refinance.v1.address;
        case 'v3.escrow.v1':
          return (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.escrow.v1.address;
      }
    }

    /**
     * Returns the owner of the specified NFT.
     *
     * @param {object} options - Options
     * @param {string} options.token.address - The ERC721 token address
     * @param {string} options.token.id - The ERC721 token ID
     * @returns {string} The NFT's owner address
     *
     * @example
     * const address = await nftfi.nft.erc721.ownerOf({
     *   token: {
     *    address: '0x00000000',
     *    id: '0'
     *   }
     * });
     */
  }, {
    key: "ownerOf",
    value: function () {
      var _ownerOf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var contract, address;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.token.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).erc721.abi
              });
              _context.next = 4;
              return contract.call({
                "function": 'ownerOf',
                args: [options.token.id]
              });
            case 4:
              address = _context.sent;
              return _context.abrupt("return", address.toLowerCase());
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              if (!(options !== null && options !== void 0 && options.rethrow)) {
                _context.next = 12;
                break;
              }
              throw _context.t0;
            case 12:
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t0));
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 8]]);
      }));
      function ownerOf(_x) {
        return _ownerOf.apply(this, arguments);
      }
      return ownerOf;
    }()
    /**
     * Sets the approval of a given NFTfi contract.
     * The NFTfi contract is allowed to transfer all tokens of the sender on their behalf.
     *
     * @param {object} options - Options
     * @param {string} options.token.address - The ERC721 token address
     * @param {string} options.nftfi.contract.name - The name of the NFTfi contract (eg. `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`)
     * @returns {boolean} Boolean value indicating whether the operation succeeded
     *
     * @example
     * const address = await nftfi.nft.erc721.setApprovalForAll({
     *   token: {
     *    address: '0x00000000'
     *   },
     *   nftfi: { contract: { name: 'v2-3.loan.fixed' } }
     * });
     */
  }, {
    key: "setApprovalForAll",
    value: function () {
      var _setApprovalForAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var success, contractName, contractAddress, contract, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              contractName = options.nftfi.contract.name;
              contractAddress = this._getContractAddress(contractName);
              contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.token.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).erc721.abi
              });
              _context2.next = 7;
              return contract.call({
                "function": 'setApprovalForAll',
                args: [contractAddress, true]
              });
            case 7:
              result = _context2.sent;
              success = (result === null || result === void 0 ? void 0 : result.status) === 1;
              return _context2.abrupt("return", success);
            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              if (!(options !== null && options !== void 0 && options.rethrow)) {
                _context2.next = 16;
                break;
              }
              throw _context2.t0;
            case 16:
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context2.t0));
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 12]]);
      }));
      function setApprovalForAll(_x2) {
        return _setApprovalForAll.apply(this, arguments);
      }
      return setApprovalForAll;
    }()
    /**
     * Returns the approval of a given NFTfi contract.
     * The NFTfi contract is allowed to transfer all tokens of the sender on their behalf.
     *
     * @param {object} options - Options
     * @param {object} options.account.address - The account address to get the approval of (optional)
     * @param {string} options.token.address - The ERC721 token address
     * @param {string} options.nftfi.contract.name - The name of the NFTfi contract (eg. `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`)
     * @returns {boolean} Boolean value indicating whether permission has been granted or not
     *
     * @example
     * const address = await nftfi.nft.erc721.isApprovedForAll({
     *   token: {
     *    address: '0x00000000'
     *   },
     *   nftfi: { contract: { name: 'v2-3.loan.fixed' } }
     * });
     */
  }, {
    key: "isApprovedForAll",
    value: function () {
      var _isApprovedForAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var _options$account, _options$account2, contractName, contractAddress, accountAddress, contract, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              if (!(options !== null && options !== void 0 && (_options$account = options.account) !== null && _options$account !== void 0 && _options$account.address)) {
                (0, _classPrivateFieldGet2["default"])(this, _assertion).hasAddress('Account address required, please provide a value in options.account.address or on sdk initialization.');
              }
              contractName = options.nftfi.contract.name;
              contractAddress = this._getContractAddress(contractName);
              accountAddress = (options === null || options === void 0 ? void 0 : (_options$account2 = options.account) === null || _options$account2 === void 0 ? void 0 : _options$account2.address) || (0, _classPrivateFieldGet2["default"])(this, _account).getAddress();
              contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: options.token.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).erc721.abi
              });
              _context3.next = 8;
              return contract.call({
                "function": 'isApprovedForAll',
                args: [accountAddress, contractAddress]
              });
            case 8:
              result = _context3.sent;
              return _context3.abrupt("return", result);
            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              if (!(options !== null && options !== void 0 && options.rethrow)) {
                _context3.next = 16;
                break;
              }
              throw _context3.t0;
            case 16:
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context3.t0));
            case 17:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 12]]);
      }));
      function isApprovedForAll(_x3) {
        return _isApprovedForAll.apply(this, arguments);
      }
      return isApprovedForAll;
    }()
  }]);
  return Erc721;
}();
var _default = Erc721;
exports["default"] = _default;