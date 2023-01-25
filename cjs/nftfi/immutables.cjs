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
var _config = /*#__PURE__*/new WeakMap();
var _contractFactory = /*#__PURE__*/new WeakMap();
var _immutableContract = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
/**
 * @class
 * Class for working with immutables.
 */
var Immutables = /*#__PURE__*/function () {
  function Immutables(options) {
    (0, _classCallCheck2["default"])(this, Immutables);
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _contractFactory, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _immutableContract, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _error, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
    (0, _classPrivateFieldSet2["default"])(this, _immutableContract, (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
      address: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1.address,
      abi: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1.abi
    }));
  }

  /**
   * Unseal an immutable.
   *
   * @param {Object} options - An object containing options for the unseal operation.
   * @param {Object} options.immutable - An object containing the ID of the immutable bundle to unseal.
   * @param {string} options.immutable.id - The ID of the immutable bundle to unseal.
   *
   * @returns {Object} An object containing information about the bundle that was released from the immutable.
   *
   * @example
   * // Unseal an immutable bundle.
   * const bundle = await nftfi.immutables.unseal({
   *   immutable: { id: '123' }
   * });
   */
  (0, _createClass2["default"])(Immutables, [{
    key: "unseal",
    value: function unseal(options) {
      var _this = this;
      return (0, _classPrivateFieldGet2["default"])(this, _immutableContract).call({
        "function": 'withdraw',
        args: [options.immutable.id, (0, _classPrivateFieldGet2["default"])(this, _account).getAddress()]
      }).then( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(result) {
          var transfer;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                transfer = result.logs.filter(function (log) {
                  return log.name === 'Transfer' && log.args.from.toLowerCase() === (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1.address.toLowerCase() && log.args.to.toLowerCase() === (0, _classPrivateFieldGet2["default"])(this, _account).getAddress().toLowerCase();
                }, _this)[0];
                return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(_this, _result).handle({
                  bundle: {
                    id: transfer.args.tokenId.toString()
                  },
                  nftfi: {
                    contract: {
                      name: (0, _classPrivateFieldGet2["default"])(_this, _config).bundler.v1.name
                    }
                  }
                }));
              case 2:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }())["catch"](function (e) {
        return (0, _classPrivateFieldGet2["default"])(_this, _error).handle(e);
      });
    }

    /**
     * Get a bundle.
     *
     * @param {Object} options - An object containing options for the get operation.
     * @param {Object} options.immutable - An object containing the ID of the immutable to get the corresponding bundle for.
     * @param {string} options.immutable.id - The ID of the immutable to get the corresponding bundle for.
     *
     * @returns {Object} An object containing information about an bundle.
     *
     * @example
     * // Get the corresponding immutable for a given bundle.
     * const bundle = await nftfi.immutables.getBundle({
     *   immutable: { id: '123' }
     * });
     */
  }, {
    key: "getBundle",
    value: function () {
      var _getBundle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var bundleId;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _classPrivateFieldGet2["default"])(this, _immutableContract).call({
                "function": 'bundleOfImmutable',
                args: [options.immutable.id]
              });
            case 3:
              bundleId = _context2.sent;
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                bundle: {
                  id: bundleId.toString()
                },
                nftfi: {
                  contract: {
                    name: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1.name
                  }
                }
              }));
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
      function getBundle(_x2) {
        return _getBundle.apply(this, arguments);
      }
      return getBundle;
    }()
  }]);
  return Immutables;
}();
var _default = Immutables;
exports["default"] = _default;