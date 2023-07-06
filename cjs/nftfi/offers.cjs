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
  }

  // We will start using #result and #error to standardise responses from the sdk. Not all functions use this pattern yet, but this is the goal.

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
   *         name: "v2.loan.fixed.collection"
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
          params,
          _options$validation,
          _results,
          response,
          results,
          shouldNotValidate,
          _response$pagination,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              params = (0, _classPrivateFieldGet2["default"])(this, _offersHelper).getParams(options);
              _context2.prev = 2;
              _context2.next = 5;
              return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                uri: 'offers',
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
                        return (0, _classPrivateFieldGet2["default"])(_this, _validator).validate(offer);
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
              _context2.t0 = _context2["catch"](2);
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context2.t0));
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[2, 17]]);
      }));
      function get() {
        return _get.apply(this, arguments);
      }
      return get;
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
     *       name: "v2-1.loan.fixed"
     *     }
     *   }
     * });
     */
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var errors, response, contractName, payload, _payload;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              options = _objectSpread(_objectSpread({}, options.listing), options); // copying options.listing fields onto the root, for backwards compatibility.
              contractName = options.nftfi.contract.name;
              _context3.t0 = contractName;
              _context3.next = _context3.t0 === 'v2-1.loan.fixed' ? 5 : _context3.t0 === 'v2.loan.fixed.collection' ? 12 : 19;
              break;
            case 5:
              _context3.next = 7;
              return (0, _classPrivateFieldGet2["default"])(this, _offersHelper).constructV2Offer(options);
            case 7:
              payload = _context3.sent;
              _context3.next = 10;
              return (0, _classPrivateFieldGet2["default"])(this, _api).post({
                uri: 'offers',
                payload: payload
              });
            case 10:
              response = _context3.sent;
              return _context3.abrupt("break", 22);
            case 12:
              _context3.next = 14;
              return (0, _classPrivateFieldGet2["default"])(this, _offersHelper).constructV2FixedCollectionOffer(options);
            case 14:
              _payload = _context3.sent;
              _context3.next = 17;
              return (0, _classPrivateFieldGet2["default"])(this, _api).post({
                uri: 'offers',
                payload: _payload
              });
            case 17:
              response = _context3.sent;
              return _context3.abrupt("break", 22);
            case 19:
              errors = {
                'nftfi.contract.name': ["".concat(contractName, " not supported")]
              };
              response = {
                errors: errors
              };
              return _context3.abrupt("break", 22);
            case 22:
              return _context3.abrupt("return", response);
            case 23:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
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
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var uri, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              uri = "offers/".concat(options.offer.id);
              _context4.next = 3;
              return (0, _classPrivateFieldGet2["default"])(this, _api)["delete"]({
                uri: uri
              });
            case 3:
              result = _context4.sent;
              return _context4.abrupt("return", result);
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
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
     * @param {string} options.nftfi.contract.name - Name of contract which the offer was created for: `v1.loan.fixed`, `v2.loan.fixed`, `v2-1.loan.fixed`
     * @returns {object} Response object
     *
     * @example
     * // Get first avilable offer made by your account
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
      var _revoke = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(options) {
        var result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _classPrivateFieldGet2["default"])(this, _loans).revokeOffer(options);
            case 2:
              result = _context5.sent;
              return _context5.abrupt("return", result);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function revoke(_x4) {
        return _revoke.apply(this, arguments);
      }
      return revoke;
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