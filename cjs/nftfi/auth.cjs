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

    (0, _classPrivateFieldSet2["default"])(this, _http, options === null || options === void 0 ? void 0 : options.http);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _utils, options === null || options === void 0 ? void 0 : options.utils);
    (0, _classPrivateFieldGet2["default"])(this, _token);
  }

  (0, _createClass2["default"])(Auth, [{
    key: "getToken",
    value: function () {
      var _getToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _result$data, _result$data$result, nonce, accountAddress, message, messageToSign, signedMessage, body, uri, headers, result, token, _result$data2;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if ((0, _classPrivateFieldGet2["default"])(this, _token)) {
                  _context.next = 20;
                  break;
                }

                nonce = (0, _classPrivateFieldGet2["default"])(this, _utils).getNonce();
                accountAddress = (0, _classPrivateFieldGet2["default"])(this, _account).getAddress();
                message = "This message proves you own this wallet address : ".concat((0, _classPrivateFieldGet2["default"])(this, _account).getAddress());
                messageToSign = "".concat(message, "\r\n\r\nChainId : ").concat((0, _classPrivateFieldGet2["default"])(this, _config).chainId, "\r\nNonce : ").concat(nonce, ")");
                _context.next = 7;
                return (0, _classPrivateFieldGet2["default"])(this, _account).sign(messageToSign);

              case 7:
                signedMessage = _context.sent;
                body = {
                  message: message,
                  nonce: nonce,
                  accountAddress: accountAddress,
                  signedMessage: signedMessage
                };
                uri = "".concat((0, _classPrivateFieldGet2["default"])(this, _config).api.baseURI, "/authorization/token");
                headers = {
                  'X-API-Key': (0, _classPrivateFieldGet2["default"])(this, _config).api.key
                };
                _context.next = 13;
                return (0, _classPrivateFieldGet2["default"])(this, _http).post(uri, body, {
                  headers: headers
                });

              case 13:
                result = _context.sent;
                token = result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : (_result$data$result = _result$data.result) === null || _result$data$result === void 0 ? void 0 : _result$data$result.token;

                if (!token) {
                  _context.next = 19;
                  break;
                }

                (0, _classPrivateFieldSet2["default"])(this, _token, token);
                _context.next = 20;
                break;

              case 19:
                throw result === null || result === void 0 ? void 0 : (_result$data2 = result.data) === null || _result$data2 === void 0 ? void 0 : _result$data2.message;

              case 20:
                return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _token));

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
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