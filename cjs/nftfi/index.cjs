"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var NFTfi = /*#__PURE__*/(0, _createClass2["default"])(function NFTfi() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _classCallCheck2["default"])(this, NFTfi);
  (0, _defineProperty2["default"])(this, "config", void 0);
  (0, _defineProperty2["default"])(this, "account", void 0);
  (0, _defineProperty2["default"])(this, "listings", void 0);
  (0, _defineProperty2["default"])(this, "offers", void 0);
  (0, _defineProperty2["default"])(this, "loans", void 0);
  (0, _defineProperty2["default"])(this, "erc20", void 0);
  (0, _defineProperty2["default"])(this, "erc721", void 0);
  (0, _defineProperty2["default"])(this, "bundles", void 0);
  (0, _defineProperty2["default"])(this, "immutables", void 0);
  (0, _defineProperty2["default"])(this, "utils", void 0);
  this.config = options.config;
  this.account = options.account;
  this.listings = options.listings;
  this.offers = options.offers;
  this.loans = options.loans;
  this.erc20 = options.erc20;
  this.erc721 = options.erc721;
  this.bundles = options === null || options === void 0 ? void 0 : options.bundles;
  this.immutables = options === null || options === void 0 ? void 0 : options.immutables;
  this.utils = options.utils;
});
var _default = NFTfi;
exports["default"] = _default;