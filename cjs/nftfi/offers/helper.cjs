"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
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
    key: "_addCollectionAddress",
    value: function _addCollectionAddress(options, params) {
      var _options$filters, _options$filters$nft;
      if (options !== null && options !== void 0 && (_options$filters = options.filters) !== null && _options$filters !== void 0 && (_options$filters$nft = _options$filters.nft) !== null && _options$filters$nft !== void 0 && _options$filters$nft.address) {
        return _objectSpread(_objectSpread({}, params), {}, {
          nftAddress: options.filters.nft.address
        });
      }
      return params;
    }
  }, {
    key: "_addNft",
    value: function _addNft(options, params) {
      var _options$filters2, _options$filters2$nft, _options$filters3, _options$filters3$nft;
      if (options !== null && options !== void 0 && (_options$filters2 = options.filters) !== null && _options$filters2 !== void 0 && (_options$filters2$nft = _options$filters2.nft) !== null && _options$filters2$nft !== void 0 && _options$filters2$nft.address && options !== null && options !== void 0 && (_options$filters3 = options.filters) !== null && _options$filters3 !== void 0 && (_options$filters3$nft = _options$filters3.nft) !== null && _options$filters3$nft !== void 0 && _options$filters3$nft.id) {
        return _objectSpread(_objectSpread({}, params), {}, {
          nftAddress: options.filters.nft.address,
          nftId: options.filters.nft.id
        });
      }
      return params;
    }
  }, {
    key: "_addLender",
    value: function _addLender(options, params) {
      var _options$filters4, _options$filters4$len, _options$filters4$len2, _options$filters6, _options$filters6$len, _options$filters6$len2;
      // you can eq or ne but not both, should we allow both ? not needed now let's not overthink ?
      if (!(options !== null && options !== void 0 && options.filters)) {
        params = {
          lenderAddress: (0, _classPrivateFieldGet2["default"])(this, _account).getAddress()
        };
      }
      if (options !== null && options !== void 0 && (_options$filters4 = options.filters) !== null && _options$filters4 !== void 0 && (_options$filters4$len = _options$filters4.lender) !== null && _options$filters4$len !== void 0 && (_options$filters4$len2 = _options$filters4$len.address) !== null && _options$filters4$len2 !== void 0 && _options$filters4$len2.eq) {
        var _options$filters5, _options$filters5$len, _options$filters5$len2;
        return _objectSpread(_objectSpread({}, params), {}, {
          lenderAddress: options === null || options === void 0 ? void 0 : (_options$filters5 = options.filters) === null || _options$filters5 === void 0 ? void 0 : (_options$filters5$len = _options$filters5.lender) === null || _options$filters5$len === void 0 ? void 0 : (_options$filters5$len2 = _options$filters5$len.address) === null || _options$filters5$len2 === void 0 ? void 0 : _options$filters5$len2.eq
        });
      }
      if (options !== null && options !== void 0 && (_options$filters6 = options.filters) !== null && _options$filters6 !== void 0 && (_options$filters6$len = _options$filters6.lender) !== null && _options$filters6$len !== void 0 && (_options$filters6$len2 = _options$filters6$len.address) !== null && _options$filters6$len2 !== void 0 && _options$filters6$len2.ne) {
        var _options$filters7, _options$filters7$len, _options$filters7$len2;
        return _objectSpread(_objectSpread({}, params), {}, {
          lenderAddressNe: options === null || options === void 0 ? void 0 : (_options$filters7 = options.filters) === null || _options$filters7 === void 0 ? void 0 : (_options$filters7$len = _options$filters7.lender) === null || _options$filters7$len === void 0 ? void 0 : (_options$filters7$len2 = _options$filters7$len.address) === null || _options$filters7$len2 === void 0 ? void 0 : _options$filters7$len2.ne
        });
      }
      return params;
    }
  }, {
    key: "_addContract",
    value: function _addContract(options, params) {
      var _options$filters8, _options$filters8$nft, _options$filters8$nft2;
      if (options !== null && options !== void 0 && (_options$filters8 = options.filters) !== null && _options$filters8 !== void 0 && (_options$filters8$nft = _options$filters8.nftfi) !== null && _options$filters8$nft !== void 0 && (_options$filters8$nft2 = _options$filters8$nft.contract) !== null && _options$filters8$nft2 !== void 0 && _options$filters8$nft2.name) {
        var _options$filters9, _options$filters9$nft, _options$filters9$nft2;
        return _objectSpread(_objectSpread({}, params), {}, {
          contractName: options === null || options === void 0 ? void 0 : (_options$filters9 = options.filters) === null || _options$filters9 === void 0 ? void 0 : (_options$filters9$nft = _options$filters9.nftfi) === null || _options$filters9$nft === void 0 ? void 0 : (_options$filters9$nft2 = _options$filters9$nft.contract) === null || _options$filters9$nft2 === void 0 ? void 0 : _options$filters9$nft2.name
        });
      }
      return params;
    }
  }, {
    key: "_addPagination",
    value: function _addPagination(options, params) {
      if (options !== null && options !== void 0 && options.pagination) {
        var _options$pagination, _options$pagination2, _options$pagination3, _options$pagination4;
        var limit = (options === null || options === void 0 ? void 0 : (_options$pagination = options.pagination) === null || _options$pagination === void 0 ? void 0 : _options$pagination.limit) || (0, _classPrivateFieldGet2["default"])(this, _config).pagination.limit;
        var page = (options === null || options === void 0 ? void 0 : (_options$pagination2 = options.pagination) === null || _options$pagination2 === void 0 ? void 0 : _options$pagination2.page) || (0, _classPrivateFieldGet2["default"])(this, _config).pagination.page;
        var sort = (options === null || options === void 0 ? void 0 : (_options$pagination3 = options.pagination) === null || _options$pagination3 === void 0 ? void 0 : _options$pagination3.sort) || null;
        var direction = (options === null || options === void 0 ? void 0 : (_options$pagination4 = options.pagination) === null || _options$pagination4 === void 0 ? void 0 : _options$pagination4.direction) || null;
        if (sort && direction) {
          return _objectSpread(_objectSpread({}, params), {}, {
            page: page,
            limit: limit,
            sort: sort,
            direction: direction
          });
        }
        return _objectSpread(_objectSpread({}, params), {}, {
          page: page,
          limit: limit
        });
      }
      return params;
    }
  }, {
    key: "getParams",
    value: function getParams(options) {
      var params = {};
      params = this._addCollectionAddress(options, params);
      params = this._addNft(options, params);
      params = this._addLender(options, params);
      params = this._addContract(options, params);
      params = this._addPagination(options, params);
      return params;
    }
  }, {
    key: "constructV2Offer",
    value: function () {
      var _constructV2Offer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _options$terms;
        var repayment, principal, loanInterestRateForDurationInBasisPoints, lenderNonce, expiry, offer;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
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
                },
                metadata: options.metadata
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
        }, _callee, this);
      }));
      function constructV2Offer(_x) {
        return _constructV2Offer.apply(this, arguments);
      }
      return constructV2Offer;
    }()
  }, {
    key: "constructV2FixedCollectionOffer",
    value: function () {
      var _constructV2FixedCollectionOffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var _options$terms2, _options$terms2$expir;
        var repayment, principal, loanInterestRateForDurationInBasisPoints, lenderNonce, expiry, nftId, offer;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              repayment = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.repayment).toLocaleString('fullwide', {
                useGrouping: false
              });
              principal = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.principal).toLocaleString('fullwide', {
                useGrouping: false
              });
              loanInterestRateForDurationInBasisPoints = 0;
              lenderNonce = (0, _classPrivateFieldGet2["default"])(this, _utils).getNonce();
              expiry = (0, _classPrivateFieldGet2["default"])(this, _utils).getExpiry(options === null || options === void 0 ? void 0 : (_options$terms2 = options.terms) === null || _options$terms2 === void 0 ? void 0 : (_options$terms2$expir = _options$terms2.expiry) === null || _options$terms2$expir === void 0 ? void 0 : _options$terms2$expir.seconds);
              nftId = 0;
              offer = {
                nft: {
                  id: nftId,
                  address: options.nft.address
                },
                lender: {
                  address: (0, _classPrivateFieldGet2["default"])(this, _account).getAddress(),
                  nonce: lenderNonce
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
                },
                metadata: options.metadata
              };
              _context2.next = 9;
              return (0, _classPrivateFieldGet2["default"])(this, _signatures).getV2FixedCollectionOfferSignature(_objectSpread(_objectSpread({}, options), {}, {
                offer: offer
              }));
            case 9:
              offer.signature = _context2.sent;
              return _context2.abrupt("return", offer);
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function constructV2FixedCollectionOffer(_x2) {
        return _constructV2FixedCollectionOffer.apply(this, arguments);
      }
      return constructV2FixedCollectionOffer;
    }()
  }]);
  return OffersHelper;
}();
var _default = OffersHelper;
exports["default"] = _default;