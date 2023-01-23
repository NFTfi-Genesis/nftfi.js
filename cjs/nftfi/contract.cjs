"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet5 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _account = /*#__PURE__*/new WeakMap();
var _contract = /*#__PURE__*/new WeakMap();
var Contract = /*#__PURE__*/function () {
  function Contract(options) {
    (0, _classCallCheck2["default"])(this, Contract);
    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _contract, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _contract, options === null || options === void 0 ? void 0 : options.contract);
  }
  (0, _createClass2["default"])(Contract, [{
    key: "_parseLogs",
    value: function _parseLogs(logs) {
      logs = logs || [];
      if (logs && logs.length > 0) {
        return logs.map(function (log) {
          try {
            var event = (0, _classPrivateFieldGet5["default"])(this, _contract)["interface"].parseLog(log);
            return {
              name: event.name,
              args: event.args,
              frag: event.eventFragment
            };
          } catch (e) {
            // Cant find suitable entry in contract ABI.
            return false;
          }
        }, this).filter(function (log) {
          return log;
        });
      } else {
        return logs;
      }
    }
  }, {
    key: "call",
    value: function () {
      var _call = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var result, isViewFn, _classPrivateFieldGet2, _classPrivateFieldGet3, _result, tx;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              isViewFn = this._isViewFn(options["function"]);
              if (!isViewFn) {
                _context.next = 5;
                break;
              }
              result = (_classPrivateFieldGet2 = (0, _classPrivateFieldGet5["default"])(this, _contract))[options["function"]].apply(_classPrivateFieldGet2, (0, _toConsumableArray2["default"])(options.args));
              _context.next = 12;
              break;
            case 5:
              _context.next = 7;
              return (_classPrivateFieldGet3 = (0, _classPrivateFieldGet5["default"])(this, _contract).populateTransaction)[options["function"]].apply(_classPrivateFieldGet3, (0, _toConsumableArray2["default"])(options.args));
            case 7:
              tx = _context.sent;
              _context.next = 10;
              return (0, _classPrivateFieldGet5["default"])(this, _account).execTransaction(tx);
            case 10:
              result = _context.sent;
              result.logs = this._parseLogs((_result = result) === null || _result === void 0 ? void 0 : _result.logs);
            case 12:
              return _context.abrupt("return", result);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function call(_x) {
        return _call.apply(this, arguments);
      }
      return call;
    }()
  }, {
    key: "events",
    value: function () {
      var _events = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var events, _classPrivateFieldGet4, _options$pagination, _options$pagination2, filter;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              events = [];
              _context2.prev = 1;
              filter = (_classPrivateFieldGet4 = (0, _classPrivateFieldGet5["default"])(this, _contract).filters)[options.type].apply(_classPrivateFieldGet4, (0, _toConsumableArray2["default"])(options.args));
              _context2.next = 5;
              return (0, _classPrivateFieldGet5["default"])(this, _contract).queryFilter(filter);
            case 5:
              events = _context2.sent;
              events = !(options !== null && options !== void 0 && options.pagination) ? events : this._paginate(events, options === null || options === void 0 ? void 0 : (_options$pagination = options.pagination) === null || _options$pagination === void 0 ? void 0 : _options$pagination.page, options === null || options === void 0 ? void 0 : (_options$pagination2 = options.pagination) === null || _options$pagination2 === void 0 ? void 0 : _options$pagination2.limit);
              _context2.next = 11;
              break;
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](1);
            case 11:
              return _context2.abrupt("return", events);
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[1, 9]]);
      }));
      function events(_x2) {
        return _events.apply(this, arguments);
      }
      return events;
    }()
  }, {
    key: "_paginate",
    value: function _paginate(rows, page, limit) {
      return rows.slice((page - 1) * limit, page * limit);
    }
  }, {
    key: "_isViewFn",
    value: function _isViewFn(fn) {
      try {
        var fragment = this._getFnFragment(fn);
        var stateMutability = fragment.stateMutability;
        return stateMutability === 'view';
      } catch (e) {
        throw "".concat(fn, " is not a function");
      }
    }
  }, {
    key: "_getFnFragment",
    value: function _getFnFragment(fn) {
      return (0, _classPrivateFieldGet5["default"])(this, _contract)["interface"].fragments.filter(function (fragment) {
        return fn.startsWith(fragment.name);
      })[0];
    }
  }]);
  return Contract;
}();
var _default = Contract;
exports["default"] = _default;