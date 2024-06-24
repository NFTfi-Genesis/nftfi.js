"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet4 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _verbose = /*#__PURE__*/new WeakMap();
var _scope = /*#__PURE__*/new WeakMap();
var _id = /*#__PURE__*/new WeakMap();
var _console = /*#__PURE__*/new WeakMap();
var _json = /*#__PURE__*/new WeakMap();
var Logger = /*#__PURE__*/function () {
  function Logger() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Logger);
    _classPrivateFieldInitSpec(this, _verbose, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _scope, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _id, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _console, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _json, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _verbose, options === null || options === void 0 ? void 0 : options.verbose);
    (0, _classPrivateFieldSet2["default"])(this, _scope, options === null || options === void 0 ? void 0 : options.scope);
    (0, _classPrivateFieldSet2["default"])(this, _id, options === null || options === void 0 ? void 0 : options.id);
    (0, _classPrivateFieldSet2["default"])(this, _console, options.console);
    (0, _classPrivateFieldSet2["default"])(this, _json, options === null || options === void 0 ? void 0 : options.json);
  }
  (0, _createClass2["default"])(Logger, [{
    key: "_stringifyMessages",
    value: function _stringifyMessages(messages) {
      var _this = this;
      return messages.map(function (message) {
        if ((0, _typeof2["default"])(message) === 'object') {
          return (0, _classPrivateFieldGet4["default"])(_this, _json).stringify(message);
        }
        return message;
      });
    }
  }, {
    key: "info",
    value: function info() {
      if ((0, _classPrivateFieldGet4["default"])(this, _verbose)) {
        var _classPrivateFieldGet2;
        for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
          messages[_key] = arguments[_key];
        }
        (_classPrivateFieldGet2 = (0, _classPrivateFieldGet4["default"])(this, _console)).info.apply(_classPrivateFieldGet2, ["[".concat((0, _classPrivateFieldGet4["default"])(this, _scope)).concat((0, _classPrivateFieldGet4["default"])(this, _id) ? " - ".concat((0, _classPrivateFieldGet4["default"])(this, _id)) : '', "]")].concat((0, _toConsumableArray2["default"])(this._stringifyMessages(messages))));
      }
    }
  }, {
    key: "error",
    value: function error() {
      if ((0, _classPrivateFieldGet4["default"])(this, _verbose)) {
        var _classPrivateFieldGet3;
        for (var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          messages[_key2] = arguments[_key2];
        }
        (_classPrivateFieldGet3 = (0, _classPrivateFieldGet4["default"])(this, _console)).error.apply(_classPrivateFieldGet3, ["[".concat((0, _classPrivateFieldGet4["default"])(this, _scope)).concat((0, _classPrivateFieldGet4["default"])(this, _id) ? " - ".concat((0, _classPrivateFieldGet4["default"])(this, _id)) : '', "]")].concat((0, _toConsumableArray2["default"])(this._stringifyMessages(messages))));
      }
    }
  }]);
  return Logger;
}();
var _default = Logger;
exports["default"] = _default;