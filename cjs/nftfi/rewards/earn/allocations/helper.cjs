"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var AllocationsHelper = /*#__PURE__*/function () {
  function AllocationsHelper() {
    (0, _classCallCheck2["default"])(this, AllocationsHelper);
  }
  (0, _createClass2["default"])(AllocationsHelper, [{
    key: "_addSeason",
    value: function _addSeason(options, params) {
      var _options$season;
      if (options !== null && options !== void 0 && (_options$season = options.season) !== null && _options$season !== void 0 && _options$season.id) {
        params.seasonId = options.season.id;
      }
      return params;
    }
  }, {
    key: "getParams",
    value: function getParams(options) {
      var params = {};
      params = this._addSeason(options, params);
      return params;
    }
  }]);
  return AllocationsHelper;
}();
var _default = AllocationsHelper;
exports["default"] = _default;