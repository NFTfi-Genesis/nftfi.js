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

var _api = /*#__PURE__*/new WeakMap();

var _config = /*#__PURE__*/new WeakMap();

var _helper = /*#__PURE__*/new WeakMap();

/**
 * @class
 * Class for working with listings.
 */
var Listings = /*#__PURE__*/function () {
  function Listings() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Listings);

    _classPrivateFieldInitSpec(this, _api, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _helper, {
      writable: true,
      value: void 0
    });

    (0, _classPrivateFieldSet2["default"])(this, _api, options === null || options === void 0 ? void 0 : options.api);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _helper, options === null || options === void 0 ? void 0 : options.helper);
  }
  /**
   * Gets all current listings.
   *
   * @param {object} [options] - Hashmap of config options for this method
   * @param {Array<string>} [options.filters.nftAddresses] - NFT contract addresses (optional)
   * @param {number} [options.pagination.page] - Pagination page (optional)
   * @param {number} [options.pagination.limit] - Pagination limit (optional)
   * @returns {Array<object>} Array of listings hashmaps
   *
   * @example
   * // get listings without specifying pagination or filters
   * const listings = await nftfi.listings.get();
   *
   * @example
   * // get the first `page` of listings, filtered by `nftAddresses`
   * const listings = await nftfi.listings.get({
   *   filters: {
   *     nftAddresses: ['0x11111111', '0x22222222']
   *   },
   *   pagination: {
   *     page: 1,
   *     limit: 20
   *   }
   * });
   */


  (0, _createClass2["default"])(Listings, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _options$pagination, _options$pagination2, _options$filters;

        var options,
            limit,
            page,
            nftAddresses,
            response,
            listings,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                limit = (options === null || options === void 0 ? void 0 : (_options$pagination = options.pagination) === null || _options$pagination === void 0 ? void 0 : _options$pagination.limit) || (0, _classPrivateFieldGet2["default"])(this, _config).pagination.limit;
                page = (options === null || options === void 0 ? void 0 : (_options$pagination2 = options.pagination) === null || _options$pagination2 === void 0 ? void 0 : _options$pagination2.page) || (0, _classPrivateFieldGet2["default"])(this, _config).pagination.page;
                nftAddresses = (options === null || options === void 0 ? void 0 : (_options$filters = options.filters) === null || _options$filters === void 0 ? void 0 : _options$filters.nftAddresses) || [];
                _context.next = 6;
                return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                  uri: 'listings',
                  params: {
                    nftAddresses: nftAddresses.join(),
                    page: page,
                    limit: limit
                  }
                });

              case 6:
                response = _context.sent;
                listings = response['results'];
                listings = listings.map((0, _classPrivateFieldGet2["default"])(this, _helper).addCurrencyUnit);
                return _context.abrupt("return", listings);

              case 10:
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
  }]);
  return Listings;
}();

var _default = Listings;
exports["default"] = _default;