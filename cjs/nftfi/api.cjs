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

    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _auth, options === null || options === void 0 ? void 0 : options.auth);
    (0, _classPrivateFieldSet2["default"])(this, _http, options === null || options === void 0 ? void 0 : options.http);
  }

  (0, _createClass2["default"])(API, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var uri, params, authToken, headers, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                uri = "".concat((0, _classPrivateFieldGet2["default"])(this, _config).api.baseURI, "/").concat(options.uri);
                params = options === null || options === void 0 ? void 0 : options.params;
                _context.next = 4;
                return (0, _classPrivateFieldGet2["default"])(this, _auth).getToken();

              case 4:
                authToken = _context.sent;
                headers = {
                  'X-API-Key': (0, _classPrivateFieldGet2["default"])(this, _config).api.key,
                  Authorization: "Bearer ".concat(authToken)
                };
                _context.next = 8;
                return (0, _classPrivateFieldGet2["default"])(this, _http).get(uri, {
                  headers: headers,
                  params: params
                });

              case 8:
                result = _context.sent;
                return _context.abrupt("return", result.data);

              case 10:
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
  }, {
    key: "post",
    value: function () {
      var _post = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var uri, authToken, headers, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                uri = "".concat((0, _classPrivateFieldGet2["default"])(this, _config).api.baseURI, "/").concat(options.uri);
                _context2.next = 3;
                return (0, _classPrivateFieldGet2["default"])(this, _auth).getToken();

              case 3:
                authToken = _context2.sent;
                headers = {
                  'X-API-Key': (0, _classPrivateFieldGet2["default"])(this, _config).api.key,
                  Authorization: "Bearer ".concat(authToken)
                };
                _context2.next = 7;
                return (0, _classPrivateFieldGet2["default"])(this, _http).post(uri, options.payload, {
                  headers: headers
                });

              case 7:
                result = _context2.sent;
                return _context2.abrupt("return", result.data);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function post(_x2) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var uri, authToken, headers, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                uri = "".concat((0, _classPrivateFieldGet2["default"])(this, _config).api.baseURI, "/").concat(options.uri);
                _context3.next = 3;
                return (0, _classPrivateFieldGet2["default"])(this, _auth).getToken();

              case 3:
                authToken = _context3.sent;
                headers = {
                  'X-API-Key': (0, _classPrivateFieldGet2["default"])(this, _config).api.key,
                  Authorization: "Bearer ".concat(authToken)
                };
                _context3.next = 7;
                return (0, _classPrivateFieldGet2["default"])(this, _http)["delete"](uri, {
                  headers: headers
                });

              case 7:
                result = _context3.sent;
                return _context3.abrupt("return", result.data);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete(_x3) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return API;
}();

var _default = API;
exports["default"] = _default;