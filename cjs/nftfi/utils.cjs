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

var _ethers = /*#__PURE__*/new WeakMap();

var _web = /*#__PURE__*/new WeakMap();

var _BN = /*#__PURE__*/new WeakMap();

var _Date = /*#__PURE__*/new WeakMap();

var _Math = /*#__PURE__*/new WeakMap();

var _Number = /*#__PURE__*/new WeakMap();

/**
 * @class
 * Class with utility methods.
 */
var Utils = /*#__PURE__*/function () {
  function Utils() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Utils);

    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _web, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _BN, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _Date, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _Math, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _Number, {
      writable: true,
      value: void 0
    });

    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
    (0, _classPrivateFieldSet2["default"])(this, _web, options === null || options === void 0 ? void 0 : options.web3);
    (0, _classPrivateFieldSet2["default"])(this, _BN, options === null || options === void 0 ? void 0 : options.BN);
    (0, _classPrivateFieldSet2["default"])(this, _Date, options === null || options === void 0 ? void 0 : options.Date);
    (0, _classPrivateFieldSet2["default"])(this, _Math, options === null || options === void 0 ? void 0 : options.Math);
    (0, _classPrivateFieldSet2["default"])(this, _Number, options === null || options === void 0 ? void 0 : options.Number);
  }
  /**
   * Gets random nonce.
   *
   * @returns {string} Nonce
   *
   * @example
   * // Get a random nonce
   * const nonce = nftfi.utils.getNonce();
   */


  (0, _createClass2["default"])(Utils, [{
    key: "getNonce",
    value: function getNonce() {
      var rand = (0, _classPrivateFieldGet2["default"])(this, _web).utils.randomHex(32).replace('0x', '');
      var nonce = new ((0, _classPrivateFieldGet2["default"])(this, _BN))(rand, 16).toString();
      return nonce;
    }
    /**
     * Gets an expiry timestamp.
     *
     * @returns {number} Expiry
     *
     * @example
     * // Get an expiry timestamp into the future
     * const expiry = nftfi.utils.getExpiry();
     */

  }, {
    key: "getExpiry",
    value: function getExpiry(seconds) {
      var currentTimestampSecs = (0, _classPrivateFieldGet2["default"])(this, _Math).floor((0, _classPrivateFieldGet2["default"])(this, _Date).now() / 1000);
      var secondsIntoTheFuture = seconds || 24 * 60 * 60; // 24 hours

      var expiry = currentTimestampSecs + secondsIntoTheFuture;
      return expiry;
    }
    /**
     * Formats an amount of wei into a decimal string representing the amount of ether.
     *
     * @param {number} wei - Wei denomination of the amount
     * @returns {string} Ether denomination of the amount
     *
     * @example
     * // Format wei into the amount of ether
     * const wei = 100;
     * const ether = nftfi.utils.formatEther(wei);
     */

  }, {
    key: "formatEther",
    value: function formatEther(wei) {
      var weiString = wei.toLocaleString('fullwide', {
        useGrouping: false
      });
      return (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.formatEther(weiString);
    }
    /**
     * Formats an amount of wei into a decimal string representing the amount of unit.
     *
     * @param {BigNumber} wei - Wei denomination of the amount
     * @param {string} unit - Unit denomination to format value
     * @returns {string} String representation of value formatted with unit digits
     *
     * @example
     * // Format usdc wei amount into the amount of unit
     * const wei = '1000000';
     * const usdc = nftfi.utils.formatUnits(wei, 'mwei'); // 1 usdc
     *
     * @example
     * // Format wei into the amount of unit
     * const wei = '1000000000000000000';
     * const ether = nftfi.utils.formatUnits(wei, 'ether'); // 1 ether
     */

  }, {
    key: "formatUnits",
    value: function formatUnits(wei, unit) {
      var weiString = wei.toLocaleString('fullwide', {
        useGrouping: false
      });
      return (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.formatUnits(weiString, unit);
    }
    /**
     * Formats value into a BigNumber representing the value in wei from the unit specified.
     *
     * @param {number} value - Value
     * @param {string} unit - Unit denomination to format from
     * @returns {BigNumber} BigNumber representation of value parsed with unit digits
     *
     * @example
     * // Format usdc amount into the amount of wei
     * const value = 1;
     * const usdcWei = nftfi.utils.formatWei(value, 'mwei'); // 1000000
     *
     * @example
     * // Format ether amount into the amount of wei
     * const value = 100;
     * const wei = nftfi.utils.formatWei(value, 'ether'); // 100000000000000000000
     */

  }, {
    key: "formatWei",
    value: function formatWei(value, unit) {
      var valueString = value.toLocaleString('fullwide', {
        useGrouping: false
      });
      return (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.parseUnits(valueString, unit);
    }
    /**
     * Calculates the loan repayment amount given its other parameters.
     *
     * @param {number} principal - The loan's principal amount, in base units (eg. 1000000000000000000 wei)
     * @param {number} apr - The APR (yearly percentage rate)
     * @param {number} duration - The duration of the loan denominated in days
     * @returns {number} The result maximum repayment amount, in base units (eg. 1250000000000000000 wei)
     *
     * @example
     * // Calculate the loan repayment amount
     * const principal = 1000000000000000000;
     * const apr = 32;
     * const duration = 30;
     * const amount = nftfi.utils.calcRepaymentAmount(principal, apr, duration);
     */

  }, {
    key: "calcRepaymentAmount",
    value: function calcRepaymentAmount(principal, apr, duration) {
      var p = (0, _classPrivateFieldGet2["default"])(this, _Number).parseInt(principal);
      return Math.floor(p * apr / 100 * (duration / 365) + p);
    }
    /**
     * Calculates the loan APR (yearly percentage rate) given its other parameters
     *
     * @param {number} principal - The loan's principal amount in base units (eg. 1000000000000000000 wei)
     * @param {number} repayment - The maximum repayment amount to be paid by the borrower, in base units (eg. 1230000000000000000 wei)
     * @param {number} duration - The duration of the loan denominated in days
     * @returns {number} The result APR
     *
     * @example
     * // Calculate the APR
     * const principal = 1000000000000000000;
     * const repayment = 1500000000000000000;
     * const duration = 30;
     * const apr = nftfi.utils.calcApr(principal, repayment, duration);
     */

  }, {
    key: "calcApr",
    value: function calcApr(principal, repayment, duration) {
      return (repayment * 100 / principal - 100) * (365 / duration);
    }
  }]);
  return Utils;
}();

var _default = Utils;
exports["default"] = _default;