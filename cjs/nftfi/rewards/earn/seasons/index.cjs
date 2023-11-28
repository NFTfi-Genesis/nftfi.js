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
var _result = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
/**
 * @class
 * Class for working with Earn seasons.
 */
var RewardsEarnSeasons = /*#__PURE__*/function () {
  function RewardsEarnSeasons() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, RewardsEarnSeasons);
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
    (0, _classPrivateFieldSet2["default"])(this, _api, options === null || options === void 0 ? void 0 : options.api);
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
  }

  /**
   * Gets Earn season.
   *
   * @returns {Object} An object containing information about Earn season.
   *
   * @example
   * // Gets an active Earn season
   * const season = await nftfi.rewards.earn.seasons.getActive();
   */
  (0, _createClass2["default"])(RewardsEarnSeasons, [{
    key: "getActive",
    value: function () {
      var _getActive = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var list;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                uri: '/v0.1/rewards/earn/seasons?status=active'
              });
            case 3:
              list = _context.sent;
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(list.results[0]));
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t0));
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 7]]);
      }));
      function getActive() {
        return _getActive.apply(this, arguments);
      }
      return getActive;
    }()
    /**
     * Gets Earn seasons list.
     *
     * @returns {Object} An array containing objects about Earn seasons.
     *
     * @example
     * const seasons = await nftfi.rewards.earn.seasons.list();
     */
  }, {
    key: "list",
    value: function () {
      var _list = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _list2;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                uri: '/v0.1/rewards/earn/seasons'
              });
            case 3:
              _list2 = _context2.sent;
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(_list2.results));
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context2.t0));
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 7]]);
      }));
      function list() {
        return _list.apply(this, arguments);
      }
      return list;
    }()
  }]);
  return RewardsEarnSeasons;
}();
var _default = RewardsEarnSeasons;
exports["default"] = _default;