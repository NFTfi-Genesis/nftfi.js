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
 * Class for working with Earn rewards.
 */
var RewardsEarn = /*#__PURE__*/(0, _createClass2["default"])(function RewardsEarn() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _classCallCheck2["default"])(this, RewardsEarn);
  (0, _defineProperty2["default"])(this, "allocations", void 0);
  this.allocations = options === null || options === void 0 ? void 0 : options.allocations;
});
var _default = RewardsEarn;
exports["default"] = _default;