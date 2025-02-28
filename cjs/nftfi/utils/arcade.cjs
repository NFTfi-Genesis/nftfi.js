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
var _config = /*#__PURE__*/new WeakMap();
var _contractFactory = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var UtilsArcade = /*#__PURE__*/function () {
  function UtilsArcade() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, UtilsArcade);
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _contractFactory, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _error, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
  }
  (0, _createClass2["default"])(UtilsArcade, [{
    key: "getLoanData",
    value: function () {
      var _getLoanData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _loanData$2$, arcadeLoanCoreContract, loanData, loanCurrency, loanActive;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              arcadeLoanCoreContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.arcade.loan.core.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.arcade.loan.core.abi
              });
              _context.next = 4;
              return arcadeLoanCoreContract.call({
                "function": 'getLoan',
                args: [options.loan.id]
              });
            case 4:
              loanData = _context.sent;
              loanCurrency = loanData[2][5];
              loanActive = loanData[0] === 1 ? 'active' : null;
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                status: loanActive,
                date: {
                  started: loanData[1],
                  due: Number(loanData[1]) + Number(loanData[2][3])
                },
                nft: {
                  id: (_loanData$2$ = loanData[2][4]) === null || _loanData$2$ === void 0 ? void 0 : _loanData$2$.toString(),
                  address: loanData[2][2]
                },
                terms: {
                  loan: {
                    currency: loanCurrency.toLowerCase(),
                    principal: loanData[2][1].toString(),
                    duration: loanData[2][3].toString(),
                    interest: loanData[2][0].toString()
                  }
                }
              }));
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t0, null, options));
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 10]]);
      }));
      function getLoanData(_x) {
        return _getLoanData.apply(this, arguments);
      }
      return getLoanData;
    }()
  }]);
  return UtilsArcade;
}();
var _default = UtilsArcade;
exports["default"] = _default;