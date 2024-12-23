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
var _contractFactory = /*#__PURE__*/new WeakMap();
var _loanCoordinator = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var _ethers = /*#__PURE__*/new WeakMap();
var LoansHelper = /*#__PURE__*/function () {
  function LoansHelper(options) {
    (0, _classCallCheck2["default"])(this, LoansHelper);
    _classPrivateFieldInitSpec(this, _contractFactory, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _loanCoordinator, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
  }
  (0, _createClass2["default"])(LoansHelper, [{
    key: "_getLoanCoordinator",
    value: function _getLoanCoordinator() {
      if (!(0, _classPrivateFieldGet2["default"])(this, _loanCoordinator)) {
        (0, _classPrivateFieldSet2["default"])(this, _loanCoordinator, (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
          address: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.coordinator.address,
          abi: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.coordinator.abi
        }));
      }
      return (0, _classPrivateFieldGet2["default"])(this, _loanCoordinator);
    }
  }, {
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
  }, {
    key: "getLoanData",
    value: function () {
      var _getLoanData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var loanData, offerType, loanContractAddress;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._getLoanCoordinator().call({
                "function": 'getLoanDataAndOfferType',
                args: [options.loan.id]
              });
            case 2:
              loanData = _context.sent;
              offerType = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.parseBytes32String(loanData[1]);
              loanContractAddress = loanData[0][0];
              return _context.abrupt("return", {
                offerType: offerType,
                loanContractAddress: loanContractAddress
              });
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getLoanData(_x) {
        return _getLoanData.apply(this, arguments);
      }
      return getLoanData;
    }()
  }]);
  return LoansHelper;
}();
var _default = LoansHelper;
exports["default"] = _default;