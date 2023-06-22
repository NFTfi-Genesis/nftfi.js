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
var _axios = /*#__PURE__*/new WeakMap();
var Http = /*#__PURE__*/function () {
  function Http() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Http);
    _classPrivateFieldInitSpec(this, _axios, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _axios, options === null || options === void 0 ? void 0 : options.axios);
  }
  (0, _createClass2["default"])(Http, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(uri) {
        var options,
          execOptions,
          result,
          _execOptions$error,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              execOptions = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              _context.prev = 2;
              _context.next = 5;
              return (0, _classPrivateFieldGet2["default"])(this, _axios).get(uri, options);
            case 5:
              result = _context.sent;
              _context.next = 13;
              break;
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              if (!((_execOptions$error = execOptions.error) !== null && _execOptions$error !== void 0 && _execOptions$error.rethrow)) {
                _context.next = 12;
                break;
              }
              throw _context.t0;
            case 12:
              result = _context.t0.response;
            case 13:
              return _context.abrupt("return", result);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[2, 8]]);
      }));
      function get(_x) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(uri) {
        var options,
          result,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _context2.prev = 1;
              _context2.next = 4;
              return (0, _classPrivateFieldGet2["default"])(this, _axios)["delete"](uri, options);
            case 4:
              result = _context2.sent;
              _context2.next = 10;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](1);
              result = _context2.t0.response;
            case 10:
              return _context2.abrupt("return", result);
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[1, 7]]);
      }));
      function _delete(_x2) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(uri, body) {
        var options,
          result,
          _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
              _context3.prev = 1;
              _context3.next = 4;
              return (0, _classPrivateFieldGet2["default"])(this, _axios).post(uri, body, options);
            case 4:
              result = _context3.sent;
              _context3.next = 10;
              break;
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](1);
              result = _context3.t0.response;
            case 10:
              return _context3.abrupt("return", result);
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[1, 7]]);
      }));
      function post(_x3, _x4) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
  }]);
  return Http;
}();
var _default = Http;
exports["default"] = _default;