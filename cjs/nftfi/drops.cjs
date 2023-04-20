"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
/**
 * @class
 * Class for working with drops.
 */
var Drops = /*#__PURE__*/(0, _createClass2["default"])(function Drops() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _classCallCheck2["default"])(this, Drops);
  (0, _defineProperty2["default"])(this, "og", void 0);
  this.og = options === null || options === void 0 ? void 0 : options.og;
});
var _default = Drops;
exports["default"] = _default;