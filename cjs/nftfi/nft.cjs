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
var _result = /*#__PURE__*/new WeakMap();
var _erc = /*#__PURE__*/new WeakMap();
var _nftPunk = /*#__PURE__*/new WeakMap();
var _ethers = /*#__PURE__*/new WeakMap();
var Nft = /*#__PURE__*/function () {
  function Nft(options) {
    var _options$nft;
    (0, _classCallCheck2["default"])(this, Nft);
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _erc, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _nftPunk, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    (0, _classPrivateFieldSet2["default"])(this, _erc, options === null || options === void 0 ? void 0 : options.erc721);
    (0, _classPrivateFieldSet2["default"])(this, _nftPunk, options === null || options === void 0 ? void 0 : (_options$nft = options.nft) === null || _options$nft === void 0 ? void 0 : _options$nft.punk);
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
  }
  (0, _createClass2["default"])(Nft, [{
    key: "approve",
    value: function () {
      var _approve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _options$token;
        var success, tokenAddress;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              success = false;
              tokenAddress = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(options === null || options === void 0 ? void 0 : (_options$token = options.token) === null || _options$token === void 0 ? void 0 : _options$token.address);
              _context.t0 = tokenAddress;
              _context.next = _context.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).nft.punk.address ? 5 : 9;
              break;
            case 5:
              _context.next = 7;
              return (0, _classPrivateFieldGet2["default"])(this, _nftPunk).approve(options);
            case 7:
              success = _context.sent;
              return _context.abrupt("break", 13);
            case 9:
              _context.next = 11;
              return (0, _classPrivateFieldGet2["default"])(this, _erc).setApprovalForAll(options);
            case 11:
              success = _context.sent;
              return _context.abrupt("break", 13);
            case 13:
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                success: success
              }));
            case 14:
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
        var _options$token2;
        var approved, tokenAddress;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              approved = false;
              tokenAddress = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(options === null || options === void 0 ? void 0 : (_options$token2 = options.token) === null || _options$token2 === void 0 ? void 0 : _options$token2.address);
              _context2.t0 = tokenAddress;
              _context2.next = _context2.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).nft.punk.address ? 5 : 9;
              break;
            case 5:
              _context2.next = 7;
              return (0, _classPrivateFieldGet2["default"])(this, _nftPunk).isApproved(options);
            case 7:
              approved = _context2.sent;
              return _context2.abrupt("break", 13);
            case 9:
              _context2.next = 11;
              return (0, _classPrivateFieldGet2["default"])(this, _erc).isApprovedForAll(options);
            case 11:
              approved = _context2.sent;
              return _context2.abrupt("break", 13);
            case 13:
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                approved: approved
              }));
            case 14:
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
        var token, ownerAddress, tokenAddress;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              token = options.token;
              tokenAddress = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.getAddress(token === null || token === void 0 ? void 0 : token.address);
              _context3.t0 = tokenAddress;
              _context3.next = _context3.t0 === (0, _classPrivateFieldGet2["default"])(this, _config).nft.punk.address ? 5 : 9;
              break;
            case 5:
              _context3.next = 7;
              return (0, _classPrivateFieldGet2["default"])(this, _nftPunk).ownerOf({
                token: token
              });
            case 7:
              ownerAddress = _context3.sent;
              return _context3.abrupt("break", 13);
            case 9:
              _context3.next = 11;
              return (0, _classPrivateFieldGet2["default"])(this, _erc).ownerOf({
                token: token
              });
            case 11:
              ownerAddress = _context3.sent;
              return _context3.abrupt("break", 13);
            case 13:
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                address: ownerAddress
              }));
            case 14:
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
  return Nft;
}();
exports["default"] = Nft;