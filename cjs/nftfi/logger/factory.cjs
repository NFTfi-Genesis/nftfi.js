"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _Logger = /*#__PURE__*/new WeakMap();
var _console = /*#__PURE__*/new WeakMap();
var _verbose = /*#__PURE__*/new WeakMap();
var _json = /*#__PURE__*/new WeakMap();
var LoggerFactory = /*#__PURE__*/function () {
  function LoggerFactory(options) {
    var _options$verbose;
    (0, _classCallCheck2["default"])(this, LoggerFactory);
    _classPrivateFieldInitSpec(this, _Logger, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _console, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _verbose, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _json, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _Logger, options.Logger);
    (0, _classPrivateFieldSet2["default"])(this, _console, options.console);
    (0, _classPrivateFieldSet2["default"])(this, _json, options.json);
    (0, _classPrivateFieldSet2["default"])(this, _verbose, (_options$verbose = options.verbose) !== null && _options$verbose !== void 0 ? _options$verbose : false);
  }
  (0, _createClass2["default"])(LoggerFactory, [{
    key: "create",
    value: function create(options) {
      var _options$scope;
      var logger = new ((0, _classPrivateFieldGet2["default"])(this, _Logger))({
        scope: (_options$scope = options === null || options === void 0 ? void 0 : options.scope) !== null && _options$scope !== void 0 ? _options$scope : 'SDK',
        id: options === null || options === void 0 ? void 0 : options.id,
        verbose: (0, _classPrivateFieldGet2["default"])(this, _verbose),
        console: (0, _classPrivateFieldGet2["default"])(this, _console),
        json: (0, _classPrivateFieldGet2["default"])(this, _json)
      });
      return logger;
    }
  }]);
  return LoggerFactory;
}();
var _default = LoggerFactory;
exports["default"] = _default;