"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
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
var _assertion = /*#__PURE__*/new WeakMap();
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
    _classPrivateFieldInitSpec(this, _assertion, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _BN, options === null || options === void 0 ? void 0 : options.BN);
    (0, _classPrivateFieldSet2["default"])(this, _Number, options === null || options === void 0 ? void 0 : options.Number);
    (0, _classPrivateFieldSet2["default"])(this, _utils, options === null || options === void 0 ? void 0 : options.utils);
    (0, _classPrivateFieldSet2["default"])(this, _signatures, options === null || options === void 0 ? void 0 : options.offersSignatures);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _assertion, options === null || options === void 0 ? void 0 : options.assertion);
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
      var _options$filters4, _options$filters4$len, _options$filters4$len2, _options$filters5, _options$filters5$bor, _options$filters5$bor2, _options$filters6, _options$filters6$nft, _options$filters7, _options$filters7$len, _options$filters7$len2, _options$filters9, _options$filters9$len, _options$filters9$len2;
      // if no lender/borrower/collection address is provided, we default to the account address
      if (!(options !== null && options !== void 0 && (_options$filters4 = options.filters) !== null && _options$filters4 !== void 0 && (_options$filters4$len = _options$filters4.lender) !== null && _options$filters4$len !== void 0 && (_options$filters4$len2 = _options$filters4$len.address) !== null && _options$filters4$len2 !== void 0 && _options$filters4$len2.eq) && !(options !== null && options !== void 0 && (_options$filters5 = options.filters) !== null && _options$filters5 !== void 0 && (_options$filters5$bor = _options$filters5.borrower) !== null && _options$filters5$bor !== void 0 && (_options$filters5$bor2 = _options$filters5$bor.address) !== null && _options$filters5$bor2 !== void 0 && _options$filters5$bor2.eq) && !(options !== null && options !== void 0 && (_options$filters6 = options.filters) !== null && _options$filters6 !== void 0 && (_options$filters6$nft = _options$filters6.nft) !== null && _options$filters6$nft !== void 0 && _options$filters6$nft.address)) {
        (0, _classPrivateFieldGet2["default"])(this, _assertion).hasAddress('Please provide at least a filter from filters.lender.address.eq, filters.borrower.address.eq or filters.nft.address.');
        params = {
          lenderAddress: (0, _classPrivateFieldGet2["default"])(this, _account).getAddress()
        };
      }
      if (options !== null && options !== void 0 && (_options$filters7 = options.filters) !== null && _options$filters7 !== void 0 && (_options$filters7$len = _options$filters7.lender) !== null && _options$filters7$len !== void 0 && (_options$filters7$len2 = _options$filters7$len.address) !== null && _options$filters7$len2 !== void 0 && _options$filters7$len2.eq) {
        var _options$filters8, _options$filters8$len, _options$filters8$len2;
        return _objectSpread(_objectSpread({}, params), {}, {
          lenderAddress: options === null || options === void 0 ? void 0 : (_options$filters8 = options.filters) === null || _options$filters8 === void 0 ? void 0 : (_options$filters8$len = _options$filters8.lender) === null || _options$filters8$len === void 0 ? void 0 : (_options$filters8$len2 = _options$filters8$len.address) === null || _options$filters8$len2 === void 0 ? void 0 : _options$filters8$len2.eq
        });
      }
      if (options !== null && options !== void 0 && (_options$filters9 = options.filters) !== null && _options$filters9 !== void 0 && (_options$filters9$len = _options$filters9.lender) !== null && _options$filters9$len !== void 0 && (_options$filters9$len2 = _options$filters9$len.address) !== null && _options$filters9$len2 !== void 0 && _options$filters9$len2.ne) {
        var _options$filters10, _options$filters10$le, _options$filters10$le2;
        return _objectSpread(_objectSpread({}, params), {}, {
          lenderAddressNe: options === null || options === void 0 ? void 0 : (_options$filters10 = options.filters) === null || _options$filters10 === void 0 ? void 0 : (_options$filters10$le = _options$filters10.lender) === null || _options$filters10$le === void 0 ? void 0 : (_options$filters10$le2 = _options$filters10$le.address) === null || _options$filters10$le2 === void 0 ? void 0 : _options$filters10$le2.ne
        });
      }
      return params;
    }
  }, {
    key: "_addLenderBalances",
    value: function _addLenderBalances(options, params) {
      var _options$lender;
      if (options !== null && options !== void 0 && (_options$lender = options.lender) !== null && _options$lender !== void 0 && _options$lender.balances) {
        var lenderBalances = Object.entries(options.lender.balances).map(function (_ref) {
          var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];
          return "".concat(key, ":").concat(value);
        }).join(',');
        return _objectSpread(_objectSpread({}, params), {}, {
          lenderBalances: lenderBalances
        });
      }
      return params;
    }
  }, {
    key: "_addBorrower",
    value: function _addBorrower(options, params) {
      var _options$filters11, _options$filters11$bo, _options$filters11$bo2;
      if (options !== null && options !== void 0 && (_options$filters11 = options.filters) !== null && _options$filters11 !== void 0 && (_options$filters11$bo = _options$filters11.borrower) !== null && _options$filters11$bo !== void 0 && (_options$filters11$bo2 = _options$filters11$bo.address) !== null && _options$filters11$bo2 !== void 0 && _options$filters11$bo2.eq) {
        return _objectSpread(_objectSpread({}, params), {}, {
          borrowerAddress: options.filters.borrower.address.eq
        });
      }
      return params;
    }
  }, {
    key: "_addContract",
    value: function _addContract(options, params) {
      var _options$filters12, _options$filters12$nf, _options$filters12$nf2, _options$filters12$nf3, _options$filters13, _options$filters13$nf, _options$filters13$nf2;
      if (options !== null && options !== void 0 && (_options$filters12 = options.filters) !== null && _options$filters12 !== void 0 && (_options$filters12$nf = _options$filters12.nftfi) !== null && _options$filters12$nf !== void 0 && (_options$filters12$nf2 = _options$filters12$nf.contract) !== null && _options$filters12$nf2 !== void 0 && (_options$filters12$nf3 = _options$filters12$nf2.name) !== null && _options$filters12$nf3 !== void 0 && _options$filters12$nf3["in"]) {
        return _objectSpread(_objectSpread({}, params), {}, {
          contractNameIn: options.filters.nftfi.contract.name["in"].join(',')
        });
      }
      if (options !== null && options !== void 0 && (_options$filters13 = options.filters) !== null && _options$filters13 !== void 0 && (_options$filters13$nf = _options$filters13.nftfi) !== null && _options$filters13$nf !== void 0 && (_options$filters13$nf2 = _options$filters13$nf.contract) !== null && _options$filters13$nf2 !== void 0 && _options$filters13$nf2.name) {
        var _options$filters14, _options$filters14$nf, _options$filters14$nf2;
        return _objectSpread(_objectSpread({}, params), {}, {
          contractName: options === null || options === void 0 ? void 0 : (_options$filters14 = options.filters) === null || _options$filters14 === void 0 ? void 0 : (_options$filters14$nf = _options$filters14.nftfi) === null || _options$filters14$nf === void 0 ? void 0 : (_options$filters14$nf2 = _options$filters14$nf.contract) === null || _options$filters14$nf2 === void 0 ? void 0 : _options$filters14$nf2.name
        });
      }
      return params;
    }
  }, {
    key: "_addFilters",
    value: function _addFilters(options, params) {
      var _options$filters15, _options$filters15$lo, _options$filters15$lo2, _options$filters17, _options$filters17$lo, _options$filters17$lo2, _options$filters19, _options$filters19$lo, _options$filters19$lo2, _options$filters21, _options$filters21$lo, _options$filters21$lo2, _options$filters23, _options$filters23$lo, _options$filters23$lo2, _options$filters23$lo3, _options$filters25, _options$filters25$ty, _options$filters27, _options$filters29, _options$filters29$in;
      if (options !== null && options !== void 0 && (_options$filters15 = options.filters) !== null && _options$filters15 !== void 0 && (_options$filters15$lo = _options$filters15.loan) !== null && _options$filters15$lo !== void 0 && (_options$filters15$lo2 = _options$filters15$lo.apr) !== null && _options$filters15$lo2 !== void 0 && _options$filters15$lo2.lte) {
        var _options$filters16, _options$filters16$lo, _options$filters16$lo2;
        params = _objectSpread(_objectSpread({}, params), {}, {
          termsAprLte: options === null || options === void 0 ? void 0 : (_options$filters16 = options.filters) === null || _options$filters16 === void 0 ? void 0 : (_options$filters16$lo = _options$filters16.loan) === null || _options$filters16$lo === void 0 ? void 0 : (_options$filters16$lo2 = _options$filters16$lo.apr) === null || _options$filters16$lo2 === void 0 ? void 0 : _options$filters16$lo2.lte
        });
      }
      if (options !== null && options !== void 0 && (_options$filters17 = options.filters) !== null && _options$filters17 !== void 0 && (_options$filters17$lo = _options$filters17.loan) !== null && _options$filters17$lo !== void 0 && (_options$filters17$lo2 = _options$filters17$lo.effectiveApr) !== null && _options$filters17$lo2 !== void 0 && _options$filters17$lo2.lte) {
        var _options$filters18, _options$filters18$lo, _options$filters18$lo2;
        params = _objectSpread(_objectSpread({}, params), {}, {
          termsEffectiveAprLte: options === null || options === void 0 ? void 0 : (_options$filters18 = options.filters) === null || _options$filters18 === void 0 ? void 0 : (_options$filters18$lo = _options$filters18.loan) === null || _options$filters18$lo === void 0 ? void 0 : (_options$filters18$lo2 = _options$filters18$lo.effectiveApr) === null || _options$filters18$lo2 === void 0 ? void 0 : _options$filters18$lo2.lte
        });
      }
      if (options !== null && options !== void 0 && (_options$filters19 = options.filters) !== null && _options$filters19 !== void 0 && (_options$filters19$lo = _options$filters19.loan) !== null && _options$filters19$lo !== void 0 && (_options$filters19$lo2 = _options$filters19$lo.duration) !== null && _options$filters19$lo2 !== void 0 && _options$filters19$lo2.eq) {
        var _options$filters20, _options$filters20$lo, _options$filters20$lo2;
        params = _objectSpread(_objectSpread({}, params), {}, {
          termsDuration: options === null || options === void 0 ? void 0 : (_options$filters20 = options.filters) === null || _options$filters20 === void 0 ? void 0 : (_options$filters20$lo = _options$filters20.loan) === null || _options$filters20$lo === void 0 ? void 0 : (_options$filters20$lo2 = _options$filters20$lo.duration) === null || _options$filters20$lo2 === void 0 ? void 0 : _options$filters20$lo2.eq
        });
      }
      if (options !== null && options !== void 0 && (_options$filters21 = options.filters) !== null && _options$filters21 !== void 0 && (_options$filters21$lo = _options$filters21.loan) !== null && _options$filters21$lo !== void 0 && (_options$filters21$lo2 = _options$filters21$lo.duration) !== null && _options$filters21$lo2 !== void 0 && _options$filters21$lo2.nin) {
        var _options$filters22, _options$filters22$lo, _options$filters22$lo2, _options$filters22$lo3;
        params = _objectSpread(_objectSpread({}, params), {}, {
          termsDurationNin: options === null || options === void 0 ? void 0 : (_options$filters22 = options.filters) === null || _options$filters22 === void 0 ? void 0 : (_options$filters22$lo = _options$filters22.loan) === null || _options$filters22$lo === void 0 ? void 0 : (_options$filters22$lo2 = _options$filters22$lo.duration) === null || _options$filters22$lo2 === void 0 ? void 0 : (_options$filters22$lo3 = _options$filters22$lo2.nin) === null || _options$filters22$lo3 === void 0 ? void 0 : _options$filters22$lo3.join(',')
        });
      }
      if (options !== null && options !== void 0 && (_options$filters23 = options.filters) !== null && _options$filters23 !== void 0 && (_options$filters23$lo = _options$filters23.loan) !== null && _options$filters23$lo !== void 0 && (_options$filters23$lo2 = _options$filters23$lo.currency) !== null && _options$filters23$lo2 !== void 0 && (_options$filters23$lo3 = _options$filters23$lo2.address) !== null && _options$filters23$lo3 !== void 0 && _options$filters23$lo3.eq) {
        var _options$filters24, _options$filters24$lo, _options$filters24$lo2, _options$filters24$lo3;
        params = _objectSpread(_objectSpread({}, params), {}, {
          termsCurrencyAddress: options === null || options === void 0 ? void 0 : (_options$filters24 = options.filters) === null || _options$filters24 === void 0 ? void 0 : (_options$filters24$lo = _options$filters24.loan) === null || _options$filters24$lo === void 0 ? void 0 : (_options$filters24$lo2 = _options$filters24$lo.currency) === null || _options$filters24$lo2 === void 0 ? void 0 : (_options$filters24$lo3 = _options$filters24$lo2.address) === null || _options$filters24$lo3 === void 0 ? void 0 : _options$filters24$lo3.eq
        });
      }
      if (options !== null && options !== void 0 && (_options$filters25 = options.filters) !== null && _options$filters25 !== void 0 && (_options$filters25$ty = _options$filters25.type) !== null && _options$filters25$ty !== void 0 && _options$filters25$ty["in"]) {
        var _options$filters26, _options$filters26$ty;
        params = _objectSpread(_objectSpread({}, params), {}, {
          typeIn: options === null || options === void 0 ? void 0 : (_options$filters26 = options.filters) === null || _options$filters26 === void 0 ? void 0 : (_options$filters26$ty = _options$filters26.type) === null || _options$filters26$ty === void 0 ? void 0 : _options$filters26$ty["in"].join(',')
        });
      }
      if (typeof (options === null || options === void 0 ? void 0 : (_options$filters27 = options.filters) === null || _options$filters27 === void 0 ? void 0 : _options$filters27.type) === 'string') {
        var _options$filters28;
        params = _objectSpread(_objectSpread({}, params), {}, {
          type: options === null || options === void 0 ? void 0 : (_options$filters28 = options.filters) === null || _options$filters28 === void 0 ? void 0 : _options$filters28.type
        });
      }
      if (typeof (options === null || options === void 0 ? void 0 : (_options$filters29 = options.filters) === null || _options$filters29 === void 0 ? void 0 : (_options$filters29$in = _options$filters29.interest) === null || _options$filters29$in === void 0 ? void 0 : _options$filters29$in.prorated) === 'boolean') {
        var _options$filters30, _options$filters30$in;
        params = _objectSpread(_objectSpread({}, params), {}, {
          interestProrated: options === null || options === void 0 ? void 0 : (_options$filters30 = options.filters) === null || _options$filters30 === void 0 ? void 0 : (_options$filters30$in = _options$filters30.interest) === null || _options$filters30$in === void 0 ? void 0 : _options$filters30$in.prorated
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
    key: "_addCountGroup",
    value: function _addCountGroup(options, params) {
      if (options !== null && options !== void 0 && options.group) {
        return _objectSpread(_objectSpread({}, params), {}, {
          group: options.group
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
      params = this._addBorrower(options, params);
      params = this._addContract(options, params);
      params = this._addFilters(options, params);
      params = this._addPagination(options, params);
      params = this._addCountGroup(options, params);
      params = this._addLenderBalances(options, params);
      return params;
    }
  }, {
    key: "buildAssetOffer",
    value: function buildAssetOffer(options) {
      var _options$terms, _options$terms$expiry, _options$lenderNonce;
      var repayment = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.repayment).toLocaleString('fullwide', {
        useGrouping: false
      });
      var principal = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.principal).toLocaleString('fullwide', {
        useGrouping: false
      });
      var origination = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.origination).toLocaleString('fullwide', {
        useGrouping: false
      });
      var lenderNonce = (0, _classPrivateFieldGet2["default"])(this, _utils).getNonce();
      var expiry = (0, _classPrivateFieldGet2["default"])(this, _utils).getExpiry(options === null || options === void 0 ? void 0 : (_options$terms = options.terms) === null || _options$terms === void 0 ? void 0 : (_options$terms$expiry = _options$terms.expiry) === null || _options$terms$expiry === void 0 ? void 0 : _options$terms$expiry.seconds);
      var type = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.asset.value;
      var offer = {
        type: type,
        nft: {
          id: options.nft.id,
          address: options.nft.address
        },
        lender: {
          address: (0, _classPrivateFieldGet2["default"])(this, _account).getAddress(),
          nonce: (_options$lenderNonce = options.lenderNonce) !== null && _options$lenderNonce !== void 0 ? _options$lenderNonce : lenderNonce
        },
        borrower: {
          address: options.borrower.address
        },
        terms: {
          loan: {
            duration: options.terms.duration,
            repayment: repayment,
            principal: principal,
            origination: origination,
            currency: options.terms.currency,
            interest: {
              prorated: options.terms.interest.prorated
            },
            expiry: expiry
          }
        },
        metadata: options.metadata
      };
      return offer;
    }
  }, {
    key: "constructAssetOffer",
    value: function () {
      var _constructAssetOffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var offer;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              offer = this.buildAssetOffer(options);
              _context.next = 3;
              return (0, _classPrivateFieldGet2["default"])(this, _signatures).getAssetOfferSignature(_objectSpread(_objectSpread({}, options), {}, {
                offer: offer
              }));
            case 3:
              offer['signature'] = _context.sent;
              return _context.abrupt("return", _objectSpread(_objectSpread({}, offer), {}, {
                type: options.type
              }));
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function constructAssetOffer(_x) {
        return _constructAssetOffer.apply(this, arguments);
      }
      return constructAssetOffer;
    }()
  }, {
    key: "buildCollectionOffer",
    value: function buildCollectionOffer(options) {
      var _options$terms2, _options$terms2$expir, _options$nft, _options$lenderNonce2;
      var repayment = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.repayment).toLocaleString('fullwide', {
        useGrouping: false
      });
      var principal = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.principal).toLocaleString('fullwide', {
        useGrouping: false
      });
      var origination = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.origination).toLocaleString('fullwide', {
        useGrouping: false
      });
      var lenderNonce = (0, _classPrivateFieldGet2["default"])(this, _utils).getNonce();
      var expiry = (0, _classPrivateFieldGet2["default"])(this, _utils).getExpiry(options === null || options === void 0 ? void 0 : (_options$terms2 = options.terms) === null || _options$terms2 === void 0 ? void 0 : (_options$terms2$expir = _options$terms2.expiry) === null || _options$terms2$expir === void 0 ? void 0 : _options$terms2$expir.seconds);
      var nftId = 0;
      var type = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.type.collection.value;
      var offer = {
        type: type,
        nft: _objectSpread({
          id: nftId,
          address: options.nft.address
        }, ((_options$nft = options.nft) === null || _options$nft === void 0 ? void 0 : _options$nft.ids) && {
          ids: options.nft.ids
        }),
        lender: {
          address: (0, _classPrivateFieldGet2["default"])(this, _account).getAddress(),
          nonce: (_options$lenderNonce2 = options.lenderNonce) !== null && _options$lenderNonce2 !== void 0 ? _options$lenderNonce2 : lenderNonce
        },
        terms: {
          loan: {
            duration: options.terms.duration,
            repayment: repayment,
            principal: principal,
            origination: origination,
            currency: options.terms.currency,
            interest: {
              prorated: options.terms.interest.prorated
            },
            expiry: expiry
          }
        },
        metadata: options.metadata
      };
      return offer;
    }
  }, {
    key: "constructCollectionOffer",
    value: function () {
      var _constructCollectionOffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var offer, isCollectionRangeOffer;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              offer = this.buildCollectionOffer(options);
              isCollectionRangeOffer = 'ids' in options.nft;
              if (isCollectionRangeOffer) {
                _context2.next = 8;
                break;
              }
              _context2.next = 5;
              return (0, _classPrivateFieldGet2["default"])(this, _signatures).getCollectionOfferSignature(_objectSpread(_objectSpread({}, options), {}, {
                offer: offer
              }));
            case 5:
              offer['signature'] = _context2.sent;
              _context2.next = 11;
              break;
            case 8:
              _context2.next = 10;
              return (0, _classPrivateFieldGet2["default"])(this, _signatures).getCollectionRangeOfferSignature(_objectSpread(_objectSpread({}, options), {}, {
                offer: offer
              }));
            case 10:
              offer['signature'] = _context2.sent;
            case 11:
              return _context2.abrupt("return", _objectSpread(_objectSpread({}, offer), {}, {
                type: options.type
              }));
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function constructCollectionOffer(_x2) {
        return _constructCollectionOffer.apply(this, arguments);
      }
      return constructCollectionOffer;
    }()
  }, {
    key: "signV3RenegotiationOffer",
    value: function () {
      var _signV3RenegotiationOffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _classPrivateFieldGet2["default"])(this, _signatures).getV3RenegotiationOfferSignature(options);
            case 2:
              return _context3.abrupt("return", _context3.sent);
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function signV3RenegotiationOffer(_x3) {
        return _signV3RenegotiationOffer.apply(this, arguments);
      }
      return signV3RenegotiationOffer;
    }()
  }, {
    key: "signV23RenegotiationOffer",
    value: function () {
      var _signV23RenegotiationOffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _classPrivateFieldGet2["default"])(this, _signatures).getV23RenegotiationOfferSignature(options);
            case 2:
              return _context4.abrupt("return", _context4.sent);
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function signV23RenegotiationOffer(_x4) {
        return _signV23RenegotiationOffer.apply(this, arguments);
      }
      return signV23RenegotiationOffer;
    }()
  }]);
  return OffersHelper;
}();
var _default = OffersHelper;
exports["default"] = _default;