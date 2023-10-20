"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet3 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _api = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var _contractsAddresses = /*#__PURE__*/new WeakMap();
var OffersRequests = /*#__PURE__*/function () {
  function OffersRequests() {
    var _classPrivateFieldSet2;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, OffersRequests);
    _classPrivateFieldInitSpec(this, _api, {
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
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _error, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _contractsAddresses, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet3["default"])(this, _api, options === null || options === void 0 ? void 0 : options.api);
    (0, _classPrivateFieldSet3["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet3["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet3["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet3["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    (0, _classPrivateFieldSet3["default"])(this, _contractsAddresses, (_classPrivateFieldSet2 = {}, (0, _defineProperty2["default"])(_classPrivateFieldSet2, (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2.name, (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2.address), (0, _defineProperty2["default"])(_classPrivateFieldSet2, (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v2_1.name, (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v2_1.address), _classPrivateFieldSet2));
  }

  /**
   * Creates a new offer request for a NFT.
   *
   * @param {object} [options] - Hashmap of config options for this method
   * @param {string} [options.nft.address] - NFT contract address
   * @param {string} [options.nft.id] - NFT id of the asset
   * @param {string} [options.desiredTerms.currency] - Desired term currency (optional)
   * @param {string} [options.desiredTerms.principal] - Desired term principal (optional)
   * @param {number} [options.desiredTerms.repayment] - Desired term repayment (optional)
   * @param {string} [options.desiredTerms.duration] - Desired term duration (optional)
   * @param {string} [options.desiredTerms.contract.name] - Name of contract which the offer was created for: `v2-3.loan.fixed`
   * @returns {object} Offer request
   *
   * @example
   * // Create an Offer Request
   * const offerRequest = await nftfi.offers.requests.create({
   *  desiredTerms: {
   *    currency: '0x00000000',
   *    principal: '1000000000',
   *    repayment: '2000000000',
   *    duration: 86400 * 7, // 7 days (in seconds)
   *    contract: {
   *      name: 'v2-3.loan.fixed'
   *    }
   *  },
   *  nft: {
   *    address: "0x00000000",
   *    id: "42"
   *  }
   * });
   */
  (0, _createClass2["default"])(OffersRequests, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var desiredTerms, nft, contractAddress, payload, response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              desiredTerms = _ref.desiredTerms, nft = _ref.nft;
              contractAddress = (0, _classPrivateFieldGet2["default"])(this, _contractsAddresses)[desiredTerms.contract.name];
              if (contractAddress) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle('Invalid contract name specified!'));
            case 4:
              payload = {
                data: {
                  desiredTerms: {
                    currency: desiredTerms.currency,
                    principal: desiredTerms.principal,
                    repayment: desiredTerms.repayment,
                    duration: desiredTerms.duration,
                    contract: {
                      name: desiredTerms.contract.name,
                      address: contractAddress,
                      fee: {
                        bps: (0, _classPrivateFieldGet2["default"])(this, _config).loan.adminFeeInBasisPoints
                      }
                    }
                  },
                  nft: {
                    id: nft.id,
                    address: nft.address
                  },
                  borrower: {
                    address: (0, _classPrivateFieldGet2["default"])(this, _account).getAddress()
                  },
                  chain: {
                    id: (0, _classPrivateFieldGet2["default"])(this, _config).chainId
                  }
                },
                schema: {
                  version: '0.1'
                }
              };
              _context.prev = 5;
              _context.next = 8;
              return (0, _classPrivateFieldGet2["default"])(this, _api).post({
                uri: 'v0.1/offer-requests',
                payload: payload
              });
            case 8:
              response = _context.sent;
              if (!(response !== null && response !== void 0 && response.errors)) {
                _context.next = 13;
                break;
              }
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle({
                errors: response === null || response === void 0 ? void 0 : response.errors
              }));
            case 13:
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(response === null || response === void 0 ? void 0 : response.result));
            case 14:
              _context.next = 19;
              break;
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](5);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t0));
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[5, 16]]);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }]);
  return OffersRequests;
}();
var _default = OffersRequests;
exports["default"] = _default;