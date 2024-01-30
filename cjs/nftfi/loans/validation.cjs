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
var _refinance = /*#__PURE__*/new WeakMap();
var LoansValidation = /*#__PURE__*/function () {
  function LoansValidation() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, LoansValidation);
    _classPrivateFieldInitSpec(this, _refinance, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _refinance, options === null || options === void 0 ? void 0 : options.refinance);
  }
  (0, _createClass2["default"])(LoansValidation, [{
    key: "refinance",
    get: function get() {
      return (0, _classPrivateFieldGet2["default"])(this, _refinance);
    }
  }]);
  return LoansValidation;
}();
var _default = LoansValidation;
exports["default"] = _default;