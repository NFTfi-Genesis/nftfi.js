"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var LoansHelper = /*#__PURE__*/function () {
  function LoansHelper() {
    (0, _classCallCheck2["default"])(this, LoansHelper);
  }
  (0, _createClass2["default"])(LoansHelper, [{
    key: "_addFilters",
    value: function _addFilters(options, params) {
      var _options$filters, _options$filters$borr, _options$filters2, _options$filters2$len, _options$filters3, _options$filters3$nft, _options$filters4;
      if ((_options$filters = options.filters) !== null && _options$filters !== void 0 && (_options$filters$borr = _options$filters.borrower) !== null && _options$filters$borr !== void 0 && _options$filters$borr.address) {
        params.borrowerAddress = options.filters.borrower.address;
      }
      if ((_options$filters2 = options.filters) !== null && _options$filters2 !== void 0 && (_options$filters2$len = _options$filters2.lender) !== null && _options$filters2$len !== void 0 && _options$filters2$len.address) {
        params.lenderAddress = options.filters.lender.address;
      }
      if ((_options$filters3 = options.filters) !== null && _options$filters3 !== void 0 && (_options$filters3$nft = _options$filters3.nft) !== null && _options$filters3$nft !== void 0 && _options$filters3$nft.addresses) {
        params.nftAddresses = options.filters.nft.addresses.join(',');
      }
      if ((_options$filters4 = options.filters) !== null && _options$filters4 !== void 0 && _options$filters4.status) {
        params.status = options.filters.status;
      }
      return params;
    }
  }, {
    key: "_addSort",
    value: function _addSort(options, params) {
      var _options$sort, _options$sort2;
      if ((_options$sort = options.sort) !== null && _options$sort !== void 0 && _options$sort.by) {
        params.sortBy = options.sort.by;
      }
      if ((_options$sort2 = options.sort) !== null && _options$sort2 !== void 0 && _options$sort2.direction) {
        params.sortDirection = options.sort.direction;
      }
      return params;
    }
  }, {
    key: "_addPagination",
    value: function _addPagination(options, params) {
      var _options$pagination, _options$pagination2;
      if ((_options$pagination = options.pagination) !== null && _options$pagination !== void 0 && _options$pagination.page) {
        params.page = options.pagination.page;
      }
      if ((_options$pagination2 = options.pagination) !== null && _options$pagination2 !== void 0 && _options$pagination2.limit) {
        params.limit = options.pagination.limit;
      }
      return params;
    }
  }, {
    key: "getParams",
    value: function getParams(options) {
      var params = {};
      params = this._addFilters(options, params);
      params = this._addSort(options, params);
      params = this._addPagination(options, params);
      return params;
    }
  }]);
  return LoansHelper;
}();
var _default = LoansHelper;
exports["default"] = _default;