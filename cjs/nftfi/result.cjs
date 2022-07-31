"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Result = /*#__PURE__*/function () {
  function Result() {
    (0, _classCallCheck2["default"])(this, Result);
  }

  (0, _createClass2["default"])(Result, [{
    key: "handle",
    value: function handle(res) {
      return {
        data: res,
        error: null
      };
    }
  }]);
  return Result;
}();

var _default = Result;
exports["default"] = _default;