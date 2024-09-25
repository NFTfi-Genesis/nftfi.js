"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _config = /*#__PURE__*/new WeakMap();
var _axios = /*#__PURE__*/new WeakMap();
var _loggerFactory = /*#__PURE__*/new WeakMap();
var Http = /*#__PURE__*/function () {
  function Http() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Http);
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _axios, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _loggerFactory, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _axios, options === null || options === void 0 ? void 0 : options.axios);
    (0, _classPrivateFieldSet2["default"])(this, _loggerFactory, options === null || options === void 0 ? void 0 : options.loggerFactory);
  }
  (0, _createClass2["default"])(Http, [{
    key: "_addHeaders",
    value: function _addHeaders(options) {
      var _options;
      options = _objectSpread(_objectSpread({}, options), {}, {
        headers: _objectSpread(_objectSpread({}, (_options = options) === null || _options === void 0 ? void 0 : _options.headers), {}, {
          'X-SDK-Version': (0, _classPrivateFieldGet2["default"])(this, _config).version
        })
      });
      return options;
    }
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(uri) {
        var options,
          execOptions,
          logger,
          result,
          _execOptions$error,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              execOptions = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              logger = (0, _classPrivateFieldGet2["default"])(this, _loggerFactory).create({
                scope: 'HTTP_REQ',
                id: Date.now()
              });
              _context.prev = 3;
              options = this._addHeaders(options);
              _context.next = 7;
              return (0, _classPrivateFieldGet2["default"])(this, _axios).get(uri, options);
            case 7:
              result = _context.sent;
              logger.info('HTTP GET request successful: ', uri, options, result);
              _context.next = 17;
              break;
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);
              logger.error('HTTP GET request failed: ', uri, options, _context.t0);
              if (!((_execOptions$error = execOptions.error) !== null && _execOptions$error !== void 0 && _execOptions$error.rethrow)) {
                _context.next = 16;
                break;
              }
              throw _context.t0;
            case 16:
              result = _context.t0.response;
            case 17:
              return _context.abrupt("return", result);
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[3, 11]]);
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
          logger,
          result,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              logger = (0, _classPrivateFieldGet2["default"])(this, _loggerFactory).create({
                scope: 'HTTP_REQ',
                id: Date.now()
              });
              _context2.prev = 2;
              options = this._addHeaders(options);
              _context2.next = 6;
              return (0, _classPrivateFieldGet2["default"])(this, _axios)["delete"](uri, options);
            case 6:
              result = _context2.sent;
              logger.info('HTTP DELETE request successful: ', uri, options, result);
              _context2.next = 14;
              break;
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](2);
              logger.error('HTTP DELETE request failed: ', uri, options, _context2.t0);
              result = _context2.t0.response;
            case 14:
              return _context2.abrupt("return", result);
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[2, 10]]);
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
          logger,
          result,
          _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
              logger = (0, _classPrivateFieldGet2["default"])(this, _loggerFactory).create({
                scope: 'HTTP_REQ',
                id: Date.now()
              });
              _context3.prev = 2;
              options = this._addHeaders(options);
              _context3.next = 6;
              return (0, _classPrivateFieldGet2["default"])(this, _axios).post(uri, body, options);
            case 6:
              result = _context3.sent;
              logger.info('HTTP POST request successful: ', uri, options, result);
              _context3.next = 14;
              break;
            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](2);
              logger.error('HTTP POST request failed: ', uri, options, _context3.t0);
              result = _context3.t0.response;
            case 14:
              return _context3.abrupt("return", result);
            case 15:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[2, 10]]);
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