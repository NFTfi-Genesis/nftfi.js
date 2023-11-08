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
var _contract = /*#__PURE__*/new WeakMap();
var CryptoPunks = /*#__PURE__*/function () {
  function CryptoPunks(options) {
    (0, _classCallCheck2["default"])(this, CryptoPunks);
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _contractFactory, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _contract, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
  }
  (0, _createClass2["default"])(CryptoPunks, [{
    key: "_contract",
    get: function get() {
      if (!(0, _classPrivateFieldGet2["default"])(this, _contract)) {
        (0, _classPrivateFieldSet2["default"])(this, _contract, (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
          address: (0, _classPrivateFieldGet2["default"])(this, _config).nft.cryptoPunks.address,
          abi: (0, _classPrivateFieldGet2["default"])(this, _config).nft.cryptoPunks.abi
        }));
      }
      return (0, _classPrivateFieldGet2["default"])(this, _contract);
    }
  }, {
    key: "_getContractAddress",
    value: function _getContractAddress(contractName) {
      switch (contractName) {
        case 'v2-1.loan.fixed':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v2_1.address;
        case 'v2-3.loan.fixed':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v2_3.address;
        case 'v2.loan.fixed.collection':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2.address;
        case 'v2-3.loan.fixed.collection':
          return (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2_3.address;
      }
    }
  }, {
    key: "approve",
    value: function () {
      var _approve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var punkIndex, minSalePriceInWei, toAddress, result, success;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              punkIndex = options.token.id;
              minSalePriceInWei = 0;
              toAddress = this._getContractAddress(options.nftfi.contract.name);
              _context.next = 5;
              return this._contract.call({
                "function": 'offerPunkForSaleToAddress',
                args: [punkIndex, minSalePriceInWei, toAddress]
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
      function approve(_x) {
        return _approve.apply(this, arguments);
      }
      return approve;
    }()
  }, {
    key: "isApproved",
    value: function () {
      var _isApproved = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var _options$token, _result$onlySellTo;
        var buyer, result, onlySellTo, isForSale, approved;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              buyer = this._getContractAddress(options.nftfi.contract.name).toLowerCase();
              _context2.next = 3;
              return this._contract.call({
                "function": 'punksOfferedForSale',
                args: [options === null || options === void 0 ? void 0 : (_options$token = options.token) === null || _options$token === void 0 ? void 0 : _options$token.id]
              });
            case 3:
              result = _context2.sent;
              onlySellTo = result === null || result === void 0 ? void 0 : (_result$onlySellTo = result.onlySellTo) === null || _result$onlySellTo === void 0 ? void 0 : _result$onlySellTo.toLowerCase();
              isForSale = result === null || result === void 0 ? void 0 : result.isForSale;
              approved = isForSale === true && onlySellTo === buyer;
              return _context2.abrupt("return", approved);
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function isApproved(_x2) {
        return _isApproved.apply(this, arguments);
      }
      return isApproved;
    }()
  }, {
    key: "ownerOf",
    value: function () {
      var _ownerOf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var punkIndex, address;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              punkIndex = options.token.id;
              _context3.next = 3;
              return this._contract.call({
                "function": 'punkIndexToAddress',
                args: [punkIndex]
              });
            case 3:
              address = _context3.sent;
              return _context3.abrupt("return", address);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function ownerOf(_x3) {
        return _ownerOf.apply(this, arguments);
      }
      return ownerOf;
    }()
  }]);
  return CryptoPunks;
}();
var _default = CryptoPunks;
exports["default"] = _default;