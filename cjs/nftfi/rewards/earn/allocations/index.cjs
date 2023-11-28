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
var _helper = /*#__PURE__*/new WeakMap();
var _api = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var _assertion = /*#__PURE__*/new WeakMap();
/**
 * @class
 * Class for working with Earn allocations.
 */
var RewardsEarnAllocations = /*#__PURE__*/function () {
  function RewardsEarnAllocations() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, RewardsEarnAllocations);
    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _helper, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _api, {
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
    _classPrivateFieldInitSpec(this, _assertion, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _helper, options === null || options === void 0 ? void 0 : options.helper);
    (0, _classPrivateFieldSet2["default"])(this, _api, options === null || options === void 0 ? void 0 : options.api);
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet2["default"])(this, _assertion, options === null || options === void 0 ? void 0 : options.assertion);
  }

  /**
   * Gets Earn points for your account.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} [options.account.address] - The account address to get the allocations of (optional)
   * @param {string} [options.season.id] - The season id to get the allocations of (optional)
   *
   * @returns {Object} An object containing information about your Earn allocations.
   *
   * @example
   * // Get your Earn reward allocation
   * const points = await nftfi.rewards.earn.allocations.get();
   * const points = await nftfi.rewards.earn.allocations.get({ account: { address: walletAddress } });
   * const points = await nftfi.rewards.earn.allocations.get({ season: { id: seasonId } });
   */
  (0, _createClass2["default"])(RewardsEarnAllocations, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _options$account, _options$account2, accountAddress, response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              if (!(options !== null && options !== void 0 && (_options$account = options.account) !== null && _options$account !== void 0 && _options$account.address)) {
                (0, _classPrivateFieldGet2["default"])(this, _assertion).hasAddress('Account address required, please provide a value in options.account.address or on sdk initialization.');
              }
              accountAddress = (options === null || options === void 0 ? void 0 : (_options$account2 = options.account) === null || _options$account2 === void 0 ? void 0 : _options$account2.address) || (0, _classPrivateFieldGet2["default"])(this, _account).getAddress();
              _context.next = 5;
              return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                uri: "v0.1/rewards/earn/allocations/".concat(accountAddress),
                params: (0, _classPrivateFieldGet2["default"])(this, _helper).getParams(options)
              });
            case 5:
              response = _context.sent;
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(response));
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t0));
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 9]]);
      }));
      function get(_x) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * Gets Earn points for the first 100 accounts sorted by rank.
     *
     * @param {string} [options.season.id] - The season id to get the allocations of (optional)
     * @returns {Object} An array containing objects about user's Earn allocations.
     *
     * @example
     * const list = await nftfi.rewards.earn.allocations.list();
     * const list = await nftfi.rewards.earn.allocations.list({ season: { id: seasonId } });
     */
  }, {
    key: "list",
    value: function () {
      var _list = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var options,
          _list2,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              _context2.prev = 1;
              _context2.next = 4;
              return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                uri: 'v0.1/rewards/earn/allocations',
                params: (0, _classPrivateFieldGet2["default"])(this, _helper).getParams(options)
              });
            case 4:
              _list2 = _context2.sent;
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(_list2));
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context2.t0));
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[1, 8]]);
      }));
      function list() {
        return _list.apply(this, arguments);
      }
      return list;
    }()
  }]);
  return RewardsEarnAllocations;
}();
var _default = RewardsEarnAllocations;
exports["default"] = _default;