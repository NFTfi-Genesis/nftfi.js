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

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

var _api = /*#__PURE__*/new WeakMap();

var _account = /*#__PURE__*/new WeakMap();

var _fixed = /*#__PURE__*/new WeakMap();

/**
 * @class
 * Class for working with loans.
 */
var Loans = /*#__PURE__*/function () {
  function Loans() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Loans);

    _classPrivateFieldInitSpec(this, _api, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _fixed, {
      writable: true,
      value: void 0
    });

    (0, _classPrivateFieldSet2["default"])(this, _api, options === null || options === void 0 ? void 0 : options.api);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _fixed, options === null || options === void 0 ? void 0 : options.fixed);
  }
  /**
   * Gets loans in which your account is a participant.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.filters.counterparty - Loans where the counterparty is: `lender` or `borrower`
   * @param {string} options.filters.status - Loan status: `escrow`, `defaulted`, `repaid` or `liquidated`
   * @returns {Array<object>} Array of listing objects
   *
   * @example
   * // Get loans in `escrow` where your account is the `lender`
   * const loans = await nftfi.loans.get({
   *   filters: {
   *     counterparty: 'lender',
   *     status: 'escrow'
   *   }
   * });
   */


  (0, _createClass2["default"])(Loans, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var response, loans;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _classPrivateFieldGet2["default"])(this, _api).get({
                  uri: 'loans',
                  params: {
                    accountAddress: (0, _classPrivateFieldGet2["default"])(this, _account).getAddress(),
                    counterparty: options.filters.counterparty,
                    status: options.filters.status
                  }
                });

              case 2:
                response = _context.sent;
                loans = response['results'];
                return _context.abrupt("return", loans);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Liquidate `defaulted` loans in which your account is a participant.
     *
     * @param {object} options - Hashmap of config options for this method
     * @param {string} options.loan.id - The ID of the loan being liquidated
     * @param {string} options.nftfi.contract.name - The contract used to facilitate the loan: `v1.loan.fixed`, `v2.loan.fixed`
     * @returns {object} Response object
     *
     * @example
     * // Liquidate a v1 fixed loan
     * const loans = await nftfi.loans.get({
     *   loan: {
     *     id: 1
     *   },
     *   nftfi: {
     *     contract: {
     *       name: 'v1.loan.fixed'
     *     }
     *   }
     * });
     *
     * @example
     * // Liquidate a v2 fixed loan
     * const loans = await nftfi.loans.get({
     *   loan: {
     *     id: 2
     *   },
     *   nftfi: {
     *     contract: {
     *       name: 'v2.loan.fixed'
     *     }
     *   }
     * });
     */

  }, {
    key: "liquidate",
    value: function () {
      var _liquidate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var success;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                success = false;
                _context2.t0 = options.nftfi.contract.name;
                _context2.next = _context2.t0 === 'v1.loan.fixed' ? 4 : _context2.t0 === 'v2.loan.fixed' ? 8 : 12;
                break;

              case 4:
                _context2.next = 6;
                return (0, _classPrivateFieldGet2["default"])(this, _fixed).v1.liquidate({
                  loan: {
                    id: options.loan.id
                  }
                });

              case 6:
                success = _context2.sent;
                return _context2.abrupt("break", 12);

              case 8:
                _context2.next = 10;
                return (0, _classPrivateFieldGet2["default"])(this, _fixed).v2.liquidate({
                  loan: {
                    id: options.loan.id
                  }
                });

              case 10:
                success = _context2.sent;
                return _context2.abrupt("break", 12);

              case 12:
                return _context2.abrupt("return", {
                  success: success
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function liquidate(_x2) {
        return _liquidate.apply(this, arguments);
      }

      return liquidate;
    }()
  }]);
  return Loans;
}();

var _default = Loans;
exports["default"] = _default;