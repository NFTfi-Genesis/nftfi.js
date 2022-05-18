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

var _api = /*#__PURE__*/new WeakMap();

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

    _classPrivateFieldInitSpec(this, _helper, {
      writable: true,
      value: void 0
    });

    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _api, options === null || options === void 0 ? void 0 : options.api);
    (0, _classPrivateFieldSet2["default"])(this, _helper, options === null || options === void 0 ? void 0 : options.offersHelper);
  }
  /**
   * When called with no argument, gets all offers made by your account.
   * When provided with filters, gets all offers by specified filters.
   *
   * @param {object} [options] - Hashmap of config options for this method
   * @param {string} [options.filters.nft.address] - NFT contract address to filter by (optional)
   * @param {string} [options.filters.nft.id] - NFT id of the asset to filter by (optional)
   * @returns {Array<object>} Array of offers
   *
   * @example
   * // Get all offers made by your account
   * const offers = await nftfi.offers.get();
   *
   * @example
   * // Get all offers associated with a NFT
   * const offers = await nftfi.offers.get({
   *   filters: {
   *     nft: {
   *       address: "0x00000000",
   *       id: "42"
   *     }
   *   }
   * });
   */


  (0, _createClass2["default"])(Offers, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _options$filters;

        var options,
            params,
            response,
            offers,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                params = {};

                if (options !== null && options !== void 0 && (_options$filters = options.filters) !== null && _options$filters !== void 0 && _options$filters.nft) {
                  params = {
                    nftAddress: options.filters.nft.address,
                    nftId: options.filters.nft.id
                  };
                } else {
                  params = {
                    lenderAddress: (0, _classPrivateFieldGet2["default"])(this, _account).getAddress()
                  };
                }

                _context.next = 5;
                return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                  uri: 'offers',
                  params: params
                });

              case 5:
                response = _context.sent;
                offers = response['results'];
                return _context.abrupt("return", offers);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get() {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Creates a new offer on a collateral listing.
     *
     * @param {object} options - Config options for this method
     * @param {object} options.terms - Terms of the offer
     * @param {object} options.listing - Listing to place an offer on
     * @returns {object} Response object
     *
     * @example
     * // Construct the loan terms
     * const currency = nftfi.config.erc20.weth.address;
     * const principal = 1000000000000000000; // 1 wETH
     * const apr = 32;
     * const days = 30;
     * const repayment = nftfi.utils.calcRepaymentAmount(principal, apr, days);
     * const duration = 86400 * days; // Number of days in seconds
     * const terms = {
     *   principal,
     *   repayment,
     *   duration,
     *   currency
     * };
     * // Get first available listing (to make offer on)
     * const listings = await nftfi.listings.get();
     * const listing = listings[0];
     * // Approve principal wETH with the NFTfi contract
     * await nftfi.erc20.approve({
     *   token: { address: currency },
     *   amount: principal,
     *   nftfi: {
     *     contract: {
     *       name: listing.nftfi.contract.name
     *     }
     *   }
     * });
     * // Create an offer on the listing
     * const offer = await nftfi.offers.create({
     *   terms,
     *   listing: {
     *     nft: {
     *       id: listing.nft.id,
     *       address: listing.nft.address
     *     },
     *     borrower: {
     *       address: listing.borrower.address
     *     },
     *     nftfi: {
     *       contract: {
     *         name: listing.nftfi.contract.name
     *       }
     *     }
     *   }
     * });
     */

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var payload, contractName, response;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                payload = {};
                contractName = options.listing.nftfi.contract.name;
                _context2.t0 = contractName;
                _context2.next = _context2.t0 === 'v1.loan.fixed' ? 5 : _context2.t0 === 'v2.loan.fixed' ? 9 : 13;
                break;

              case 5:
                _context2.next = 7;
                return (0, _classPrivateFieldGet2["default"])(this, _helper).constructV1Offer(options);

              case 7:
                payload = _context2.sent;
                return _context2.abrupt("break", 13);

              case 9:
                _context2.next = 11;
                return (0, _classPrivateFieldGet2["default"])(this, _helper).constructV2Offer(options);

              case 11:
                payload = _context2.sent;
                return _context2.abrupt("break", 13);

              case 13:
                _context2.next = 15;
                return (0, _classPrivateFieldGet2["default"])(this, _api).post({
                  uri: 'offers',
                  payload: payload
                });

              case 15:
                response = _context2.sent;
                return _context2.abrupt("return", response);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x) {
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
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var uri, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                uri = "offers/".concat(options.offer.id);
                _context3.next = 3;
                return (0, _classPrivateFieldGet2["default"])(this, _api)["delete"]({
                  uri: uri
                });

              case 3:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete(_x2) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return Offers;
}();

var _default = Offers;
exports["default"] = _default;