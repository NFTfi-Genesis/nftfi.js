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
var _auth = /*#__PURE__*/new WeakMap();
var _http = /*#__PURE__*/new WeakMap();
var _assertion = /*#__PURE__*/new WeakMap();
var _mutex = /*#__PURE__*/new WeakMap();
var API = /*#__PURE__*/function () {
  function API() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, API);
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _auth, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _http, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _assertion, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _mutex, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _auth, options === null || options === void 0 ? void 0 : options.auth);
    (0, _classPrivateFieldSet2["default"])(this, _http, options === null || options === void 0 ? void 0 : options.http);
    (0, _classPrivateFieldSet2["default"])(this, _assertion, options === null || options === void 0 ? void 0 : options.assertion);
    (0, _classPrivateFieldSet2["default"])(this, _mutex, options === null || options === void 0 ? void 0 : options.mutex);
  }
  (0, _createClass2["default"])(API, [{
    key: "getAuthHeader",
    value: function () {
      var _getAuthHeader = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _options$auth, _options$auth2, _options$auth3;
        var release, headers, _options$auth4, authToken;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              release = function release() {};
              headers = {
                'X-API-Key': (0, _classPrivateFieldGet2["default"])(this, _config).api.key
              };
              if (!((options === null || options === void 0 ? void 0 : (_options$auth = options.auth) === null || _options$auth === void 0 ? void 0 : _options$auth.token) === 'required' || (options === null || options === void 0 ? void 0 : (_options$auth2 = options.auth) === null || _options$auth2 === void 0 ? void 0 : _options$auth2.token) === 'optional' || (options === null || options === void 0 ? void 0 : (_options$auth3 = options.auth) === null || _options$auth3 === void 0 ? void 0 : _options$auth3.token) === 'ifpresent')) {
                _context.next = 15;
                break;
              }
              _context.prev = 3;
              if (options.auth.token === 'required') {
                (0, _classPrivateFieldGet2["default"])(this, _assertion).hasSigner();
              }
              _context.next = 7;
              return (0, _classPrivateFieldGet2["default"])(this, _mutex).acquire();
            case 7:
              release = _context.sent;
              _context.next = 10;
              return (0, _classPrivateFieldGet2["default"])(this, _auth).getToken({
                noSigning: (options === null || options === void 0 ? void 0 : (_options$auth4 = options.auth) === null || _options$auth4 === void 0 ? void 0 : _options$auth4.token) === 'ifpresent'
              });
            case 10:
              authToken = _context.sent;
              if (authToken) headers['Authorization'] = "Bearer ".concat(authToken);
            case 12:
              _context.prev = 12;
              release();
              return _context.finish(12);
            case 15:
              return _context.abrupt("return", headers);
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[3,, 12, 15]]);
      }));
      function getAuthHeader(_x) {
        return _getAuthHeader.apply(this, arguments);
      }
      return getAuthHeader;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var httpOptions,
          uri,
          params,
          headers,
          opts,
          result,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              httpOptions = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              uri = this.concatUri(options.uri);
              params = options === null || options === void 0 ? void 0 : options.params;
              _context2.next = 5;
              return this.getAuthHeader(options);
            case 5:
              headers = _context2.sent;
              opts = {
                params: params
              };
              if (headers) opts = {
                headers: headers,
                params: params
              };
              _context2.next = 10;
              return (0, _classPrivateFieldGet2["default"])(this, _http).get(uri, opts, httpOptions);
            case 10:
              result = _context2.sent;
              return _context2.abrupt("return", result.data);
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function get(_x2) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var uri, headers, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              uri = this.concatUri(options.uri);
              _context3.next = 3;
              return this.getAuthHeader(options);
            case 3:
              headers = _context3.sent;
              _context3.next = 6;
              return (0, _classPrivateFieldGet2["default"])(this, _http).post(uri, options.payload, {
                headers: headers
              });
            case 6:
              result = _context3.sent;
              return _context3.abrupt("return", result.data);
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function post(_x3) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var uri, headers, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              uri = this.concatUri(options.uri);
              _context4.next = 3;
              return this.getAuthHeader(options);
            case 3:
              headers = _context4.sent;
              _context4.next = 6;
              return (0, _classPrivateFieldGet2["default"])(this, _http)["delete"](uri, {
                headers: headers
              });
            case 6:
              result = _context4.sent;
              return _context4.abrupt("return", result.data);
            case 8:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function _delete(_x4) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "concatUri",
    value: function concatUri(path) {
      var url = new URL(path, (0, _classPrivateFieldGet2["default"])(this, _config).api.baseURI);
      return url.href;
    }
  }]);
  return API;
}();
var _default = API;
exports["default"] = _default;