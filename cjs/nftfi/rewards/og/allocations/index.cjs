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
var _result = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var _assertion = /*#__PURE__*/new WeakMap();
/**
 * @class
 * Class for working with OG allocations.
 */
var RewardsOgAllocations = /*#__PURE__*/function () {
  function RewardsOgAllocations() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, RewardsOgAllocations);
    _classPrivateFieldInitSpec(this, _account, {
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
    (0, _classPrivateFieldSet2["default"])(this, _api, options === null || options === void 0 ? void 0 : options.api);
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet2["default"])(this, _assertion, options === null || options === void 0 ? void 0 : options.assertion);
  }

  /**
   * Gets og points for your account.
   *
   * @param {object} [options] - Hashmap of config options for this method
   * @param {object} [options.account.address] - The account address to get the OG allocation of (optional)
   *
   * @returns {Object} An object containing information about your OG allocation.
   *
   * @example
   * // Get your OG reward allocation
   * const allocation = await nftfi.rewards.og.allocations.get();
   * const allocation = await nftfi.rewards.og.allocations.get({ account: { address: '0x11111111' } });
   */
  (0, _createClass2["default"])(RewardsOgAllocations, [{
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
                uri: "v0.1/rewards/og/allocations/".concat(accountAddress)
              });
            case 5:
              response = _context.sent;
              if (response) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                status: {
                  id: 'not-eligible'
                }
              }));
            case 8:
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(response));
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t0));
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 11]]);
      }));
      function get(_x) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }]);
  return RewardsOgAllocations;
}();
var _default = RewardsOgAllocations;
exports["default"] = _default;