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
var _http = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var _utils = /*#__PURE__*/new WeakMap();
var _token = /*#__PURE__*/new WeakMap();
var _storage = /*#__PURE__*/new WeakMap();
var Auth = /*#__PURE__*/function () {
  function Auth() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Auth);
    _classPrivateFieldInitSpec(this, _http, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _utils, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _token, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _storage, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _http, options === null || options === void 0 ? void 0 : options.http);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _utils, options === null || options === void 0 ? void 0 : options.utils);
    (0, _classPrivateFieldSet2["default"])(this, _storage, options === null || options === void 0 ? void 0 : options.storage);
    (0, _classPrivateFieldGet2["default"])(this, _token);
  }
  (0, _createClass2["default"])(Auth, [{
    key: "_isTokenValid",
    value: function _isTokenValid(token) {
      if (token) {
        var accountAddress = (0, _classPrivateFieldGet2["default"])(this, _account).getAuthAddress();
        var decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        return Date.now() < decodedToken.exp * 1000 && decodedToken.account.toLowerCase() === accountAddress.toLowerCase();
      }
      return false;
    }
  }, {
    key: "getToken",
    value: function () {
      var _getToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var sdkToken, sdkRefreshToken, _result$data, _result$data$result, _result$data2, _result$data2$result, uri, headers, result, token, refreshToken, _result$data3, _result$data3$result, _result$data4, _result$data4$result, nonce, accountAddress, message, messageToSign, signedMessage, multisig, body, _uri, _headers, _result, _token2, _refreshToken, error;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!this._isTokenValid((0, _classPrivateFieldGet2["default"])(this, _token))) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _token));
            case 2:
              sdkToken = (0, _classPrivateFieldGet2["default"])(this, _storage).get((0, _classPrivateFieldGet2["default"])(this, _config).auth.token.key);
              if (!this._isTokenValid(sdkToken)) {
                _context.next = 6;
                break;
              }
              (0, _classPrivateFieldSet2["default"])(this, _token, sdkToken);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _token));
            case 6:
              sdkRefreshToken = (0, _classPrivateFieldGet2["default"])(this, _storage).get((0, _classPrivateFieldGet2["default"])(this, _config).auth.refreshToken.key);
              if (!sdkRefreshToken) {
                _context.next = 20;
                break;
              }
              uri = "".concat((0, _classPrivateFieldGet2["default"])(this, _config).api.baseURI, "/v0.1/authorization/refresh-token");
              headers = {
                'X-API-Key': (0, _classPrivateFieldGet2["default"])(this, _config).api.key
              };
              _context.next = 12;
              return (0, _classPrivateFieldGet2["default"])(this, _http).post(uri, {
                refreshToken: sdkRefreshToken
              }, {
                headers: headers
              });
            case 12:
              result = _context.sent;
              token = result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : (_result$data$result = _result$data.result) === null || _result$data$result === void 0 ? void 0 : _result$data$result.token;
              refreshToken = result === null || result === void 0 ? void 0 : (_result$data2 = result.data) === null || _result$data2 === void 0 ? void 0 : (_result$data2$result = _result$data2.result) === null || _result$data2$result === void 0 ? void 0 : _result$data2$result.refreshToken;
              if (!this._isTokenValid(token)) {
                _context.next = 20;
                break;
              }
              (0, _classPrivateFieldGet2["default"])(this, _storage).set((0, _classPrivateFieldGet2["default"])(this, _config).auth.token.key, token);
              (0, _classPrivateFieldGet2["default"])(this, _storage).set((0, _classPrivateFieldGet2["default"])(this, _config).auth.refreshToken.key, refreshToken);
              (0, _classPrivateFieldSet2["default"])(this, _token, sdkToken);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _token));
            case 20:
              _context.prev = 20;
              if (!(0, _classPrivateFieldGet2["default"])(this, _account).getSigner()) {
                _context.next = 39;
                break;
              }
              nonce = (0, _classPrivateFieldGet2["default"])(this, _utils).getNonce();
              accountAddress = (0, _classPrivateFieldGet2["default"])(this, _account).getAuthAddress();
              message = "This message proves you own this wallet address : ".concat((0, _classPrivateFieldGet2["default"])(this, _account).getAuthAddress());
              messageToSign = "".concat(message, "\r\n\r\nChainId : ").concat((0, _classPrivateFieldGet2["default"])(this, _config).chainId, "\r\nNonce : ").concat(nonce, ")");
              _context.next = 28;
              return (0, _classPrivateFieldGet2["default"])(this, _account).authSign(messageToSign);
            case 28:
              signedMessage = _context.sent;
              multisig = (0, _classPrivateFieldGet2["default"])(this, _account).isMultisig();
              body = {
                message: message,
                nonce: nonce,
                accountAddress: accountAddress,
                signedMessage: signedMessage,
                multisig: multisig
              };
              _uri = "".concat((0, _classPrivateFieldGet2["default"])(this, _config).api.baseURI, "/v0.1/authorization/token");
              _headers = {
                'X-API-Key': (0, _classPrivateFieldGet2["default"])(this, _config).api.key
              };
              _context.next = 35;
              return (0, _classPrivateFieldGet2["default"])(this, _http).post(_uri, body, {
                headers: _headers
              });
            case 35:
              _result = _context.sent;
              _token2 = _result === null || _result === void 0 ? void 0 : (_result$data3 = _result.data) === null || _result$data3 === void 0 ? void 0 : (_result$data3$result = _result$data3.result) === null || _result$data3$result === void 0 ? void 0 : _result$data3$result.token;
              _refreshToken = _result === null || _result === void 0 ? void 0 : (_result$data4 = _result.data) === null || _result$data4 === void 0 ? void 0 : (_result$data4$result = _result$data4.result) === null || _result$data4$result === void 0 ? void 0 : _result$data4$result.refreshToken;
              if (_token2 && _refreshToken) {
                (0, _classPrivateFieldGet2["default"])(this, _storage).set((0, _classPrivateFieldGet2["default"])(this, _config).auth.token.key, _token2);
                (0, _classPrivateFieldGet2["default"])(this, _storage).set((0, _classPrivateFieldGet2["default"])(this, _config).auth.refreshToken.key, _refreshToken);
                (0, _classPrivateFieldSet2["default"])(this, _token, _token2);
              }
            case 39:
              _context.next = 46;
              break;
            case 41:
              _context.prev = 41;
              _context.t0 = _context["catch"](20);
              error = {
                error: _context.t0,
                date: new Date()
              };
              (0, _classPrivateFieldGet2["default"])(this, _storage).set((0, _classPrivateFieldGet2["default"])(this, _config).auth.tokenError.key, JSON.stringify(error));
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _token));
            case 46:
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _token));
            case 47:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[20, 41]]);
      }));
      function getToken() {
        return _getToken.apply(this, arguments);
      }
      return getToken;
    }()
  }]);
  return Auth;
}();
var _default = Auth;
exports["default"] = _default;