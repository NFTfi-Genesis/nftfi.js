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

var _account = /*#__PURE__*/new WeakMap();

var _ethers = /*#__PURE__*/new WeakMap();

var _config = /*#__PURE__*/new WeakMap();

var _abi = /*#__PURE__*/new WeakMap();

var LoanFixedV1 = /*#__PURE__*/function () {
  function LoanFixedV1(options) {
    (0, _classCallCheck2["default"])(this, LoanFixedV1);

    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _abi, {
      writable: true,
      value: void 0
    });

    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _abi, ['function liquidateOverdueLoan(uint256 _loanId) nonpayable returns()']);
  }

  (0, _createClass2["default"])(LoanFixedV1, [{
    key: "liquidate",
    value: function () {
      var _liquidate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var result, signer, contract;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = true;
                _context.prev = 1;
                _context.next = 4;
                return (0, _classPrivateFieldGet2["default"])(this, _account).getSigner();

              case 4:
                signer = _context.sent;
                contract = new ((0, _classPrivateFieldGet2["default"])(this, _ethers).Contract)((0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v1.address, (0, _classPrivateFieldGet2["default"])(this, _abi), signer);
                _context.next = 8;
                return contract.liquidateOverdueLoan(options.loan.id);

              case 8:
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](1);
                result = false;

              case 13:
                return _context.abrupt("return", result);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 10]]);
      }));

      function liquidate(_x) {
        return _liquidate.apply(this, arguments);
      }

      return liquidate;
    }()
  }]);
  return LoanFixedV1;
}();

var _default = LoanFixedV1;
exports["default"] = _default;