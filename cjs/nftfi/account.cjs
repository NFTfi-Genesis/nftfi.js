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

var _address = /*#__PURE__*/new WeakMap();

var _signer = /*#__PURE__*/new WeakMap();

var Account = /*#__PURE__*/function () {
  function Account() {
    var _options$address;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Account);

    _classPrivateFieldInitSpec(this, _address, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _signer, {
      writable: true,
      value: void 0
    });

    (0, _classPrivateFieldSet2["default"])(this, _address, options === null || options === void 0 ? void 0 : (_options$address = options.address) === null || _options$address === void 0 ? void 0 : _options$address.toLowerCase());
    (0, _classPrivateFieldSet2["default"])(this, _signer, options === null || options === void 0 ? void 0 : options.signer);
  }

  (0, _createClass2["default"])(Account, [{
    key: "getAddress",
    value: function getAddress() {
      return (0, _classPrivateFieldGet2["default"])(this, _address);
    }
  }, {
    key: "getSigner",
    value: function getSigner() {
      return (0, _classPrivateFieldGet2["default"])(this, _signer);
    }
  }, {
    key: "sign",
    value: function () {
      var _sign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(msg) {
        var signedMsg;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                signedMsg = (0, _classPrivateFieldGet2["default"])(this, _signer).signMessage(msg);
                return _context.abrupt("return", signedMsg);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sign(_x) {
        return _sign.apply(this, arguments);
      }

      return sign;
    }()
  }]);
  return Account;
}();

var _default = Account;
exports["default"] = _default;