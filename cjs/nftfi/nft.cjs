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
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _config = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
var _ethers = /*#__PURE__*/new WeakMap();
var _utils = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var _assertion = /*#__PURE__*/new WeakMap();
var Nft = /*#__PURE__*/function () {
  function Nft(options) {
    var _options$nft, _options$nft2, _options$nft3;
    (0, _classCallCheck2["default"])(this, Nft);
    (0, _defineProperty2["default"])(this, "erc721", void 0);
    (0, _defineProperty2["default"])(this, "erc1155", void 0);
    (0, _defineProperty2["default"])(this, "cryptoPunks", void 0);
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _utils, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _account, {
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
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    this.erc721 = options === null || options === void 0 ? void 0 : (_options$nft = options.nft) === null || _options$nft === void 0 ? void 0 : _options$nft.erc721;
    this.erc1155 = options === null || options === void 0 ? void 0 : (_options$nft2 = options.nft) === null || _options$nft2 === void 0 ? void 0 : _options$nft2.erc1155;
    this.cryptoPunks = options === null || options === void 0 ? void 0 : (_options$nft3 = options.nft) === null || _options$nft3 === void 0 ? void 0 : _options$nft3.cryptoPunks;
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet2["default"])(this, _utils, options === null || options === void 0 ? void 0 : options.utils);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet2["default"])(this, _assertion, options === null || options === void 0 ? void 0 : options.assertion);
  }
  (0, _createClass2["default"])(Nft, [{
    key: "approve",
    value: function () {
      var _approve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _options$token, success, tokenAddress, supportedInterface;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              success = false;
              tokenAddress = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(options === null || options === void 0 ? void 0 : (_options$token = options.token) === null || _options$token === void 0 ? void 0 : _options$token.address);
              _context.t0 = tokenAddress;
              _context.next = _context.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).nft.cryptoPunks.address ? 7 : 11;
              break;
            case 7:
              _context.next = 9;
              return this.cryptoPunks.approve(options);
            case 9:
              success = _context.sent;
              return _context.abrupt("break", 26);
            case 11:
              _context.next = 13;
              return (0, _classPrivateFieldGet2["default"])(this, _utils).getSupportedInterface(options);
            case 13:
              supportedInterface = _context.sent;
              _context.t1 = true;
              _context.next = _context.t1 === supportedInterface.isERC1155 ? 17 : _context.t1 === supportedInterface.isERC721 ? 21 : 25;
              break;
            case 17:
              _context.next = 19;
              return this.erc1155.setApprovalForAll(options);
            case 19:
              success = _context.sent;
              return _context.abrupt("break", 26);
            case 21:
              _context.next = 23;
              return this.erc721.setApprovalForAll(_objectSpread(_objectSpread({}, options), {}, {
                rethrow: true
              }));
            case 23:
              success = _context.sent;
              return _context.abrupt("break", 26);
            case 25:
              throw 'specified contract is not supported';
            case 26:
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                success: success
              }));
            case 29:
              _context.prev = 29;
              _context.t2 = _context["catch"](0);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t2));
            case 32:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 29]]);
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
        var _options$account, _options$token2, approved, tokenAddress, supportedInterface;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              if (!(options !== null && options !== void 0 && (_options$account = options.account) !== null && _options$account !== void 0 && _options$account.address)) {
                (0, _classPrivateFieldGet2["default"])(this, _assertion).hasAddress('Account address required, please provide a value in options.account.address or on sdk initialization.');
              }
              approved = false;
              tokenAddress = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(options === null || options === void 0 ? void 0 : (_options$token2 = options.token) === null || _options$token2 === void 0 ? void 0 : _options$token2.address);
              _context2.t0 = tokenAddress;
              _context2.next = _context2.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).nft.cryptoPunks.address ? 7 : 11;
              break;
            case 7:
              _context2.next = 9;
              return this.cryptoPunks.isApproved(options);
            case 9:
              approved = _context2.sent;
              return _context2.abrupt("break", 26);
            case 11:
              _context2.next = 13;
              return (0, _classPrivateFieldGet2["default"])(this, _utils).getSupportedInterface(options);
            case 13:
              supportedInterface = _context2.sent;
              _context2.t1 = true;
              _context2.next = _context2.t1 === supportedInterface.isERC1155 ? 17 : _context2.t1 === supportedInterface.isERC721 ? 21 : 25;
              break;
            case 17:
              _context2.next = 19;
              return this.erc1155.isApprovedForAll(options);
            case 19:
              approved = _context2.sent;
              return _context2.abrupt("break", 26);
            case 21:
              _context2.next = 23;
              return this.erc721.isApprovedForAll(_objectSpread(_objectSpread({}, options), {}, {
                rethrow: true
              }));
            case 23:
              approved = _context2.sent;
              return _context2.abrupt("break", 26);
            case 25:
              throw 'specified contract is not supported';
            case 26:
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                approved: approved
              }));
            case 29:
              _context2.prev = 29;
              _context2.t2 = _context2["catch"](0);
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context2.t2));
            case 32:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 29]]);
      }));
      function isApproved(_x2) {
        return _isApproved.apply(this, arguments);
      }
      return isApproved;
    }()
  }, {
    key: "owner",
    value: function () {
      var _owner = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var ownerAddress, token, tokenAddress, supportedInterface;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              token = options.token;
              tokenAddress = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(token === null || token === void 0 ? void 0 : token.address);
              _context3.t0 = tokenAddress;
              _context3.next = _context3.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).nft.cryptoPunks.address ? 6 : 10;
              break;
            case 6:
              _context3.next = 8;
              return this.cryptoPunks.ownerOf({
                token: token
              });
            case 8:
              ownerAddress = _context3.sent;
              return _context3.abrupt("break", 21);
            case 10:
              _context3.next = 12;
              return (0, _classPrivateFieldGet2["default"])(this, _utils).getSupportedInterface(options);
            case 12:
              supportedInterface = _context3.sent;
              _context3.t1 = true;
              _context3.next = _context3.t1 === supportedInterface.isERC721 ? 16 : 20;
              break;
            case 16:
              _context3.next = 18;
              return this.erc721.ownerOf(_objectSpread(_objectSpread({}, options), {}, {
                rethrow: true
              }));
            case 18:
              ownerAddress = _context3.sent;
              return _context3.abrupt("break", 21);
            case 20:
              throw 'specified contract is not supported';
            case 21:
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                address: ownerAddress
              }));
            case 24:
              _context3.prev = 24;
              _context3.t2 = _context3["catch"](0);
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context3.t2));
            case 27:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 24]]);
      }));
      function owner(_x3) {
        return _owner.apply(this, arguments);
      }
      return owner;
    }()
  }, {
    key: "isOwner",
    value: function () {
      var _isOwner = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var _options$account2, _options$token3, _options$account3, balance, ownerAddress, result, tokenAddress, accountAddress, supportedInterface;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              if (!(options !== null && options !== void 0 && (_options$account2 = options.account) !== null && _options$account2 !== void 0 && _options$account2.address)) {
                (0, _classPrivateFieldGet2["default"])(this, _assertion).hasAddress('Account address required, please provide a value in options.account.address or on sdk initialization.');
              }
              tokenAddress = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(options === null || options === void 0 ? void 0 : (_options$token3 = options.token) === null || _options$token3 === void 0 ? void 0 : _options$token3.address);
              accountAddress = options !== null && options !== void 0 && (_options$account3 = options.account) !== null && _options$account3 !== void 0 && _options$account3.address ? (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(options.account.address) : (0, _classPrivateFieldGet2["default"])(this, _account).getAddress();
              _context4.t0 = tokenAddress;
              _context4.next = _context4.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).nft.cryptoPunks.address ? 7 : 12;
              break;
            case 7:
              _context4.next = 9;
              return this.cryptoPunks.ownerOf(options);
            case 9:
              ownerAddress = _context4.sent;
              result = ownerAddress === accountAddress;
              return _context4.abrupt("break", 29);
            case 12:
              _context4.next = 14;
              return (0, _classPrivateFieldGet2["default"])(this, _utils).getSupportedInterface(options);
            case 14:
              supportedInterface = _context4.sent;
              _context4.t1 = true;
              _context4.next = _context4.t1 === supportedInterface.isERC1155 ? 18 : _context4.t1 === supportedInterface.isERC721 ? 23 : 28;
              break;
            case 18:
              _context4.next = 20;
              return this.erc1155.balanceOf(options);
            case 20:
              balance = _context4.sent;
              result = balance > 0;
              return _context4.abrupt("break", 29);
            case 23:
              _context4.next = 25;
              return this.erc721.ownerOf(_objectSpread(_objectSpread({}, options), {}, {
                rethrow: true
              }));
            case 25:
              ownerAddress = _context4.sent;
              result = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(ownerAddress) === accountAddress;
              return _context4.abrupt("break", 29);
            case 28:
              throw 'specified contract is not supported';
            case 29:
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                result: result
              }));
            case 32:
              _context4.prev = 32;
              _context4.t2 = _context4["catch"](0);
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context4.t2));
            case 35:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 32]]);
      }));
      function isOwner(_x4) {
        return _isOwner.apply(this, arguments);
      }
      return isOwner;
    }()
  }, {
    key: "balance",
    value: function () {
      var _balance = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(options) {
        var balance, supportedInterface;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return (0, _classPrivateFieldGet2["default"])(this, _utils).getSupportedInterface(options);
            case 3:
              supportedInterface = _context5.sent;
              _context5.t0 = true;
              _context5.next = _context5.t0 === supportedInterface.isERC1155 ? 7 : 11;
              break;
            case 7:
              _context5.next = 9;
              return this.erc1155.balanceOf(options);
            case 9:
              balance = _context5.sent;
              return _context5.abrupt("break", 12);
            case 11:
              throw 'specified contract is not supported';
            case 12:
              return _context5.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                result: balance
              }));
            case 15:
              _context5.prev = 15;
              _context5.t1 = _context5["catch"](0);
              return _context5.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context5.t1));
            case 18:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 15]]);
      }));
      function balance(_x5) {
        return _balance.apply(this, arguments);
      }
      return balance;
    }()
  }]);
  return Nft;
}();
exports["default"] = Nft;