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
var _account = /*#__PURE__*/new WeakMap();
var _ethers = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var OffersSignatures = /*#__PURE__*/function () {
  function OffersSignatures() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, OffersSignatures);
    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
  }
  (0, _createClass2["default"])(OffersSignatures, [{
    key: "getAssetOfferSignature",
    value: function () {
      var _getAssetOfferSignature = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var signature;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              signature = (0, _classPrivateFieldGet2["default"])(this, _account).sign((0, _classPrivateFieldGet2["default"])(this, _ethers).utils.arrayify((0, _classPrivateFieldGet2["default"])(this, _ethers).utils.solidityKeccak256(['address', 'uint256', 'uint256', 'address', 'uint256', 'uint32', 'bool', 'uint256', 'address', 'uint256', 'uint256', 'bytes32', 'uint256'], [options.offer.terms.loan.currency, options.offer.terms.loan.principal, options.offer.terms.loan.repayment, options.offer.nft.address, options.offer.nft.id, options.offer.terms.loan.duration, options.offer.terms.loan.interest.prorated, options.offer.terms.loan.origination, (0, _classPrivateFieldGet2["default"])(this, _account).getAddress(), options.offer.lender.nonce, options.offer.terms.loan.expiry, (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.formatBytes32String(options.offer.type), (0, _classPrivateFieldGet2["default"])(this, _config).chainId])));
              return _context.abrupt("return", signature);
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getAssetOfferSignature(_x) {
        return _getAssetOfferSignature.apply(this, arguments);
      }
      return getAssetOfferSignature;
    }()
  }, {
    key: "getCollectionOfferSignature",
    value: function () {
      var _getCollectionOfferSignature = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.getAssetOfferSignature(options));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function getCollectionOfferSignature(_x2) {
        return _getCollectionOfferSignature.apply(this, arguments);
      }
      return getCollectionOfferSignature;
    }()
  }, {
    key: "getCollectionRangeOfferSignature",
    value: function () {
      var _getCollectionRangeOfferSignature = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var signature;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              signature = (0, _classPrivateFieldGet2["default"])(this, _account).sign((0, _classPrivateFieldGet2["default"])(this, _ethers).utils.arrayify((0, _classPrivateFieldGet2["default"])(this, _ethers).utils.solidityKeccak256(['address', 'uint256', 'uint256', 'address', 'uint256', 'uint32', 'bool', 'uint256', 'uint256', 'uint256', 'address', 'uint256', 'uint256', 'bytes32', 'uint256'], [options.offer.terms.loan.currency, options.offer.terms.loan.principal, options.offer.terms.loan.repayment, options.offer.nft.address, options.offer.nft.id, options.offer.terms.loan.duration, options.offer.terms.loan.interest.prorated, options.offer.terms.loan.origination, options.offer.nft.ids.from, options.offer.nft.ids.to, (0, _classPrivateFieldGet2["default"])(this, _account).getAddress(), options.offer.lender.nonce, options.offer.terms.loan.expiry, (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.formatBytes32String(options.offer.type), (0, _classPrivateFieldGet2["default"])(this, _config).chainId])));
              return _context3.abrupt("return", signature);
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getCollectionRangeOfferSignature(_x3) {
        return _getCollectionRangeOfferSignature.apply(this, arguments);
      }
      return getCollectionRangeOfferSignature;
    }()
  }]);
  return OffersSignatures;
}();
var _default = OffersSignatures;
exports["default"] = _default;