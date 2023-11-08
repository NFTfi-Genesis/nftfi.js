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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _ethers = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var _contractFactory = /*#__PURE__*/new WeakMap();
var _registryContract = /*#__PURE__*/new WeakMap();
var BundlesHelper = /*#__PURE__*/function () {
  function BundlesHelper() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, BundlesHelper);
    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _contractFactory, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _registryContract, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
  }
  (0, _createClass2["default"])(BundlesHelper, [{
    key: "_registryContract",
    get: function get() {
      if (!(0, _classPrivateFieldGet2["default"])(this, _registryContract)) {
        (0, _classPrivateFieldSet2["default"])(this, _registryContract, (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
          address: (0, _classPrivateFieldGet2["default"])(this, _config).registry.address,
          abi: (0, _classPrivateFieldGet2["default"])(this, _config).registry.abi
        }));
      }
      return (0, _classPrivateFieldGet2["default"])(this, _registryContract);
    }

    // Check if the wrapper is supported
  }, {
    key: "_isWrapperSupported",
    value: function _isWrapperSupported(options) {
      var result = false;
      var permit = options.permit;
      var permitName = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.parseBytes32String(permit);
      var _iterator = _createForOfIteratorHelper((0, _classPrivateFieldGet2["default"])(this, _config).registry.wrappers),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var wrapper = _step.value;
          var name = wrapper.name;
          var isPermitted = name === permitName;
          if (isPermitted) {
            result = true;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return result;
    }

    // Check if the wrapper is permitted
  }, {
    key: "_isWrapperPermitted",
    value: function _isWrapperPermitted(options) {
      var permit = options.permit;
      var isPermitted = permit === (0, _classPrivateFieldGet2["default"])(this, _ethers).constants.HashZero ? false : true;
      return isPermitted;
    }

    // Check if wrapper is safe transferable
  }, {
    key: "_isWrapperSafeTransferable",
    value: function _isWrapperSafeTransferable(options) {
      var permit = options.permit;
      var permitName = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.parseBytes32String(permit);
      var wrapper = (0, _classPrivateFieldGet2["default"])(this, _config).registry.wrappers.filter(function (wrapper) {
        return (wrapper === null || wrapper === void 0 ? void 0 : wrapper.name) === permitName;
      })[0];
      var isSafeTransferable = (wrapper === null || wrapper === void 0 ? void 0 : wrapper.safeTransfer) === true ? true : false;
      return isSafeTransferable;
    }
  }, {
    key: "getPermit",
    value: function () {
      var _getPermit = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _options$element, _options$element$toke;
        var permit, isPermitted, isSupported, isSafeTransferable;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._registryContract.call({
                "function": 'getNFTPermit',
                args: [options === null || options === void 0 ? void 0 : (_options$element = options.element) === null || _options$element === void 0 ? void 0 : (_options$element$toke = _options$element.token) === null || _options$element$toke === void 0 ? void 0 : _options$element$toke.address]
              });
            case 2:
              permit = _context.sent;
              isPermitted = this._isWrapperPermitted({
                permit: permit
              });
              isSupported = this._isWrapperSupported({
                permit: permit
              });
              isSafeTransferable = this._isWrapperSafeTransferable({
                permit: permit
              });
              return _context.abrupt("return", {
                isPermitted: isPermitted,
                isSupported: isSupported,
                isSafeTransferable: isSafeTransferable
              });
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getPermit(_x) {
        return _getPermit.apply(this, arguments);
      }
      return getPermit;
    }()
  }]);
  return BundlesHelper;
}();
var _default = BundlesHelper;
exports["default"] = _default;