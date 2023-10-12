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
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ContractNameNotSupportedError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(ContractNameNotSupportedError, _Error);
  var _super = _createSuper(ContractNameNotSupportedError);
  function ContractNameNotSupportedError(msg) {
    var _this;
    (0, _classCallCheck2["default"])(this, ContractNameNotSupportedError);
    _this = _super.call(this, msg);
    _this.name = 'ContractNameNotSupportedError';
    return _this;
  }
  return (0, _createClass2["default"])(ContractNameNotSupportedError);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));
var MigrationNotSupportedError = /*#__PURE__*/function (_Error2) {
  (0, _inherits2["default"])(MigrationNotSupportedError, _Error2);
  var _super2 = _createSuper(MigrationNotSupportedError);
  function MigrationNotSupportedError(msg) {
    var _this2;
    (0, _classCallCheck2["default"])(this, MigrationNotSupportedError);
    _this2 = _super2.call(this, msg);
    _this2.name = 'MigrationNotSupportedError';
    return _this2;
  }
  return (0, _createClass2["default"])(MigrationNotSupportedError);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));
/**
 * @class
 * Class for working with bundles.
 */
var _config = /*#__PURE__*/new WeakMap();
var _contractFactory = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
var _helper = /*#__PURE__*/new WeakMap();
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
    _classPrivateFieldInitSpec(this, _helper, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    (0, _classPrivateFieldSet2["default"])(this, _helper, options === null || options === void 0 ? void 0 : options.helper);
  }
  (0, _createClass2["default"])(Bundles, [{
    key: "_getContractParams",
    value: function _getContractParams(contractName) {
      var unsupportedContractNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      if (!unsupportedContractNames.includes(contractName)) {
        switch (contractName) {
          case 'v1.bundler':
            return {
              bundler: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1.abi
              },
              immutable: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1.address,
                name: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1.name,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1.abi
              },
              migrate: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.migrate.v1.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.migrate.v1.abi,
                empty: {
                  "function": 'decomposeAndBurnBundle'
                }
              }
            };
          case 'v1-1.bundler':
            return {
              bundler: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1_1.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1_1.abi,
                empty: {
                  "function": 'decomposeBundle'
                }
              },
              immutable: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1_1.address,
                name: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1_1.name,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1_1.abi
              }
            };
        }
      }
      throw new ContractNameNotSupportedError("".concat(contractName, " is not supported"));
    }
  }, {
    key: "_getMigrateContractParams",
    value: function _getMigrateContractParams(options) {
      var _options$from, _options$from$nftfi, _options$from$nftfi$c, _options$to, _options$to$nftfi, _options$to$nftfi$con, _options$from2, _options$from2$nftfi, _options$from2$nftfi$, _options$to2, _options$to2$nftfi, _options$to2$nftfi$co;
      switch ("".concat(options === null || options === void 0 ? void 0 : (_options$from = options.from) === null || _options$from === void 0 ? void 0 : (_options$from$nftfi = _options$from.nftfi) === null || _options$from$nftfi === void 0 ? void 0 : (_options$from$nftfi$c = _options$from$nftfi.contract) === null || _options$from$nftfi$c === void 0 ? void 0 : _options$from$nftfi$c.name, ":").concat(options === null || options === void 0 ? void 0 : (_options$to = options.to) === null || _options$to === void 0 ? void 0 : (_options$to$nftfi = _options$to.nftfi) === null || _options$to$nftfi === void 0 ? void 0 : (_options$to$nftfi$con = _options$to$nftfi.contract) === null || _options$to$nftfi$con === void 0 ? void 0 : _options$to$nftfi$con.name)) {
        case 'v1.bundler:v1-1.bundler':
          {
            return {
              migrate: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.migrate.v1.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.migrate.v1.abi
              },
              from: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1.address
              },
              to: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1_1.address
              }
            };
          }
      }
      throw new MigrationNotSupportedError("cannot migrate from: ".concat(options === null || options === void 0 ? void 0 : (_options$from2 = options.from) === null || _options$from2 === void 0 ? void 0 : (_options$from2$nftfi = _options$from2.nftfi) === null || _options$from2$nftfi === void 0 ? void 0 : (_options$from2$nftfi$ = _options$from2$nftfi.contract) === null || _options$from2$nftfi$ === void 0 ? void 0 : _options$from2$nftfi$.name, " to ").concat(options === null || options === void 0 ? void 0 : (_options$to2 = options.to) === null || _options$to2 === void 0 ? void 0 : (_options$to2$nftfi = _options$to2.nftfi) === null || _options$to2$nftfi === void 0 ? void 0 : (_options$to2$nftfi$co = _options$to2$nftfi.contract) === null || _options$to2$nftfi$co === void 0 ? void 0 : _options$to2$nftfi$co.name));
    }

    /**
     * Mint a new bundle.
     *
     * @returns {Object} An object containing information about the minted bundle.
     *
     * @example
     * // Mint a new v1.1 bundle.
     * // NOTE: v1 bundles have been deprecated, therefore this method wont mint a v1 bundle anymore.
     * const bundle = await nftfi.bundles.mint();
     */
  }, {
    key: "mint",
    value: function () {
      var _mint = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var result, contractName, contractFactoryParams, bundlerContract, transfer, bundleId;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              contractName = (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1_1.name;
              contractFactoryParams = this._getContractParams(contractName);
              bundlerContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(contractFactoryParams.bundler);
              _context.next = 6;
              return bundlerContract.call({
                "function": 'safeMint',
                args: [(0, _classPrivateFieldGet2["default"])(this, _account).getAddress()]
              });
            case 6:
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
                    name: contractName
                  }
                }
              }));
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context.t0));
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 12]]);
      }));
      function mint() {
        return _mint.apply(this, arguments);
      }
      return mint;
    }()
    /**
     * Adds elements to a bundle.
     *
     * @param {Object} options - An object containing options for the add operation.
     * @param {string} options.bundle.id - The ID of the bundle to which elements will be added.
     * @param {string} options.nftfi.contract.name - Name of the contract used for adding elements to the bundle.
     * @param {Array<Object>} options.elements - An array of objects representing the elements to be added.
     * @param {Object} options.elements[].token - An object containing information about the token associated with the element.
     * @param {string} options.elements[].token.address - The address of the token contract associated with the element.
     * @param {Array<string>} options.elements[].token.ids - An array of token IDs associated with the element.
     *
     * @returns {Object} An object containing information about the updated bundle.
     *
     * @example
     * // Add elements to a v1.1 bundle.
     * // NOTE: v1 bundles have been deprecated. You can migrate your v1 bundle to a v1.1 bundle using `bundles.migrate()`, then add elements afterwards.
     * const bundle = await nftfi.bundles.add({
     *   bundle: { id: '42' },
     *   elements: [
     *     { token: { address: '0xabc', ids: ['1', '2'] } },
     *     { token: { address: '0xdef', ids: ['3'] } }
     *   ],
     *   nftfi: {
     *     contract: {
     *       name: 'v1-1.bundler'
     *     }
     *   }
     * });
     */
  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var _options$nftfi, _options$nftfi$contra, contractName, unsupportedContractNames, contractFactoryParams, bundlerContract, elements, addressErrors;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              contractName = options === null || options === void 0 ? void 0 : (_options$nftfi = options.nftfi) === null || _options$nftfi === void 0 ? void 0 : (_options$nftfi$contra = _options$nftfi.contract) === null || _options$nftfi$contra === void 0 ? void 0 : _options$nftfi$contra.name;
              unsupportedContractNames = ['v1.bundler'];
              contractFactoryParams = this._getContractParams(contractName, unsupportedContractNames);
              bundlerContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(contractFactoryParams.bundler); // Add permit info to each element
              _context4.next = 7;
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
            case 7:
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
                _context4.next = 11;
                break;
              }
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle({
                elements: {
                  'token.address': addressErrors
                }
              }));
            case 11:
              _context4.next = 13;
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
            case 13:
              elements = _context4.sent;
              _context4.next = 16;
              return bundlerContract.call({
                "function": 'addBundleElements',
                args: [options.bundle.id, elements]
              });
            case 16:
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                bundle: {
                  id: options.bundle.id
                },
                elements: {
                  added: options === null || options === void 0 ? void 0 : options.elements
                },
                nftfi: {
                  contract: {
                    name: contractName
                  }
                }
              }));
            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](0);
              if (!(_context4.t0 instanceof ContractNameNotSupportedError)) {
                _context4.next = 25;
                break;
              }
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle({
                nftfi: {
                  contract: {
                    name: _context4.t0.message
                  }
                }
              }));
            case 25:
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context4.t0));
            case 26:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 19]]);
      }));
      function add(_x) {
        return _add.apply(this, arguments);
      }
      return add;
    }()
    /**
     * Removes elements from a bundle.
     *
     * @param {Object} options - An object containing options for the remove operation.
     * @param {string} options.bundle.id - The ID of the bundle from which elements will be removed.
     * @param {string} options.nftfi.contract.name - Name of the contract used for removing elements from the bundle.
     * @param {Array<Object>} options.elements - An array of objects representing the elements to be removed.
     * @param {Object} options.elements[].token - An object containing information about the token associated with the element.
     * @param {string} options.elements[].token.address - The address of the token contract associated with the element.
     * @param {Array<string>} options.elements[].token.ids - An array of token IDs associated with the element.
     *
     * @returns {Object} An object containing information about the updated bundle.
     *
     * @example
     * // Remove elements from a v1.1 bundle.
     * const bundle = await nftfi.bundles.remove({
     *   bundle: { id: '42' },
     *   elements: [
     *     {
     *       token: {
     *         address: '0xabc',
     *         ids: ['1', '2', '3']
     *       }
     *     }
     *   ],
     *   nftfi: {
     *     contract: {
     *       name: 'v1-1.bundler'
     *     }
     *   }
     * });
     */
  }, {
    key: "remove",
    value: function () {
      var _remove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(options) {
        var _options$nftfi2, _options$nftfi2$contr, contractName, contractFactoryParams, bundlerContract, elements;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              contractName = options === null || options === void 0 ? void 0 : (_options$nftfi2 = options.nftfi) === null || _options$nftfi2 === void 0 ? void 0 : (_options$nftfi2$contr = _options$nftfi2.contract) === null || _options$nftfi2$contr === void 0 ? void 0 : _options$nftfi2$contr.name;
              contractFactoryParams = this._getContractParams(contractName);
              bundlerContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(contractFactoryParams.bundler); // Add permit info to each element
              _context6.next = 6;
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
            case 6:
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
              _context6.next = 10;
              return bundlerContract.call({
                "function": 'removeBundleElements',
                args: [options.bundle.id, elements]
              });
            case 10:
              return _context6.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                bundle: {
                  id: options.bundle.id
                },
                elements: {
                  removed: options === null || options === void 0 ? void 0 : options.elements
                },
                nftfi: {
                  contract: {
                    name: contractName
                  }
                }
              }));
            case 13:
              _context6.prev = 13;
              _context6.t0 = _context6["catch"](0);
              if (!(_context6.t0 instanceof ContractNameNotSupportedError)) {
                _context6.next = 19;
                break;
              }
              return _context6.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle({
                nftfi: {
                  contract: {
                    name: _context6.t0.message
                  }
                }
              }));
            case 19:
              return _context6.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context6.t0));
            case 20:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[0, 13]]);
      }));
      function remove(_x4) {
        return _remove.apply(this, arguments);
      }
      return remove;
    }()
    /**
     * Seals a bundle, transferring it to an immutable contract, and mints a new immutable.
     *
     * @param {Object} options - An object containing options for the seal operation.
     * @param {string} options.bundle.id - The ID of the bundle to be sealed.
     * @param {string} options.nftfi.contract.name - Name of the contract used for sealing the bundle.
     *
     * @returns {Object} A promise that resolves to an object containing information about the newly minted immutable object.
     *
     * @example
     * // Seal a v1.1 bundle and mint a new v1.1 immutable.
     * // NOTE: v1 bundles have been deprecated. You can migrate your v1 bundle to a v1.1 bundle using `bundles.migrate()`, then seal afterwards.
     * const immutable = await nftfi.bundles.seal({
     *   bundle: { id: '42' },
     *   nftfi: {
     *     contract: {
     *       name: 'v1-1.bundler'
     *     }
     *   }
     * });
     */
  }, {
    key: "seal",
    value: function () {
      var _seal = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(options) {
        var _options$nftfi3, _options$nftfi3$contr, contractName, unsupportedContractNames, bundlerContractFactoryParams, bundlerContract, transferred, log;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              contractName = options === null || options === void 0 ? void 0 : (_options$nftfi3 = options.nftfi) === null || _options$nftfi3 === void 0 ? void 0 : (_options$nftfi3$contr = _options$nftfi3.contract) === null || _options$nftfi3$contr === void 0 ? void 0 : _options$nftfi3$contr.name;
              unsupportedContractNames = ['v1.bundler'];
              bundlerContractFactoryParams = this._getContractParams(contractName, unsupportedContractNames);
              bundlerContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(bundlerContractFactoryParams.bundler);
              _context7.next = 7;
              return bundlerContract.call({
                "function": 'safeTransferFrom(address,address,uint256)',
                args: [(0, _classPrivateFieldGet2["default"])(this, _account).getAddress(), bundlerContractFactoryParams.immutable.address, options.bundle.id]
              });
            case 7:
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
                    name: bundlerContractFactoryParams.immutable.name
                  }
                }
              }));
            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7["catch"](0);
              if (!(_context7.t0 instanceof ContractNameNotSupportedError)) {
                _context7.next = 18;
                break;
              }
              return _context7.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle({
                nftfi: {
                  contract: {
                    name: _context7.t0.message
                  }
                }
              }));
            case 18:
              return _context7.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context7.t0));
            case 19:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[0, 12]]);
      }));
      function seal(_x6) {
        return _seal.apply(this, arguments);
      }
      return seal;
    }()
    /**
     * Empties a bundle, transferring its contents to your account.
     *
     * @param {Object} options - An object containing options for the empty operation.
     * @param {string} options.bundle.id - The ID of the bundle to be emptied.
     * @param {string} options.nftfi.contract.name - Name of the contract used for emptying the bundle.
     *
     * @returns {Object} An object containing the status of the empty operation.
     *
     * @example
     * // NOTE: v1 bundles are deprecated, after emptying one it will be destroyed and you will not be able to use it anymore.
     * // Approve the migration contract to handle your v1 bundle.
     * const approvalResult = await nftfi.erc721.setApprovalForAll({
     *   token: { address: nftfi.config.bundler.v1.address },
     *   nftfi: { contract: { name: 'v1.bundler.migrate' } }
     * });
     * // Empty the v1 bundle and transfer its contents to your account.
     * const response = await nftfi.bundles.empty({
     *   bundle: { id: '42' },
     *   nftfi: {
     *     contract: {
     *       name: 'v1.bundler'
     *     }
     *   }
     * });
     *
     * @example
     * // Empty a v1.1 bundle and transfer its contents to your account.
     * const response = await nftfi.bundles.empty({
     *   bundle: { id: '42' },
     *   nftfi: {
     *     contract: {
     *       name: 'v1-1.bundler'
     *     }
     *   }
     * });
     */
  }, {
    key: "empty",
    value: function () {
      var _empty = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(options) {
        var _options$nftfi4, _options$nftfi4$contr, _response, response, contractName, contractFactoryParams, contract, _contract, result;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              contractName = options === null || options === void 0 ? void 0 : (_options$nftfi4 = options.nftfi) === null || _options$nftfi4 === void 0 ? void 0 : (_options$nftfi4$contr = _options$nftfi4.contract) === null || _options$nftfi4$contr === void 0 ? void 0 : _options$nftfi4$contr.name;
              contractFactoryParams = this._getContractParams(contractName);
              _context8.t0 = contractName;
              _context8.next = _context8.t0 === 'v1.bundler' ? 6 : _context8.t0 === 'v1-1.bundler' ? 11 : 16;
              break;
            case 6:
              contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(contractFactoryParams.migrate);
              _context8.next = 9;
              return contract.call({
                "function": contractFactoryParams.migrate.empty["function"],
                args: [contractFactoryParams.bundler.address, options.bundle.id, (0, _classPrivateFieldGet2["default"])(this, _account).getAddress()]
              });
            case 9:
              response = _context8.sent;
              return _context8.abrupt("break", 16);
            case 11:
              _contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(contractFactoryParams.bundler);
              _context8.next = 14;
              return _contract.call({
                "function": contractFactoryParams.bundler.empty["function"],
                args: [options.bundle.id, (0, _classPrivateFieldGet2["default"])(this, _account).getAddress()]
              });
            case 14:
              response = _context8.sent;
              return _context8.abrupt("break", 16);
            case 16:
              result = {
                success: ((_response = response) === null || _response === void 0 ? void 0 : _response.status) === 1 || false
              };
              return _context8.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(result));
            case 20:
              _context8.prev = 20;
              _context8.t1 = _context8["catch"](0);
              if (!(_context8.t1 instanceof ContractNameNotSupportedError)) {
                _context8.next = 26;
                break;
              }
              return _context8.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle({
                nftfi: {
                  contract: {
                    name: _context8.t1.message
                  }
                }
              }));
            case 26:
              return _context8.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context8.t1));
            case 27:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this, [[0, 20]]);
      }));
      function empty(_x7) {
        return _empty.apply(this, arguments);
      }
      return empty;
    }()
    /**
     * Retrieves the elements in a bundle.
     *
     * @param {Object} options - An object containing options for retrieving the elements.
     * @param {string} options.bundle.id - The ID of the bundle whose elements are to be retrieved.
     * @param {Object} options.nftfi.contract - An object containing information about the contract.
     * @param {string} options.nftfi.contract.name - Name of the contract used for retrieving the elements.
     *
     * @returns {Object} An object containing information about the bundle and its elements.
     *
     * @example
     * // Get the elements of a bundle.
     * const elements = await nftfi.bundles.elements({
     *   bundle: { id: '42' },
     *   nftfi: {
     *     contract: {
     *       name: 'v1-1.bundler'
     *     }
     *   }
     * });
     */
  }, {
    key: "elements",
    value: function elements(options) {
      var _this3 = this;
      try {
        var _options$nftfi5, _options$nftfi5$contr;
        var contractName = options === null || options === void 0 ? void 0 : (_options$nftfi5 = options.nftfi) === null || _options$nftfi5 === void 0 ? void 0 : (_options$nftfi5$contr = _options$nftfi5.contract) === null || _options$nftfi5$contr === void 0 ? void 0 : _options$nftfi5$contr.name;
        var contractFactoryParams = this._getContractParams(contractName);
        var bundlerContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(contractFactoryParams.bundler);
        return bundlerContract.call({
          "function": 'totalChildContracts',
          args: [options.bundle.id]
        }).then(function (res) {
          var totalChildContracts = res.toNumber();
          var childContractPromises = (0, _toConsumableArray2["default"])(Array(totalChildContracts).keys()).map(function (index) {
            return bundlerContract.call({
              "function": 'childContractByIndex',
              args: [options.bundle.id, index]
            });
          });
          return Promise.all(childContractPromises);
        }).then(function (res) {
          var childContracts = res;
          var childContractTokenCountPromises = childContracts.map(function (contract) {
            return bundlerContract.call({
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
              return bundlerContract.call({
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
                name: contractName
              }
            }
          };
        }).then(function (result) {
          return (0, _classPrivateFieldGet2["default"])(_this3, _result).handle(result);
        })["catch"](function (e) {
          return (0, _classPrivateFieldGet2["default"])(_this3, _error).handle(e);
        });
      } catch (e) {
        if (e instanceof ContractNameNotSupportedError) {
          return (0, _classPrivateFieldGet2["default"])(this, _error).handle({
            nftfi: {
              contract: {
                name: e.message
              }
            }
          });
        }
      }
    }

    /**
     * Migrates a bundle from one bundler contract to another.
     *
     * @param {Object} options - An object containing options for migrating the bundle.
     * @param {string} options.bundle.id - The ID of the bundle to be migrated.
     * @param {string} options.from.nftfi.contract.name - Name of the source contract.
     * @param {string} options.to.nftfi.contract.name - Name of the destination contract.
     *
     * @returns {Object} An object containing information about the migrated bundle.
     *
     * @example
     * // Approve the v1 bundler contract with the v1 migration contract.
     * const approvalResult = await nftfi.erc721.setApprovalForAll({
     *   token: { address: nftfi.config.bundler.v1.address },
     *   nftfi: { contract: { name: 'v1.bundler.migrate' } }
     * });
     * // Migrate a bundle from v1 bundle to v1.1 bundle.
     * const migrateResult = await nftfi.bundles.migrate({
     *   bundle: { id: '42' },
     *   from: {
     *     nftfi: {
     *       contract: {
     *         name: 'v1.bundler'
     *       }
     *     }
     *   },
     *   to: {
     *     nftfi: {
     *       contract: {
     *         name: 'v1-1.bundler'
     *       }
     *     }
     *   }
     * });
     */
  }, {
    key: "migrate",
    value: function () {
      var _migrate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(options) {
        var _this4 = this;
        var _options$bundle, bundleId, migrateContractParams, migrateContract;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              bundleId = options === null || options === void 0 ? void 0 : (_options$bundle = options.bundle) === null || _options$bundle === void 0 ? void 0 : _options$bundle.id;
              migrateContractParams = this._getMigrateContractParams(options);
              migrateContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(migrateContractParams.migrate);
              return _context9.abrupt("return", migrateContract.call({
                "function": 'migrateBundle',
                args: [migrateContractParams.from.address, migrateContractParams.to.address, bundleId]
              }).then(function (result) {
                var _options$to3, _options$to3$nftfi, _options$to3$nftfi$co;
                var log = result.logs.find(function (l) {
                  return l.name === 'BundleMigrated';
                });
                var newBundleId = log.args.newBundleId.toString();
                return (0, _classPrivateFieldGet2["default"])(_this4, _result).handle({
                  bundle: {
                    id: newBundleId
                  },
                  nftfi: {
                    contract: {
                      name: options === null || options === void 0 ? void 0 : (_options$to3 = options.to) === null || _options$to3 === void 0 ? void 0 : (_options$to3$nftfi = _options$to3.nftfi) === null || _options$to3$nftfi === void 0 ? void 0 : (_options$to3$nftfi$co = _options$to3$nftfi.contract) === null || _options$to3$nftfi$co === void 0 ? void 0 : _options$to3$nftfi$co.name
                    }
                  }
                });
              })["catch"](function (e) {
                return (0, _classPrivateFieldGet2["default"])(_this4, _error).handle(e);
              }));
            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              if (!(_context9.t0 instanceof MigrationNotSupportedError)) {
                _context9.next = 11;
                break;
              }
              return _context9.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle({
                nftfi: {
                  contract: {
                    name: _context9.t0.message
                  }
                }
              }));
            case 11:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[0, 7]]);
      }));
      function migrate(_x8) {
        return _migrate.apply(this, arguments);
      }
      return migrate;
    }()
    /**
     * Retrieves an immutable of a bundle.
     *
     * @param {Object} options - An object containing options for the getImmutable operation.
     * @param {string} options.bundle.id - The ID of the bundle object.
     * @param {Object} options.nftfi.contract - An object containing information about the contract used to facilitate the bundle.
     * @param {string} options.nftfi.contract.name - Name of the contract used to facilitate the bundle: `v1-1.bundler`.
     *
     * @returns {Object} An object containing information about a bundle.
     *
     * @example
     * // Get an immutable of a v1-1 bundle.
     * const bundle = await nftfi.bundles.getImmutable({
     *   bundle: { id: '42' },
     *   nftfi: {
     *     contract: {
     *       name: 'v1-1.bundler'
     *     }
     *   }
     * });
     */
  }, {
    key: "getImmutable",
    value: function () {
      var _getImmutable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(options) {
        var _options$nftfi6, _options$nftfi6$contr, contractName, contractFactoryParams, immutableContract, immutableId;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              contractName = options === null || options === void 0 ? void 0 : (_options$nftfi6 = options.nftfi) === null || _options$nftfi6 === void 0 ? void 0 : (_options$nftfi6$contr = _options$nftfi6.contract) === null || _options$nftfi6$contr === void 0 ? void 0 : _options$nftfi6$contr.name;
              contractFactoryParams = this._getContractParams(contractName);
              immutableContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(contractFactoryParams.immutable);
              _context10.next = 6;
              return immutableContract.call({
                "function": 'immutableOfBundle',
                args: [options.bundle.id]
              });
            case 6:
              immutableId = _context10.sent;
              return _context10.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                immutable: {
                  id: immutableId.toString()
                },
                nftfi: {
                  contract: {
                    name: contractFactoryParams.immutable.name
                  }
                }
              }));
            case 10:
              _context10.prev = 10;
              _context10.t0 = _context10["catch"](0);
              if (!(_context10.t0 instanceof ContractNameNotSupportedError)) {
                _context10.next = 16;
                break;
              }
              return _context10.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle({
                nftfi: {
                  contract: {
                    name: _context10.t0.message
                  }
                }
              }));
            case 16:
              return _context10.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context10.t0));
            case 17:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this, [[0, 10]]);
      }));
      function getImmutable(_x9) {
        return _getImmutable.apply(this, arguments);
      }
      return getImmutable;
    }()
  }]);
  return Bundles;
}();
var _default = Bundles;
exports["default"] = _default;