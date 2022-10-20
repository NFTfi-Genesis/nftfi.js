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

var _BN = /*#__PURE__*/new WeakMap();

var _Number = /*#__PURE__*/new WeakMap();

var _utils = /*#__PURE__*/new WeakMap();

var _signatures = /*#__PURE__*/new WeakMap();

var _config = /*#__PURE__*/new WeakMap();

var _account = /*#__PURE__*/new WeakMap();

var OffersHelper = /*#__PURE__*/function () {
  function OffersHelper() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, OffersHelper);

    _classPrivateFieldInitSpec(this, _BN, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _Number, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _utils, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _signatures, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });

    (0, _classPrivateFieldSet2["default"])(this, _BN, options === null || options === void 0 ? void 0 : options.BN);
    (0, _classPrivateFieldSet2["default"])(this, _Number, options === null || options === void 0 ? void 0 : options.Number);
    (0, _classPrivateFieldSet2["default"])(this, _utils, options === null || options === void 0 ? void 0 : options.utils);
    (0, _classPrivateFieldSet2["default"])(this, _signatures, options === null || options === void 0 ? void 0 : options.offersSignatures);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
  }

  (0, _createClass2["default"])(OffersHelper, [{
    key: "constructV2Offer",
    value: function () {
      var _constructV2Offer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _options$terms;

        var repayment, principal, loanInterestRateForDurationInBasisPoints, lenderNonce, expiry, offer;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                repayment = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.repayment).toLocaleString('fullwide', {
                  useGrouping: false
                });
                principal = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.principal).toLocaleString('fullwide', {
                  useGrouping: false
                });
                loanInterestRateForDurationInBasisPoints = 0;
                lenderNonce = (0, _classPrivateFieldGet2["default"])(this, _utils).getNonce();
                expiry = (0, _classPrivateFieldGet2["default"])(this, _utils).getExpiry(options === null || options === void 0 ? void 0 : (_options$terms = options.terms) === null || _options$terms === void 0 ? void 0 : _options$terms.expiry);
                offer = {
                  nft: {
                    id: options.nft.id,
                    address: options.nft.address
                  },
                  lender: {
                    address: (0, _classPrivateFieldGet2["default"])(this, _account).getAddress(),
                    nonce: lenderNonce
                  },
                  borrower: {
                    address: options.borrower.address
                  },
                  referrer: {
                    address: '0x0000000000000000000000000000000000000000'
                  },
                  terms: {
                    loan: {
                      duration: options.terms.duration,
                      repayment: repayment,
                      principal: principal,
                      currency: options.terms.currency,
                      expiry: expiry,
                      interest: {
                        prorated: false,
                        bps: loanInterestRateForDurationInBasisPoints
                      }
                    }
                  },
                  nftfi: {
                    contract: {
                      name: options.nftfi.contract.name
                    },
                    fee: {
                      bps: (0, _classPrivateFieldGet2["default"])(this, _config).loan.adminFeeInBasisPoints
                    }
                  }
                };
                _context.next = 8;
                return (0, _classPrivateFieldGet2["default"])(this, _signatures).getV2OfferSignature(_objectSpread(_objectSpread({}, options), {}, {
                  offer: offer
                }));

              case 8:
                offer['signature'] = _context.sent;
                return _context.abrupt("return", offer);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function constructV2Offer(_x) {
        return _constructV2Offer.apply(this, arguments);
      }

      return constructV2Offer;
    }()
  }]);
  return OffersHelper;
}();

var _default = OffersHelper;
exports["default"] = _default;