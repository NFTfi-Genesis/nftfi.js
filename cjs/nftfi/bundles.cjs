"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _config = /*#__PURE__*/new WeakMap();
var _contractFactory = /*#__PURE__*/new WeakMap();
var _bundlerContract = /*#__PURE__*/new WeakMap();
var _immutables = /*#__PURE__*/new WeakMap();
var _helper = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
/**
 * @class
 * Class for working with bundles.
 */
var Bundles = /*#__PURE__*/function () {
  function Bundles(options) {
    (0, _classCallCheck2["default"])(this, Bundles);
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _contractFactory, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _bundlerContract, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _immutables, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _helper, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _error, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _helper, options === null || options === void 0 ? void 0 : options.helper);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    (0, _classPrivateFieldSet2["default"])(this, _immutables, options === null || options === void 0 ? void 0 : options.immutables);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
    (0, _classPrivateFieldSet2["default"])(this, _bundlerContract, (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
      address: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1.address,
      abi: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1.abi
    }));
  }

  /**
   * Mint a new bundle.
   *
   * @example
   * // Mint a new bundle.
   * const bundle = await nftfi.bundles.mint();
   *
   * @returns {Object} An object containing information about the minted bundle.
   */
  (0, _createClass2["default"])(Bundles, [{
    key: "mint",
    value: function () {
      var _mint = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var result, transfer, bundleId;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _classPrivateFieldGet2["default"])(this, _bundlerContract).call({
                "function": 'safeMint',
                args: [(0, _classPrivateFieldGet2["default"])(this, _account).getAddress()]
              });
            case 3:
              result = _context.sent;
              transfer = result.logs.filter(function (log) {
                return log.name === 'Transfer';
              })[0];
              bundleId = transfer.args.tokenId.toString();
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                bundle: {
                  id: bundleId
                },
                nftfi: {
                  contract: {
                    name: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1.name
                  }
                }
              }));
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t0));
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 9]]);
      }));
      function mint() {
        return _mint.apply(this, arguments);
      }
      return mint;
    }()
    /**
     * Add one or more elements to a bundle.
     *
     * @param {Object} options - An object containing options for the add operation.
     * @param {Object} options.bundle - An object containing the ID of the bundle to add elements to.
     * @param {string} options.bundle.id - The ID of the bundle to add elements to.
     * @param {Object[]} options.elements - An array of objects containing information about the elements to add.
     * @param {Object} options.elements[].token - An object containing the address and IDs of the token contract and the elements to add.
     * @param {string} options.elements[].token.address - The address of the token contract.
     * @param {string[]} options.elements[].token.ids - An array of strings containing the IDs of the elements to add.
     *
     * @example
     * // Add elements from multiple token contracts to a bundle.
     * const bundle = await nftfi.bundles.add({
     *   bundle: { id: '123' },
     *   elements: [
     *     { token: { address: '0xabc', ids: ['1', '2'] } },
     *     { token: { address: '0xdef', ids: ['3'] } }
     *   ]
     * });
     *
     * @returns {Object} An object containing information about the bundle and added elements.
     */
  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var elements, addressErrors;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return Promise.all(options === null || options === void 0 ? void 0 : options.elements.map( /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(element) {
                  var permit;
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return (0, _classPrivateFieldGet2["default"])(this, _helper).getPermit({
                          element: element
                        });
                      case 2:
                        permit = _context2.sent;
                        return _context2.abrupt("return", _objectSpread(_objectSpread({}, element), {}, {
                          permit: permit
                        }));
                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2, this);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }(), this));
            case 3:
              elements = _context4.sent;
              // Check for token.address errors
              addressErrors = elements.reduce(function (acc, el) {
                if (!el.permit.isPermitted) {
                  acc.push("".concat(el.token.address, " is not permitted"));
                  return acc; //return acc early to prevent `is not supported` error
                }

                if (!el.permit.isSupported) {
                  acc.push("".concat(el.token.address, " is not supported"));
                }
                return acc;
              }, []); // Handle any errors
              if (!addressErrors.length) {
                _context4.next = 7;
                break;
              }
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle({
                elements: {
                  'token.address': addressErrors
                }
              }));
            case 7:
              _context4.next = 9;
              return Promise.all(elements.map( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(element) {
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        return _context3.abrupt("return", {
                          tokenContract: element.token.address,
                          ids: element.token.ids,
                          safeTransferable: element.permit.isSafeTransferable
                        });
                      case 1:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 9:
              elements = _context4.sent;
              _context4.next = 12;
              return (0, _classPrivateFieldGet2["default"])(this, _bundlerContract).call({
                "function": 'addBundleElements',
                args: [options.bundle.id, elements]
              });
            case 12:
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                bundle: {
                  id: options.bundle.id
                },
                elements: {
                  added: options === null || options === void 0 ? void 0 : options.elements
                },
                nftfi: {
                  contract: {
                    name: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1.name
                  }
                }
              }));
            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context4.t0));
            case 18:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 15]]);
      }));
      function add(_x) {
        return _add.apply(this, arguments);
      }
      return add;
    }()
    /**
     * Remove one or more elements from a bundle.
     *
     * @param {Object} options - An object containing options for the remove operation.
     * @param {Object} options.bundle - An object containing the ID of the bundle to remove elements from.
     * @param {string} options.bundle.id - The ID of the bundle to remove elements from.
     * @param {Object[]} options.elements - An array of objects containing information about the elements to remove.
     * @param {Object} options.elements[].token - An object containing the address and IDs of the token contract and the elements to remove.
     * @param {string} options.elements[].token.address - The address of the token contract.
     * @param {string[]} options.elements[].token.ids - An array of strings containing the IDs of the elements to remove.
     *
     * @returns {Object} An object containing information about the bundle and removed elements.
     *
     * @example
     * // Removes elements from multiple token contracts from a bundle.
     * const bundle = await nftfi.bundles.remove({
     *   bundle: { id: '123' },
     *   elements: [
     *     { token: { address: '0xabc', ids: ['1', '2'] } },
     *     { token: { address: '0xdef', ids: ['3'] } }
     *   ]
     * });
     */
  }, {
    key: "remove",
    value: function () {
      var _remove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(options) {
        var elements;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return Promise.all(options === null || options === void 0 ? void 0 : options.elements.map( /*#__PURE__*/function () {
                var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(element) {
                  var permit;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return (0, _classPrivateFieldGet2["default"])(this, _helper).getPermit({
                          element: element
                        });
                      case 2:
                        permit = _context5.sent;
                        return _context5.abrupt("return", _objectSpread(_objectSpread({}, element), {}, {
                          permit: permit
                        }));
                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5, this);
                }));
                return function (_x5) {
                  return _ref3.apply(this, arguments);
                };
              }(), this));
            case 3:
              elements = _context6.sent;
              // Parse the inputs for the contract call
              elements = elements.map(function (element) {
                return {
                  tokenContract: element.token.address,
                  ids: element.token.ids,
                  safeTransferable: element.permit.isSafeTransferable
                };
              }, this);
              // Call the contract
              _context6.next = 7;
              return (0, _classPrivateFieldGet2["default"])(this, _bundlerContract).call({
                "function": 'removeBundleElements',
                args: [options.bundle.id, elements]
              });
            case 7:
              return _context6.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                bundle: {
                  id: options.bundle.id
                },
                elements: {
                  removed: options === null || options === void 0 ? void 0 : options.elements
                },
                nftfi: {
                  contract: {
                    name: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1.name
                  }
                }
              }));
            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context6.t0));
            case 13:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[0, 10]]);
      }));
      function remove(_x4) {
        return _remove.apply(this, arguments);
      }
      return remove;
    }()
    /**
     * Seal a bundle, making it immutable.
     *
     * @param {Object} options - An object containing options for the seal operation.
     * @param {Object} options.bundle - An object containing the ID of the bundle to seal.
     * @param {string} options.bundle.id - The ID of the bundle to seal.
     *
     * @returns {Object} An object containing information about the immutable contract.
     *
     * @example
     * // Seals a bundle.
     * const immutable = await nftfi.bundles.seal({
     *   bundle: { id: '123' }
     * });
     */
  }, {
    key: "seal",
    value: function () {
      var _seal = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(options) {
        var transferred, log;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return (0, _classPrivateFieldGet2["default"])(this, _bundlerContract).call({
                "function": 'safeTransferFrom(address,address,uint256)',
                args: [(0, _classPrivateFieldGet2["default"])(this, _account).getAddress(), (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1.address, options.bundle.id]
              });
            case 3:
              transferred = _context7.sent;
              log = transferred.logs.find(function (log) {
                return log.name === 'ImmutableMinted';
              });
              return _context7.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                immutable: {
                  id: log.args.immutableId.toString()
                },
                nftfi: {
                  contract: {
                    name: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1.name
                  }
                }
              }));
            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context7.t0));
            case 11:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[0, 8]]);
      }));
      function seal(_x6) {
        return _seal.apply(this, arguments);
      }
      return seal;
    }()
    /**
     * Empty a bundle.
     *
     * @param {Object} options - An object containing options for the empty operation.
     * @param {Object} options.bundle - An object containing the ID of the bundle to empty.
     * @param {string} options.bundle.id - The ID of the bundle to empty.
     *
     * @returns {Object} An object containing a success property.
     *
     * @example
     * // Empties a bundle.
     * const result = await nftfi.bundles.empty({
     *   bundle: { id: '123' }
     * });
     */
  }, {
    key: "empty",
    value: function () {
      var _empty = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(options) {
        var result;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return (0, _classPrivateFieldGet2["default"])(this, _bundlerContract).call({
                "function": 'decomposeBundle',
                args: [options.bundle.id, (0, _classPrivateFieldGet2["default"])(this, _account).getAddress()]
              });
            case 3:
              result = {
                success: true
              };
              return _context8.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(result));
            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context8.t0));
            case 10:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this, [[0, 7]]);
      }));
      function empty(_x7) {
        return _empty.apply(this, arguments);
      }
      return empty;
    }()
    /**
     * Get the elements inside a bundle.
     *
     * @param {Object} options - An object containing options for the elements operation.
     * @param {Object} options.bundle - An object containing the ID of the bundle to get elements for.
     * @param {string} options.bundle.id - The ID of the bundle to get elements for.
     *
     * @returns {Object} An object containing information about the bundle and an array of elements.
     *
     * @example
     * // Gets the elements in a bundle.
     * const bundle = await nftfi.bundles.elements({
     *   bundle: { id: '123' }
     * });
     * console.log(bundle.data.elements);
     */
  }, {
    key: "elements",
    value: function elements(options) {
      var _this = this;
      return (0, _classPrivateFieldGet2["default"])(this, _bundlerContract).call({
        "function": 'totalChildContracts',
        args: [options.bundle.id]
      }).then(function (res) {
        var totalChildContracts = res.toNumber();
        var childContractPromises = (0, _toConsumableArray2["default"])(Array(totalChildContracts).keys()).map(function (index) {
          return (0, _classPrivateFieldGet2["default"])(_this, _bundlerContract).call({
            "function": 'childContractByIndex',
            args: [options.bundle.id, index]
          });
        });
        return Promise.all(childContractPromises);
      }).then(function (res) {
        var childContracts = res;
        var childContractTokenCountPromises = childContracts.map(function (contract) {
          return (0, _classPrivateFieldGet2["default"])(_this, _bundlerContract).call({
            "function": 'totalChildTokens',
            args: [options.bundle.id, contract]
          }).then(function (total) {
            return {
              contract: contract,
              totalChildTokens: total.toNumber()
            };
          });
        });
        return Promise.all(childContractTokenCountPromises);
      }).then(function (res) {
        var childContracts = res;
        var elementPromises = childContracts.map(function (tokenContract) {
          var elementTokenIdPromises = (0, _toConsumableArray2["default"])(Array(tokenContract.totalChildTokens).keys()).map(function (index) {
            return (0, _classPrivateFieldGet2["default"])(_this, _bundlerContract).call({
              "function": 'childTokenByIndex',
              args: [options.bundle.id, tokenContract.contract, index]
            });
          });
          return Promise.all(elementTokenIdPromises).then(function (ids) {
            return {
              tokenContract: tokenContract.contract,
              ids: ids.map(function (id) {
                return id.toString();
              })
            };
          });
        });
        return Promise.all(elementPromises);
      }).then(function (result) {
        var elements = result.map(function (element) {
          return {
            token: {
              address: element.tokenContract,
              ids: element.ids
            }
          };
        });
        return {
          bundle: {
            id: options.bundle.id
          },
          elements: elements,
          nftfi: {
            contract: {
              name: (0, _classPrivateFieldGet2["default"])(_this, _config).bundler.v1.name
            }
          }
        };
      }).then(function (result) {
        return (0, _classPrivateFieldGet2["default"])(_this, _result).handle(result);
      })["catch"](function (e) {
        return (0, _classPrivateFieldGet2["default"])(_this, _error).handle(e);
      });
    }
  }]);
  return Bundles;
}();
var _default = Bundles;
exports["default"] = _default;