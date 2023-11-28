"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var Rewards = /*#__PURE__*/(0, _createClass2["default"])(function Rewards() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _classCallCheck2["default"])(this, Rewards);
  (0, _defineProperty2["default"])(this, "og", void 0);
  (0, _defineProperty2["default"])(this, "earn", void 0);
  this.og = options === null || options === void 0 ? void 0 : options.og;
  this.earn = options === null || options === void 0 ? void 0 : options.earn;
});
var _default = Rewards;
exports["default"] = _default;