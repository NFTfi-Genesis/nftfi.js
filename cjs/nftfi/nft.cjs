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
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _config = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
var _ethers = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var _utils = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
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
    _classPrivateFieldInitSpec(this, _error, {
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
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    this.erc721 = options === null || options === void 0 ? void 0 : (_options$nft = options.nft) === null || _options$nft === void 0 ? void 0 : _options$nft.erc721;
    this.erc1155 = options === null || options === void 0 ? void 0 : (_options$nft2 = options.nft) === null || _options$nft2 === void 0 ? void 0 : _options$nft2.erc1155;
    this.cryptoPunks = options === null || options === void 0 ? void 0 : (_options$nft3 = options.nft) === null || _options$nft3 === void 0 ? void 0 : _options$nft3.cryptoPunks;
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet2["default"])(this, _utils, options === null || options === void 0 ? void 0 : options.utils);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
  }
  (0, _createClass2["default"])(Nft, [{
    key: "approve",
    value: function () {
      var _approve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _options$token;
        var success, tokenAddress, supportedInterface;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              success = false;
              tokenAddress = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(options === null || options === void 0 ? void 0 : (_options$token = options.token) === null || _options$token === void 0 ? void 0 : _options$token.address);
              _context.prev = 2;
              _context.t0 = tokenAddress;
              _context.next = _context.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).nft.cryptoPunks.address ? 6 : 10;
              break;
            case 6:
              _context.next = 8;
              return this.cryptoPunks.approve(options);
            case 8:
              success = _context.sent;
              return _context.abrupt("break", 25);
            case 10:
              _context.next = 12;
              return (0, _classPrivateFieldGet2["default"])(this, _utils).getSupportedInterface(options);
            case 12:
              supportedInterface = _context.sent;
              _context.t1 = true;
              _context.next = _context.t1 === supportedInterface.isERC1155 ? 16 : _context.t1 === supportedInterface.isERC721 ? 20 : 24;
              break;
            case 16:
              _context.next = 18;
              return this.erc1155.setApprovalForAll(options);
            case 18:
              success = _context.sent;
              return _context.abrupt("break", 25);
            case 20:
              _context.next = 22;
              return this.erc721.setApprovalForAll(options);
            case 22:
              success = _context.sent;
              return _context.abrupt("break", 25);
            case 24:
              throw 'specified contract is not supported';
            case 25:
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                success: success
              }));
            case 28:
              _context.prev = 28;
              _context.t2 = _context["catch"](2);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t2));
            case 31:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[2, 28]]);
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
        var _options$token2;
        var approved, tokenAddress, supportedInterface;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              approved = false;
              tokenAddress = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(options === null || options === void 0 ? void 0 : (_options$token2 = options.token) === null || _options$token2 === void 0 ? void 0 : _options$token2.address);
              _context2.prev = 2;
              _context2.t0 = tokenAddress;
              _context2.next = _context2.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).nft.cryptoPunks.address ? 6 : 10;
              break;
            case 6:
              _context2.next = 8;
              return this.cryptoPunks.isApproved(options);
            case 8:
              approved = _context2.sent;
              return _context2.abrupt("break", 25);
            case 10:
              _context2.next = 12;
              return (0, _classPrivateFieldGet2["default"])(this, _utils).getSupportedInterface(options);
            case 12:
              supportedInterface = _context2.sent;
              _context2.t1 = true;
              _context2.next = _context2.t1 === supportedInterface.isERC1155 ? 16 : _context2.t1 === supportedInterface.isERC721 ? 20 : 24;
              break;
            case 16:
              _context2.next = 18;
              return this.erc1155.isApprovedForAll(options);
            case 18:
              approved = _context2.sent;
              return _context2.abrupt("break", 25);
            case 20:
              _context2.next = 22;
              return this.erc721.isApprovedForAll(options);
            case 22:
              approved = _context2.sent;
              return _context2.abrupt("break", 25);
            case 24:
              throw 'specified contract is not supported';
            case 25:
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                approved: approved
              }));
            case 28:
              _context2.prev = 28;
              _context2.t2 = _context2["catch"](2);
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context2.t2));
            case 31:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[2, 28]]);
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
              token = options.token;
              tokenAddress = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(token === null || token === void 0 ? void 0 : token.address);
              _context3.prev = 2;
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
              return this.erc721.ownerOf({
                token: token
              });
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
              _context3.t2 = _context3["catch"](2);
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context3.t2));
            case 27:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[2, 24]]);
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
        var _options$token3, _options$account;
        var balance, ownerAddress, result, tokenAddress, accountAddress, supportedInterface;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              tokenAddress = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(options === null || options === void 0 ? void 0 : (_options$token3 = options.token) === null || _options$token3 === void 0 ? void 0 : _options$token3.address);
              accountAddress = options !== null && options !== void 0 && (_options$account = options.account) !== null && _options$account !== void 0 && _options$account.address ? (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(options.account.address) : (0, _classPrivateFieldGet2["default"])(this, _account).getAddress();
              _context4.prev = 2;
              _context4.t0 = tokenAddress;
              _context4.next = _context4.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).nft.cryptoPunks.address ? 6 : 11;
              break;
            case 6:
              _context4.next = 8;
              return this.cryptoPunks.ownerOf(options);
            case 8:
              ownerAddress = _context4.sent;
              result = ownerAddress === accountAddress;
              return _context4.abrupt("break", 28);
            case 11:
              _context4.next = 13;
              return (0, _classPrivateFieldGet2["default"])(this, _utils).getSupportedInterface(options);
            case 13:
              supportedInterface = _context4.sent;
              _context4.t1 = true;
              _context4.next = _context4.t1 === supportedInterface.isERC1155 ? 17 : _context4.t1 === supportedInterface.isERC721 ? 22 : 27;
              break;
            case 17:
              _context4.next = 19;
              return this.erc1155.balanceOf(options);
            case 19:
              balance = _context4.sent;
              result = balance > 0;
              return _context4.abrupt("break", 28);
            case 22:
              _context4.next = 24;
              return this.erc721.ownerOf(options);
            case 24:
              ownerAddress = _context4.sent;
              result = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(ownerAddress) === accountAddress;
              return _context4.abrupt("break", 28);
            case 27:
              throw 'specified contract is not supported';
            case 28:
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                result: result
              }));
            case 31:
              _context4.prev = 31;
              _context4.t2 = _context4["catch"](2);
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context4.t2));
            case 34:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[2, 31]]);
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