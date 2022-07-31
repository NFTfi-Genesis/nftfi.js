"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Error = /*#__PURE__*/function () {
  function Error() {
    (0, _classCallCheck2["default"])(this, Error);
  }

  (0, _createClass2["default"])(Error, [{
    key: "handle",
    value: function handle(e, message) {
      var _e$response, _e$response$data, _e$response2, _e$response2$data, _e$response3, _e$response3$data, _e$response4, _e$response4$data, _e$error, _e$error$data, _e$error$data$origina, _e$error2, _e$error2$data, _e$error2$data$origin;

      if (message) return {
        error: message
      };
      if (e !== null && e !== void 0 && (_e$response = e.response) !== null && _e$response !== void 0 && (_e$response$data = _e$response.data) !== null && _e$response$data !== void 0 && _e$response$data.message) return {
        error: e === null || e === void 0 ? void 0 : (_e$response2 = e.response) === null || _e$response2 === void 0 ? void 0 : (_e$response2$data = _e$response2.data) === null || _e$response2$data === void 0 ? void 0 : _e$response2$data.message
      };
      if (e !== null && e !== void 0 && (_e$response3 = e.response) !== null && _e$response3 !== void 0 && (_e$response3$data = _e$response3.data) !== null && _e$response3$data !== void 0 && _e$response3$data.errors) return {
        error: e === null || e === void 0 ? void 0 : (_e$response4 = e.response) === null || _e$response4 === void 0 ? void 0 : (_e$response4$data = _e$response4.data) === null || _e$response4$data === void 0 ? void 0 : _e$response4$data.errors
      };
      if (e !== null && e !== void 0 && (_e$error = e.error) !== null && _e$error !== void 0 && (_e$error$data = _e$error.data) !== null && _e$error$data !== void 0 && (_e$error$data$origina = _e$error$data.originalError) !== null && _e$error$data$origina !== void 0 && _e$error$data$origina.message) return {
        error: e === null || e === void 0 ? void 0 : (_e$error2 = e.error) === null || _e$error2 === void 0 ? void 0 : (_e$error2$data = _e$error2.data) === null || _e$error2$data === void 0 ? void 0 : (_e$error2$data$origin = _e$error2$data.originalError) === null || _e$error2$data$origin === void 0 ? void 0 : _e$error2$data$origin.message
      };
      if (e !== null && e !== void 0 && e.code) return {
        error: e.code
      };
      if (e !== null && e !== void 0 && e.message) return {
        error: e.message
      };
      return {
        error: e
      };
    }
  }]);
  return Error;
}();

var _default = Error;
exports["default"] = _default;