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
var _account = /*#__PURE__*/new WeakMap();
var _api = /*#__PURE__*/new WeakMap();
var _offersHelper = /*#__PURE__*/new WeakMap();
var _loans = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var _validator = /*#__PURE__*/new WeakMap();
var _requests = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var _helper = /*#__PURE__*/new WeakMap();
var _assertion = /*#__PURE__*/new WeakMap();
/**
 * @class
 * Class for working with offers.
 */
var Offers = /*#__PURE__*/function () {
  function Offers() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Offers);
    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _api, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _offersHelper, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _loans, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _validator, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _requests, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _error, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _helper, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _assertion, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _api, options === null || options === void 0 ? void 0 : options.api);
    (0, _classPrivateFieldSet2["default"])(this, _offersHelper, options === null || options === void 0 ? void 0 : options.offersHelper);
    (0, _classPrivateFieldSet2["default"])(this, _loans, options === null || options === void 0 ? void 0 : options.loans);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _validator, options === null || options === void 0 ? void 0 : options.offersValidator);
    (0, _classPrivateFieldSet2["default"])(this, _requests, options === null || options === void 0 ? void 0 : options.offersRequests);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    (0, _classPrivateFieldSet2["default"])(this, _helper, options === null || options === void 0 ? void 0 : options.helper);
    (0, _classPrivateFieldSet2["default"])(this, _assertion, options === null || options === void 0 ? void 0 : options.assertion);
  }

  /**
   * When called without filtering by an NFT address, lender address or borrower address, defaults to filtering by your account address as lender.
   * When provided with filters, gets all offers by specified filters.
   *
   * @param {object} [options] - Hashmap of config options for this method
   * @param {string} [options.filters.nft.address] - NFT contract address to filter by (optional)
   * @param {string} [options.filters.nft.id] - NFT id of the asset to filter by (optional)
   * @param {string} [options.filters.lender.address.eq] - Lender wallet address to filter by (optional)
   * @param {string} [options.filters.borrower.address.eq] - Borrower wallet address to filter by (optional)
   * @param {string} [options.filters.lender.address.ne] - Lender wallet address to exclude (optional)
   * @param {string} [options.filters.nftfi.contract.name] - Contract name to filter by (optional)
   * @param {string} [options.filters.loan.apr.lte] - Max apr to filter by (optional)
   * @param {string} [options.filters.loan.duration.eq] - Loan duration to filter by (optional)
   * @param {Array<number>} [options.filters.loan.duration.nin] - Loan durations to exclude (optional)
   * @param {string} [options.filters.loan.currency.address.eq] - Loan currency to filter by (optional)
   * @param {number} [options.pagination.page] - Pagination page (optional)
   * @param {number} [options.pagination.limit] - Pagination limit (optional)
   * @param {string} [options.pagination.sort] - Field to sort by (optional)
   * @param {'asc' | 'desc'} [options.pagination.direction] - Direction to sort by (optional)
   * @param {boolean} [options.validation.check=true] - Validate offers and append error info (optional)
   * @param {'required' | 'optional' | 'none'} [options.auth.token] - Specify if call to fetch offers should be authed, un-authed calls will always redact offers signature. By default, auth is optional. (optional)
   * @returns {Array<object>} Array of offers
   *
   * @example
   * // Get all offers made by your account
   * const offers = await nftfi.offers.get();
   *
   * @example
   * // Get the first page of offers made by your account, for a given NFT
   * const offers = await nftfi.offers.get({
   *   filters: {
   *     nft: {
   *       address: "0x00000000",
   *       id: "42"
   *     }
   *   },
   *   pagination:{
   *     page: 1,
   *     limit: 10
   *   }
   * });
   *
   * @example
   * // Get all offers made by your account, for multiple NFTs in a collection
   * const offers = await nftfi.offers.get({
   *   filters: {
   *     nft: {
   *       address: "0x00000000"
   *     }
   *   }
   * });
   *
   * @example
   * // Get the first page of collection offers made by a specific lender
   * const offers = await nftfi.offers.get({
   *   filters: {
   *     nft: {
   *       address: "0x00000000",
   *     },
   *     lender:{
   *       address: {
   *         eq: "0x12345567"
   *       }
   *     },
   *     nftfi: {
   *       contract: {
   *         name: "v2-3.loan.fixed.collection"
   *       }
   *     }
   *   },
   *   pagination:{
   *     page: 1,
   *     limit: 10
   *   }
   * });
   *
   * @example
   * // Get all offers made by your account, and dont perform validation checks.
   * const offers = await nftfi.offers.get({
   *   validation: {
   *     check: false
   *   }
   * });
   */
  (0, _createClass2["default"])(Offers, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _this = this;
        var options,
          _options$auth,
          _options$validation,
          _results,
          params,
          response,
          results,
          shouldNotValidate,
          _response$pagination,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              _context2.prev = 1;
              params = (0, _classPrivateFieldGet2["default"])(this, _offersHelper).getParams(options);
              _context2.next = 5;
              return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                uri: 'v0.1/offers',
                auth: {
                  token: (options === null || options === void 0 ? void 0 : (_options$auth = options.auth) === null || _options$auth === void 0 ? void 0 : _options$auth.token) || 'optional'
                },
                params: params
              });
            case 5:
              response = _context2.sent;
              results = (response === null || response === void 0 ? void 0 : response.results.map((0, _classPrivateFieldGet2["default"])(this, _helper).addCurrencyUnit)) || [];
              shouldNotValidate = (options === null || options === void 0 ? void 0 : (_options$validation = options.validation) === null || _options$validation === void 0 ? void 0 : _options$validation.check) === false;
              if (!(!shouldNotValidate && ((_results = results) === null || _results === void 0 ? void 0 : _results.length) > 0)) {
                _context2.next = 12;
                break;
              }
              _context2.next = 11;
              return Promise.all(results.map( /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(offer) {
                  var errors;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _classPrivateFieldGet2["default"])(_this, _validator).validate({
                          offer: offer
                        });
                      case 2:
                        errors = _context.sent;
                        return _context.abrupt("return", _objectSpread(_objectSpread({}, offer), {}, {
                          errors: errors
                        }));
                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 11:
              results = _context2.sent;
            case 12:
              if (!(options !== null && options !== void 0 && options.pagination)) {
                _context2.next = 14;
                break;
              }
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                pagination: {
                  total: response === null || response === void 0 ? void 0 : (_response$pagination = response.pagination) === null || _response$pagination === void 0 ? void 0 : _response$pagination.total
                },
                results: results
              }));
            case 14:
              return _context2.abrupt("return", results);
            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context2.t0));
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[1, 17]]);
      }));
      function get() {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * Counts offers matching specified filters and groups by specified grouping value.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {string} [options.filters.nft.address] - NFT contract address to filter by
     * @param {string} [options.filters.nft.id] - NFT id of the asset to filter by (optional)
     * @param {string} [options.filters.lender.address.eq] - Lender wallet address to filter by
     * @param {string} [options.group] - Field to group by
     * @returns {Array<object>} Array of response object
     *
     * @example
     * // Count offers made by lenderAddress for a given NFT grouped by currency
     * const results = await nftfi.offers.count({
     *   filters: {
     *     nft: {
     *       address: "0x11111111",
     *       id: "42"
     *     },
     *     lender: {
     *       address: {
     *         eq: "0x123"
     *       }
     *     }
     *   },
     *   group: "termsCurrencyAddress"
     * });
     */
  }, {
    key: "count",
    value: function () {
      var _count = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var options,
          params,
          _yield$_classPrivateF,
          result,
          errors,
          _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              _context3.prev = 1;
              params = (0, _classPrivateFieldGet2["default"])(this, _offersHelper).getParams(options);
              _context3.next = 5;
              return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                uri: 'v0.1/offers-count',
                params: params
              });
            case 5:
              _yield$_classPrivateF = _context3.sent;
              result = _yield$_classPrivateF.result;
              errors = _yield$_classPrivateF.errors;
              if (!errors) {
                _context3.next = 10;
                break;
              }
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(errors));
            case 10:
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(result));
            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context3.t0));
            case 16:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[1, 13]]);
      }));
      function count() {
        return _count.apply(this, arguments);
      }
      return count;
    }()
    /**
     * Creates a new offer on a NFT or collection.
     *
     * @param {object} options - Config options for this method
     * @param {object} options.terms - Terms of the offer
     * @param {object} options.nft - NFT to place an offer on
     * @param {object} options.borrower - Owner of the NFT
     * @param {object} options.nftfi - NFTfi options
     * @returns {object} Response object
     *
     * @example
     * // Create an offer on a NFT
     * const offer = await nftfi.offers.create({
     *   terms: {
     *     principal: 1000000000000000000,
     *     repayment: 1100000000000000000,
     *     duration: 86400 * 7, // 7 days (in seconds)
     *     currency: "0x00000000",
     *     expiry: 21600 // 6 hours (in seconds)
     *   },
     *   nft: {
     *     address: "0x00000000",
     *     id: "42"
     *   },
     *   borrower: {
     *     address: "0x00000000"
     *   },
     *   nftfi: {
     *     contract: {
     *       name: "v2-3.loan.fixed"
     *     }
     *   }
     * });
     */
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var errors, response, contractName, payload, _payload;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              options = _objectSpread(_objectSpread({}, options.listing), options); // copying options.listing fields onto the root, for backwards compatibility.
              contractName = options.nftfi.contract.name;
              _context4.t0 = contractName;
              _context4.next = _context4.t0 === 'v2-3.loan.fixed' ? 7 : _context4.t0 === 'v2-3.loan.fixed.collection' ? 14 : 21;
              break;
            case 7:
              _context4.next = 9;
              return (0, _classPrivateFieldGet2["default"])(this, _offersHelper).constructV2_3Offer(options);
            case 9:
              payload = _context4.sent;
              _context4.next = 12;
              return (0, _classPrivateFieldGet2["default"])(this, _api).post({
                uri: 'v0.2/offers',
                payload: payload
              });
            case 12:
              response = _context4.sent;
              return _context4.abrupt("break", 24);
            case 14:
              _context4.next = 16;
              return (0, _classPrivateFieldGet2["default"])(this, _offersHelper).constructV2_3FixedCollectionOffer(options);
            case 16:
              _payload = _context4.sent;
              _context4.next = 19;
              return (0, _classPrivateFieldGet2["default"])(this, _api).post({
                uri: 'v0.2/offers',
                payload: _payload
              });
            case 19:
              response = _context4.sent;
              return _context4.abrupt("break", 24);
            case 21:
              errors = {
                'nftfi.contract.name': ["".concat(contractName, " not supported")]
              };
              response = {
                errors: errors
              };
              return _context4.abrupt("break", 24);
            case 24:
              return _context4.abrupt("return", response);
            case 27:
              _context4.prev = 27;
              _context4.t1 = _context4["catch"](0);
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context4.t1));
            case 30:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 27]]);
      }));
      function create(_x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Deletes an active offer made by your account.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {object} options.offer.id - The Id of the offer to be deleted
     * @returns {object} Response object
     *
     * @example
     * // Get first avilable offer made by your account
     * const offers = await nftfi.offers.get();
     * const offerId = offers[0]['id'];
     * // Delete the offer by Id
     * const deleted = await nftfi.offers.delete({
     *   offer: {
     *     id: offerId
     *   }
     * });
     */
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(options) {
        var uri;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              uri = "v0.1/offers/".concat(options.offer.id);
              _context5.next = 4;
              return (0, _classPrivateFieldGet2["default"])(this, _api)["delete"]({
                uri: uri,
                auth: {
                  token: 'required'
                }
              });
            case 4:
              return _context5.abrupt("return", _context5.sent);
            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context5.t0));
            case 10:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 7]]);
      }));
      function _delete(_x3) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
    /**
     * Revokes an active offer made by your account.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {object} options.offer.nonce - The nonce of the offer to be deleted
     * @param {string} options.nftfi.contract.name - Name of contract which the offer was created for: `v2-3.loan.fixed`, `v2-3.loan.fixed.collection`
     * @returns {object} Response object
     *
     * @example
     * // Get first available offer made by your account
     * const offers = await nftfi.offers.get();
     * const nonce = offers[0]['lender']['nonce'];
     * const contractName = offers[0]['nftfi']['contract']['name']
     * // Revoke offer
     * const revoked = await nftfi.offers.revoke({
     *   offer: { nonce },
     *   nftfi: { contract: { name: contractName } }
     * });
     */
  }, {
    key: "revoke",
    value: function () {
      var _revoke = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(options) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return (0, _classPrivateFieldGet2["default"])(this, _loans).revokeOffer(options);
            case 2:
              return _context6.abrupt("return", _context6.sent);
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function revoke(_x4) {
        return _revoke.apply(this, arguments);
      }
      return revoke;
    }()
    /**
     * Validates an offer based on specified checks.
     *
     * @param {object} options - Parameters for the validation.
     * @param {object} options.offer - The offer object to validate.
     * @param {string[]} [options.checks] - An array of checks to validate against. If not provided or empty, all supported checks are performed. (optional)
     * @returns {object} Response object
     *
     * @example
     * // Validate an offer based on specified checks
     * const validation = await nftfi.offers.validate({
     *   offer: {
     *     terms: {
     *       loan: {
     *         principal: 2000000000000000000,
     *         repayment: 1100000000000000000,
     *         currency: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
     *         duration: 604800,
     *         expiry: 1760696014,
     *       }
     *     },
     *     nft: {
     *       address: "0x123",
     *       id: "00000"
     *     },
     *     lender: {
     *       address: "0x1111111",
     *       nonce: "123"
     *     },
     *     nftfi: {
     *       contract: {
     *         name: "v2.loan.fixed.collection"
     *       },
     *       fee: {
     *         bps: "500"
     *       }
     *     },
     *     referrer: {
     *       address: "0x0000000"
     *     },
     *     signature: "0x0000000"
     *   },
     *   checks: [
     *     "signature",
     *     "terms.principal",
     *     "lender.nonce"
     *   ]
     * });
     */
  }, {
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(options) {
        var warnings, result;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              (0, _classPrivateFieldGet2["default"])(this, _assertion).hasProvider();
              _context7.next = 4;
              return (0, _classPrivateFieldGet2["default"])(this, _validator).validate(options);
            case 4:
              warnings = _context7.sent;
              result = {};
              result.valid = warnings === null;
              if (warnings) {
                result.warnings = warnings;
              }
              return _context7.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(_objectSpread({}, result)));
            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context7.t0));
            case 14:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[0, 11]]);
      }));
      function validate(_x5) {
        return _validate.apply(this, arguments);
      }
      return validate;
    }()
  }, {
    key: "requests",
    get: function get() {
      return (0, _classPrivateFieldGet2["default"])(this, _requests);
    }
  }]);
  return Offers;
}();
var _default = Offers;
exports["default"] = _default;