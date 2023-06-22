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
 * Class for working with Earn points.
 */
var RewardsEarnPoints = /*#__PURE__*/function () {
  function RewardsEarnPoints() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, RewardsEarnPoints);
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
   * Gets Earn points for your account.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} [options.loan.id] - Id of a loan (required)
   * @param {object} [options.nftfi.contract.name] - Name of the loan contract (required)
   *
   * @returns {Object} An object containing information about your Earn points.
   *
   * @example
   * // Get your Earn reward points
   * const points = await nftfi.rewards.earn.points.get({
   *   loan: {
   *     id: 12345
   *   },
   *   nftfi: {
   *     contract: {
   *        name: "v2.loan.fixed"
   *     }
   *   }
   * });
   */
  (0, _createClass2["default"])(RewardsEarnPoints, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _options$loan, _options$nftfi, _options$nftfi$contra, response, _e$response, _e$response$data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                uri: 'rewards/earn/points',
                params: {
                  loanId: (_options$loan = options.loan) === null || _options$loan === void 0 ? void 0 : _options$loan.id,
                  loanNftfiContractName: (_options$nftfi = options.nftfi) === null || _options$nftfi === void 0 ? void 0 : (_options$nftfi$contra = _options$nftfi.contract) === null || _options$nftfi$contra === void 0 ? void 0 : _options$nftfi$contra.name
                }
              }, {
                error: {
                  rethrow: true
                }
              });
            case 3:
              response = _context.sent;
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(response.results));
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle((_e$response = _context.t0.response) === null || _e$response === void 0 ? void 0 : (_e$response$data = _e$response.data) === null || _e$response$data === void 0 ? void 0 : _e$response$data.errors));
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 7]]);
      }));
      function get(_x) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }]);
  return RewardsEarnPoints;
}();
var _default = RewardsEarnPoints;
exports["default"] = _default;