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
var _websocket = /*#__PURE__*/new WeakMap();
var Events = /*#__PURE__*/function () {
  function Events(options) {
    (0, _classCallCheck2["default"])(this, Events);
    _classPrivateFieldInitSpec(this, _websocket, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _websocket, options.websocket);
  }

  /* eslint-disable no-unused-vars */
  (0, _createClass2["default"])(Events, [{
    key: "subscribe",
    value: function subscribe() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Handle errors
      (0, _classPrivateFieldGet2["default"])(this, _websocket).client.on('error', function (error) {
        if (callbacks !== null && callbacks !== void 0 && callbacks.onError) {
          callbacks.onError(error);
        }
      });
      // Handle messages
      (0, _classPrivateFieldGet2["default"])(this, _websocket).client.on('message', function (message) {
        if (callbacks !== null && callbacks !== void 0 && callbacks.onMessage) {
          callbacks.onMessage(message);
        }
      });
      // Handle events
      (0, _classPrivateFieldGet2["default"])(this, _websocket).client.on('event', function (event) {
        if (callbacks !== null && callbacks !== void 0 && callbacks.onEvent) {
          var e = JSON.parse(event);
          callbacks.onEvent(e);
        }
      });
    }
  }]);
  return Events;
}();
exports["default"] = Events;