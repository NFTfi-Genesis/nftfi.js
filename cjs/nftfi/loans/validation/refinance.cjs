"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _yup = /*#__PURE__*/new WeakMap();
var LoansValidationRefinance = /*#__PURE__*/function () {
  function LoansValidationRefinance() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, LoansValidationRefinance);
    _classPrivateFieldInitSpec(this, _yup, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _yup, options === null || options === void 0 ? void 0 : options.yup);
  }
  (0, _createClass2["default"])(LoansValidationRefinance, [{
    key: "validateCurrencies",
    value: function () {
      var _validateCurrencies = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _options$loan, _options$loan$terms, _options$loan$terms$l, _options$loan$terms$l2, loanCurrency, optionsSchema;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              loanCurrency = options === null || options === void 0 ? void 0 : (_options$loan = options.loan) === null || _options$loan === void 0 ? void 0 : (_options$loan$terms = _options$loan.terms) === null || _options$loan$terms === void 0 ? void 0 : (_options$loan$terms$l = _options$loan$terms.loan) === null || _options$loan$terms$l === void 0 ? void 0 : (_options$loan$terms$l2 = _options$loan$terms$l.currency) === null || _options$loan$terms$l2 === void 0 ? void 0 : _options$loan$terms$l2.toLowerCase();
              optionsSchema = (0, _classPrivateFieldGet2["default"])(this, _yup).object({
                loan: (0, _classPrivateFieldGet2["default"])(this, _yup).object({
                  terms: (0, _classPrivateFieldGet2["default"])(this, _yup).object({
                    loan: (0, _classPrivateFieldGet2["default"])(this, _yup).object({
                      currency: (0, _classPrivateFieldGet2["default"])(this, _yup).string().required()
                    })
                  })
                }),
                offer: (0, _classPrivateFieldGet2["default"])(this, _yup).object({
                  terms: (0, _classPrivateFieldGet2["default"])(this, _yup).object({
                    loan: (0, _classPrivateFieldGet2["default"])(this, _yup).object({
                      currency: (0, _classPrivateFieldGet2["default"])(this, _yup).string().required().transform(function (value) {
                        return value.toLowerCase();
                      }).oneOf([loanCurrency], 'offer currency should match loan currency')
                    })
                  })
                })
              });
              _context.next = 5;
              return optionsSchema.validate(options, {
                abortEarly: true
              });
            case 5:
              _context.next = 10;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              throw (0, _defineProperty2["default"])({}, _context.t0.path, _context.t0.errors);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 7]]);
      }));
      function validateCurrencies(_x) {
        return _validateCurrencies.apply(this, arguments);
      }
      return validateCurrencies;
    }()
  }]);
  return LoansValidationRefinance;
}();
var _default = LoansValidationRefinance;
exports["default"] = _default;