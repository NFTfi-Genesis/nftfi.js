"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classPrivateFieldGet3 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _config = /*#__PURE__*/new WeakMap();
/**
 * @class
 * Class with helper methods.
 */
var Helper = /*#__PURE__*/(0, _createClass2["default"])(function Helper() {
  var _this = this;
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _classCallCheck2["default"])(this, Helper);
  _classPrivateFieldInitSpec(this, _config, {
    writable: true,
    value: void 0
  });
  (0, _defineProperty2["default"])(this, "addCurrencyUnit", function (object) {
    var _object$terms, _object$terms$loan, _object$terms2, _object$terms2$loan, _classPrivateFieldGet2;
    var currency = (object === null || object === void 0 ? void 0 : (_object$terms = object.terms) === null || _object$terms === void 0 ? void 0 : (_object$terms$loan = _object$terms.loan) === null || _object$terms$loan === void 0 ? void 0 : _object$terms$loan.currency) || null;
    var unit = (object === null || object === void 0 ? void 0 : (_object$terms2 = object.terms) === null || _object$terms2 === void 0 ? void 0 : (_object$terms2$loan = _object$terms2.loan) === null || _object$terms2$loan === void 0 ? void 0 : _object$terms2$loan.unit) || null;
    if (currency && unit || !currency) {
      return object;
    }
    var _Object$keys$filter = Object.keys((0, _classPrivateFieldGet3["default"])(_this, _config).erc20).filter(function (key) {
        return (0, _classPrivateFieldGet3["default"])(_this, _config).erc20[key].address === currency;
      }),
      _Object$keys$filter2 = (0, _slicedToArray2["default"])(_Object$keys$filter, 1),
      ticker = _Object$keys$filter2[0];
    unit = (_classPrivateFieldGet2 = (0, _classPrivateFieldGet3["default"])(_this, _config).erc20[ticker]) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.unit;
    return _objectSpread(_objectSpread({}, object), {}, {
      terms: _objectSpread(_objectSpread({}, object.terms), {}, {
        loan: _objectSpread(_objectSpread({}, object.terms.loan), {}, {
          unit: unit
        })
      })
    });
  });
  (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
});
var _default = Helper;
exports["default"] = _default;