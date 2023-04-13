"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _client = /*#__PURE__*/new WeakMap();
var _io = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var Websocket = /*#__PURE__*/function () {
  function Websocket(options) {
    (0, _classCallCheck2["default"])(this, Websocket);
    _classPrivateFieldInitSpec(this, _client, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _io, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options.config);
    (0, _classPrivateFieldSet2["default"])(this, _io, options.io);
    (0, _classPrivateFieldSet2["default"])(this, _client, null);
  }
  (0, _createClass2["default"])(Websocket, [{
    key: "client",
    get: function get() {
      if (!(0, _classPrivateFieldGet2["default"])(this, _client)) {
        (0, _classPrivateFieldSet2["default"])(this, _client, (0, _classPrivateFieldGet2["default"])(this, _io).call(this, (0, _classPrivateFieldGet2["default"])(this, _config).websocket.baseURI, {
          path: '/websocket',
          origins: '*',
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttemps: 10,
          transports: ['websocket'],
          agent: false,
          upgrade: true,
          rejectUnauthorized: false,
          extraHeaders: {
            'x-api-key': (0, _classPrivateFieldGet2["default"])(this, _config).api.key
          }
        }));
      }
      return (0, _classPrivateFieldGet2["default"])(this, _client);
    }
  }]);
  return Websocket;
}();
exports["default"] = Websocket;