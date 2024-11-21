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
    value: function handle(e, message, options) {
      var _e$error, _e$error2, _e$response, _e$response$data, _e$response2, _e$response2$data, _e$response3, _e$response3$data, _e$response4, _e$response4$data, _e$error3, _e$error3$data, _e$error3$data$origin, _e$error4, _e$error4$data, _e$error4$data$origin, _e$error5, _e$error5$data;
      if (message) return {
        error: message,
        raw: e,
        options: options,
        success: false
      };
      if (e !== null && e !== void 0 && e.errors) return {
        error: e === null || e === void 0 ? void 0 : e.errors,
        raw: e,
        options: options,
        success: false
      };
      if (e !== null && e !== void 0 && (_e$error = e.error) !== null && _e$error !== void 0 && _e$error.reason) return {
        error: e === null || e === void 0 ? void 0 : (_e$error2 = e.error) === null || _e$error2 === void 0 ? void 0 : _e$error2.reason,
        raw: e,
        options: options,
        success: false
      };
      if (e !== null && e !== void 0 && (_e$response = e.response) !== null && _e$response !== void 0 && (_e$response$data = _e$response.data) !== null && _e$response$data !== void 0 && _e$response$data.message) return {
        error: e === null || e === void 0 ? void 0 : (_e$response2 = e.response) === null || _e$response2 === void 0 ? void 0 : (_e$response2$data = _e$response2.data) === null || _e$response2$data === void 0 ? void 0 : _e$response2$data.message,
        raw: e,
        options: options,
        success: false
      };
      if (e !== null && e !== void 0 && (_e$response3 = e.response) !== null && _e$response3 !== void 0 && (_e$response3$data = _e$response3.data) !== null && _e$response3$data !== void 0 && _e$response3$data.errors) return {
        error: e === null || e === void 0 ? void 0 : (_e$response4 = e.response) === null || _e$response4 === void 0 ? void 0 : (_e$response4$data = _e$response4.data) === null || _e$response4$data === void 0 ? void 0 : _e$response4$data.errors,
        raw: e,
        options: options,
        success: false
      };
      if (e !== null && e !== void 0 && (_e$error3 = e.error) !== null && _e$error3 !== void 0 && (_e$error3$data = _e$error3.data) !== null && _e$error3$data !== void 0 && (_e$error3$data$origin = _e$error3$data.originalError) !== null && _e$error3$data$origin !== void 0 && _e$error3$data$origin.message) return {
        error: e === null || e === void 0 ? void 0 : (_e$error4 = e.error) === null || _e$error4 === void 0 ? void 0 : (_e$error4$data = _e$error4.data) === null || _e$error4$data === void 0 ? void 0 : (_e$error4$data$origin = _e$error4$data.originalError) === null || _e$error4$data$origin === void 0 ? void 0 : _e$error4$data$origin.message,
        raw: e,
        options: options,
        success: false
      };
      if (e !== null && e !== void 0 && (_e$error5 = e.error) !== null && _e$error5 !== void 0 && (_e$error5$data = _e$error5.data) !== null && _e$error5$data !== void 0 && _e$error5$data.message) return {
        error: e.error.data.message,
        raw: e,
        options: options,
        success: false
      };
      if (e !== null && e !== void 0 && e.code) return {
        error: e.code,
        raw: e,
        options: options,
        success: false
      };
      if (e !== null && e !== void 0 && e.message) return {
        error: e.message,
        raw: e,
        options: options,
        success: false
      };
      return {
        error: e,
        raw: e,
        options: options,
        success: false
      };
    }
  }]);
  return Error;
}();
var _default = Error;
exports["default"] = _default;