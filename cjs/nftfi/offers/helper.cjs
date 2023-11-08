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
      // you can eq or ne but not both, should we allow both ? not needed now let's not overthink ?
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

    // adding filtering by borrower address so the first condition in addLender holds and in dapp we'll probably refactor the
    // "offers received as a borrower" page and that'll be useful
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
      var _options$filters12, _options$filters12$nf, _options$filters12$nf2;
      if (options !== null && options !== void 0 && (_options$filters12 = options.filters) !== null && _options$filters12 !== void 0 && (_options$filters12$nf = _options$filters12.nftfi) !== null && _options$filters12$nf !== void 0 && (_options$filters12$nf2 = _options$filters12$nf.contract) !== null && _options$filters12$nf2 !== void 0 && _options$filters12$nf2.name) {
        var _options$filters13, _options$filters13$nf, _options$filters13$nf2;
        return _objectSpread(_objectSpread({}, params), {}, {
          contractName: options === null || options === void 0 ? void 0 : (_options$filters13 = options.filters) === null || _options$filters13 === void 0 ? void 0 : (_options$filters13$nf = _options$filters13.nftfi) === null || _options$filters13$nf === void 0 ? void 0 : (_options$filters13$nf2 = _options$filters13$nf.contract) === null || _options$filters13$nf2 === void 0 ? void 0 : _options$filters13$nf2.name
        });
      }
      return params;
    }
  }, {
    key: "_addFilters",
    value: function _addFilters(options, params) {
      var _options$filters14, _options$filters14$lo, _options$filters14$lo2, _options$filters16, _options$filters16$lo, _options$filters16$lo2, _options$filters18, _options$filters18$lo, _options$filters18$lo2, _options$filters20, _options$filters20$lo, _options$filters20$lo2, _options$filters20$lo3;
      if (options !== null && options !== void 0 && (_options$filters14 = options.filters) !== null && _options$filters14 !== void 0 && (_options$filters14$lo = _options$filters14.loan) !== null && _options$filters14$lo !== void 0 && (_options$filters14$lo2 = _options$filters14$lo.apr) !== null && _options$filters14$lo2 !== void 0 && _options$filters14$lo2.lte) {
        var _options$filters15, _options$filters15$lo, _options$filters15$lo2;
        params = _objectSpread(_objectSpread({}, params), {}, {
          termsAprLte: options === null || options === void 0 ? void 0 : (_options$filters15 = options.filters) === null || _options$filters15 === void 0 ? void 0 : (_options$filters15$lo = _options$filters15.loan) === null || _options$filters15$lo === void 0 ? void 0 : (_options$filters15$lo2 = _options$filters15$lo.apr) === null || _options$filters15$lo2 === void 0 ? void 0 : _options$filters15$lo2.lte
        });
      }
      if (options !== null && options !== void 0 && (_options$filters16 = options.filters) !== null && _options$filters16 !== void 0 && (_options$filters16$lo = _options$filters16.loan) !== null && _options$filters16$lo !== void 0 && (_options$filters16$lo2 = _options$filters16$lo.duration) !== null && _options$filters16$lo2 !== void 0 && _options$filters16$lo2.eq) {
        var _options$filters17, _options$filters17$lo, _options$filters17$lo2;
        params = _objectSpread(_objectSpread({}, params), {}, {
          termsDuration: options === null || options === void 0 ? void 0 : (_options$filters17 = options.filters) === null || _options$filters17 === void 0 ? void 0 : (_options$filters17$lo = _options$filters17.loan) === null || _options$filters17$lo === void 0 ? void 0 : (_options$filters17$lo2 = _options$filters17$lo.duration) === null || _options$filters17$lo2 === void 0 ? void 0 : _options$filters17$lo2.eq
        });
      }
      if (options !== null && options !== void 0 && (_options$filters18 = options.filters) !== null && _options$filters18 !== void 0 && (_options$filters18$lo = _options$filters18.loan) !== null && _options$filters18$lo !== void 0 && (_options$filters18$lo2 = _options$filters18$lo.duration) !== null && _options$filters18$lo2 !== void 0 && _options$filters18$lo2.nin) {
        var _options$filters19, _options$filters19$lo, _options$filters19$lo2, _options$filters19$lo3;
        params = _objectSpread(_objectSpread({}, params), {}, {
          termsDurationNin: options === null || options === void 0 ? void 0 : (_options$filters19 = options.filters) === null || _options$filters19 === void 0 ? void 0 : (_options$filters19$lo = _options$filters19.loan) === null || _options$filters19$lo === void 0 ? void 0 : (_options$filters19$lo2 = _options$filters19$lo.duration) === null || _options$filters19$lo2 === void 0 ? void 0 : (_options$filters19$lo3 = _options$filters19$lo2.nin) === null || _options$filters19$lo3 === void 0 ? void 0 : _options$filters19$lo3.join(',')
        });
      }
      if (options !== null && options !== void 0 && (_options$filters20 = options.filters) !== null && _options$filters20 !== void 0 && (_options$filters20$lo = _options$filters20.loan) !== null && _options$filters20$lo !== void 0 && (_options$filters20$lo2 = _options$filters20$lo.currency) !== null && _options$filters20$lo2 !== void 0 && (_options$filters20$lo3 = _options$filters20$lo2.address) !== null && _options$filters20$lo3 !== void 0 && _options$filters20$lo3.eq) {
        var _options$filters21, _options$filters21$lo, _options$filters21$lo2, _options$filters21$lo3;
        params = _objectSpread(_objectSpread({}, params), {}, {
          termsCurrencyAddress: options === null || options === void 0 ? void 0 : (_options$filters21 = options.filters) === null || _options$filters21 === void 0 ? void 0 : (_options$filters21$lo = _options$filters21.loan) === null || _options$filters21$lo === void 0 ? void 0 : (_options$filters21$lo2 = _options$filters21$lo.currency) === null || _options$filters21$lo2 === void 0 ? void 0 : (_options$filters21$lo3 = _options$filters21$lo2.address) === null || _options$filters21$lo3 === void 0 ? void 0 : _options$filters21$lo3.eq
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
      params = this._addBorrower(options, params);
      params = this._addContract(options, params);
      params = this._addFilters(options, params);
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
    key: "constructV2_3Offer",
    value: function () {
      var _constructV2_3Offer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var _options$terms2;
        var repayment, principal, loanInterestRateForDurationInBasisPoints, lenderNonce, expiry, offer;
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
              expiry = (0, _classPrivateFieldGet2["default"])(this, _utils).getExpiry(options === null || options === void 0 ? void 0 : (_options$terms2 = options.terms) === null || _options$terms2 === void 0 ? void 0 : _options$terms2.expiry);
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
              _context2.next = 8;
              return (0, _classPrivateFieldGet2["default"])(this, _signatures).getV2_3OfferSignature(_objectSpread(_objectSpread({}, options), {}, {
                offer: offer
              }));
            case 8:
              offer['signature'] = _context2.sent;
              return _context2.abrupt("return", offer);
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function constructV2_3Offer(_x2) {
        return _constructV2_3Offer.apply(this, arguments);
      }
      return constructV2_3Offer;
    }()
  }, {
    key: "constructV2FixedCollectionOffer",
    value: function () {
      var _constructV2FixedCollectionOffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var _options$terms3, _options$terms3$expir;
        var repayment, principal, loanInterestRateForDurationInBasisPoints, lenderNonce, expiry, nftId, offer;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              repayment = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.repayment).toLocaleString('fullwide', {
                useGrouping: false
              });
              principal = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.principal).toLocaleString('fullwide', {
                useGrouping: false
              });
              loanInterestRateForDurationInBasisPoints = 0;
              lenderNonce = (0, _classPrivateFieldGet2["default"])(this, _utils).getNonce();
              expiry = (0, _classPrivateFieldGet2["default"])(this, _utils).getExpiry(options === null || options === void 0 ? void 0 : (_options$terms3 = options.terms) === null || _options$terms3 === void 0 ? void 0 : (_options$terms3$expir = _options$terms3.expiry) === null || _options$terms3$expir === void 0 ? void 0 : _options$terms3$expir.seconds);
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
              _context3.next = 9;
              return (0, _classPrivateFieldGet2["default"])(this, _signatures).getV2FixedCollectionOfferSignature(_objectSpread(_objectSpread({}, options), {}, {
                offer: offer
              }));
            case 9:
              offer.signature = _context3.sent;
              return _context3.abrupt("return", offer);
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function constructV2FixedCollectionOffer(_x3) {
        return _constructV2FixedCollectionOffer.apply(this, arguments);
      }
      return constructV2FixedCollectionOffer;
    }()
  }, {
    key: "constructV2_3FixedCollectionOffer",
    value: function () {
      var _constructV2_3FixedCollectionOffer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var _options$terms4, _options$terms4$expir;
        var repayment, principal, loanInterestRateForDurationInBasisPoints, lenderNonce, expiry, nftId, offer;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              repayment = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.repayment).toLocaleString('fullwide', {
                useGrouping: false
              });
              principal = (0, _classPrivateFieldGet2["default"])(this, _Number).call(this, options.terms.principal).toLocaleString('fullwide', {
                useGrouping: false
              });
              loanInterestRateForDurationInBasisPoints = 0;
              lenderNonce = (0, _classPrivateFieldGet2["default"])(this, _utils).getNonce();
              expiry = (0, _classPrivateFieldGet2["default"])(this, _utils).getExpiry(options === null || options === void 0 ? void 0 : (_options$terms4 = options.terms) === null || _options$terms4 === void 0 ? void 0 : (_options$terms4$expir = _options$terms4.expiry) === null || _options$terms4$expir === void 0 ? void 0 : _options$terms4$expir.seconds);
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
              _context4.next = 9;
              return (0, _classPrivateFieldGet2["default"])(this, _signatures).getV2_3FixedCollectionOfferSignature(_objectSpread(_objectSpread({}, options), {}, {
                offer: offer
              }));
            case 9:
              offer.signature = _context4.sent;
              return _context4.abrupt("return", offer);
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function constructV2_3FixedCollectionOffer(_x4) {
        return _constructV2_3FixedCollectionOffer.apply(this, arguments);
      }
      return constructV2_3FixedCollectionOffer;
    }()
  }]);
  return OffersHelper;
}();
var _default = OffersHelper;
exports["default"] = _default;