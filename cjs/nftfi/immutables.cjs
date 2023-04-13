"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));
var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
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
 * Class for working with immutables.
 */
var _config = /*#__PURE__*/new WeakMap();
var _contractFactory = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
var Immutables = /*#__PURE__*/function () {
  function Immutables(options) {
    (0, _classCallCheck2["default"])(this, Immutables);
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
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
  }
  (0, _createClass2["default"])(Immutables, [{
    key: "_getContractParams",
    value: function _getContractParams(contractName) {
      var unsupportedContracts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var unsupportedContractNames = Object.keys(unsupportedContracts);
      if (!unsupportedContractNames.includes(contractName)) {
        switch (contractName) {
          case 'v1.immutable.bundle':
            return {
              immutable: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1.abi
              },
              bundler: {
                name: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1.name
              },
              migrate: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.migrate.v1.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.migrate.v1.abi,
                empty: {
                  "function": 'decomposeAndBurnImmutable'
                }
              }
            };
          case 'v1-1.immutable.bundle':
            return {
              immutable: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1_1.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1_1.abi,
                empty: {
                  "function": 'withdrawAndDecompose'
                }
              },
              bundler: {
                name: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.v1_1.name
              }
            };
        }
      }
      var errorMsg = unsupportedContracts[contractName] || "".concat(contractName, " is not supported");
      throw new ContractNameNotSupportedError(errorMsg);
    }
  }, {
    key: "_getMigrateContractParams",
    value: function _getMigrateContractParams(options) {
      var _options$from, _options$from$nftfi, _options$from$nftfi$c, _options$to, _options$to$nftfi, _options$to$nftfi$con, _options$from2, _options$from2$nftfi, _options$from2$nftfi$, _options$to2, _options$to2$nftfi, _options$to2$nftfi$co;
      switch ("".concat(options === null || options === void 0 ? void 0 : (_options$from = options.from) === null || _options$from === void 0 ? void 0 : (_options$from$nftfi = _options$from.nftfi) === null || _options$from$nftfi === void 0 ? void 0 : (_options$from$nftfi$c = _options$from$nftfi.contract) === null || _options$from$nftfi$c === void 0 ? void 0 : _options$from$nftfi$c.name, ":").concat(options === null || options === void 0 ? void 0 : (_options$to = options.to) === null || _options$to === void 0 ? void 0 : (_options$to$nftfi = _options$to.nftfi) === null || _options$to$nftfi === void 0 ? void 0 : (_options$to$nftfi$con = _options$to$nftfi.contract) === null || _options$to$nftfi$con === void 0 ? void 0 : _options$to$nftfi$con.name)) {
        case 'v1.immutable.bundle:v1-1.immutable.bundle':
          {
            return {
              migrate: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.migrate.v1.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).bundler.migrate.v1.abi
              },
              from: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1.address
              },
              to: {
                address: (0, _classPrivateFieldGet2["default"])(this, _config).immutable.v1_1.address
              }
            };
          }
      }
      throw new MigrationNotSupportedError("cannot migrate from: ".concat(options === null || options === void 0 ? void 0 : (_options$from2 = options.from) === null || _options$from2 === void 0 ? void 0 : (_options$from2$nftfi = _options$from2.nftfi) === null || _options$from2$nftfi === void 0 ? void 0 : (_options$from2$nftfi$ = _options$from2$nftfi.contract) === null || _options$from2$nftfi$ === void 0 ? void 0 : _options$from2$nftfi$.name, " to ").concat(options === null || options === void 0 ? void 0 : (_options$to2 = options.to) === null || _options$to2 === void 0 ? void 0 : (_options$to2$nftfi = _options$to2.nftfi) === null || _options$to2$nftfi === void 0 ? void 0 : (_options$to2$nftfi$co = _options$to2$nftfi.contract) === null || _options$to2$nftfi$co === void 0 ? void 0 : _options$to2$nftfi$co.name));
    }

    /**
     * Unseals an immutable bundle.
     *
     * @param {Object} options - An object containing options for the unseal operation.
     * @param {string} options.immutable.id - The ID of the immutable bundle to unseal.
     * @param {Object} options.nftfi.contract - An object containing information about the contract used to facilitate the bundle.
     * @param {string} options.nftfi.contract.name - Name of the contract used to facilitate the bundle: `v1.immutable.bundle` (deprecated), `v1-1.immutable.bundle`.
     *
     * @returns {Object} An object containing information about the bundle that was released from the immutable.
     *
     * @example
     * // Unseal a v1.1 immutable bundle.
     * // NOTE: v1 immutables have been deprecated. You must call `nftfi.immutables.empty()` instead, or you can migrate your v1 immutable to a v1.1 immutable using `nftfi.immutables.migrate()`, then unseal it.
     * const bundle = await nftfi.immutables.unseal({
     *   immutable: { id: '42' },
     *   nftfi: {
     *     contract: {
     *       name: 'v1-1.immutable.bundle'
     *     }
     *   }
     * });
     */
  }, {
    key: "unseal",
    value: function unseal(options) {
      var _this3 = this;
      try {
        var _options$nftfi, _options$nftfi$contra;
        var contractName = options === null || options === void 0 ? void 0 : (_options$nftfi = options.nftfi) === null || _options$nftfi === void 0 ? void 0 : (_options$nftfi$contra = _options$nftfi.contract) === null || _options$nftfi$contra === void 0 ? void 0 : _options$nftfi$contra.name;
        var unsupportedConracts = {
          'v1.immutable.bundle': 'immutables.unseal() no longer supports v1.immutable.bundle. use immutables.empty() instead'
        };
        var contractFactoryParams = this._getContractParams(contractName, unsupportedConracts);
        var immutableContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(contractFactoryParams.immutable);
        return immutableContract.call({
          "function": 'withdraw',
          args: [options.immutable.id, (0, _classPrivateFieldGet2["default"])(this, _account).getAddress()]
        }).then( /*#__PURE__*/function () {
          var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(result) {
            var transfer;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  transfer = result.logs.filter(function (log) {
                    return log.name === 'Transfer' && log.args.from.toLowerCase() === contractFactoryParams.immutable.address.toLowerCase() && log.args.to.toLowerCase() === (0, _classPrivateFieldGet2["default"])(this, _account).getAddress().toLowerCase();
                  }, _this3)[0];
                  return _context.abrupt("return", (0, _classPrivateFieldGet2["default"])(_this3, _result).handle({
                    bundle: {
                      id: transfer.args.tokenId.toString()
                    },
                    nftfi: {
                      contract: {
                        name: contractFactoryParams.bundler.name
                      }
                    }
                  }));
                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }())["catch"](function (e) {
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
     * Retrieves a bundle of an immutable.
     *
     * @param {Object} options - An object containing options for the getBundle operation.
     * @param {string} options.immutable.id - The ID of the immutable object.
     * @param {Object} options.nftfi.contract - An object containing information about the contract used to facilitate the bundle.
     * @param {string} options.nftfi.contract.name - Name of the contract used to facilitate the bundle: `v1.immutable.bundle` (deprecated), `v1-1.immutable.bundle`.
     *
     * @returns {Object} An object containing information about an bundle.
     *
     * @example
     * // Get a bundle of a v1 immutable.
     * const bundle = await nftfi.immutables.getBundle({
     *   immutable: { id: '42' },
     *   nftfi: {
     *     contract: {
     *       name: 'v1.immutable.bundle'
     *     }
     *   }
     * });
     *
     * @example
     * // Get a bundle of a v1.1 immutable.
     * const bundle = await nftfi.immutables.getBundle({
     *   immutable: { id: '42' },
     *   nftfi: {
     *     contract: {
     *       name: 'v1-1.immutable.bundle'
     *     }
     *   }
     * });
     */
  }, {
    key: "getBundle",
    value: function () {
      var _getBundle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var _options$nftfi2, _options$nftfi2$contr, contractName, contractFactoryParams, immutableContract, bundleId;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              contractName = options === null || options === void 0 ? void 0 : (_options$nftfi2 = options.nftfi) === null || _options$nftfi2 === void 0 ? void 0 : (_options$nftfi2$contr = _options$nftfi2.contract) === null || _options$nftfi2$contr === void 0 ? void 0 : _options$nftfi2$contr.name;
              contractFactoryParams = this._getContractParams(contractName);
              immutableContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(contractFactoryParams.immutable);
              _context2.next = 6;
              return immutableContract.call({
                "function": 'bundleOfImmutable',
                args: [options.immutable.id]
              });
            case 6:
              bundleId = _context2.sent;
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                bundle: {
                  id: bundleId.toString()
                },
                nftfi: {
                  contract: {
                    name: contractFactoryParams.bundler.name
                  }
                }
              }));
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              if (!(_context2.t0 instanceof ContractNameNotSupportedError)) {
                _context2.next = 16;
                break;
              }
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle({
                nftfi: {
                  contract: {
                    name: _context2.t0.message
                  }
                }
              }));
            case 16:
              return _context2.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context2.t0));
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 10]]);
      }));
      function getBundle(_x2) {
        return _getBundle.apply(this, arguments);
      }
      return getBundle;
    }()
    /**
     * Empties an immutable according to the specified contract.
     *
     * @param {Object} options - An object containing options for the empty operation.
     * @param {string} options.immutable.id - The ID of the immutable object to be emptied.
     * @param {string} options.nftfi.contract.name - Name of the contract used for emptying the immutable object: `v1.immutable.bundle`, `v1-1.immutable.bundle`.
     *
     * @returns {Object} An object containing the success status of the empty operation.
     *
     * @example
     * // NOTE: v1 immutables have been deprecated. If you empty it you will also burn the bundle after the NFTs have been transferred back into your account. You could optionally migrate your v1 immutable to a v1.1 immutable using `nftfi.immutables.migrate()`, then empty it.
     * // Approve the migration contract to handle your v1 immutable.
     * const approvalResult = await nftfi.erc721.setApprovalForAll({
     *   token: { address: nftfi.config.immutable.v1.address },
     *   nftfi: { contract: { name: 'v1.bundler.migrate' } }
     * });
     * // Empty the v1 immutable and transfer its contents to your account.
     * const result = await nftfi.immutables.empty({
     *   immutable: { id: '42' },
     *   nftfi: {
     *     contract: {
     *       name: 'v1.immutable.bundle'
     *     }
     *   }
     * });
     *
     * @example
     * // Empty an v1.1 immutable and transfer its contents to your account.
     * const result = await nftfi.immutables.empty({
     *   immutable: { id: '42' },
     *   nftfi: {
     *     contract: {
     *       name: 'v1-1.immutable.bundle'
     *     }
     *   }
     * });
     */
  }, {
    key: "empty",
    value: function () {
      var _empty = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
        var _options$nftfi3, _options$nftfi3$contr, _response, response, contractName, contractFactoryParams, contract, _contract, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              contractName = options === null || options === void 0 ? void 0 : (_options$nftfi3 = options.nftfi) === null || _options$nftfi3 === void 0 ? void 0 : (_options$nftfi3$contr = _options$nftfi3.contract) === null || _options$nftfi3$contr === void 0 ? void 0 : _options$nftfi3$contr.name;
              contractFactoryParams = this._getContractParams(contractName);
              _context3.t0 = contractName;
              _context3.next = _context3.t0 === 'v1.immutable.bundle' ? 6 : _context3.t0 === 'v1-1.immutable.bundle' ? 11 : 16;
              break;
            case 6:
              contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(contractFactoryParams.migrate);
              _context3.next = 9;
              return contract.call({
                "function": contractFactoryParams.migrate.empty["function"],
                args: [contractFactoryParams.immutable.address, options.immutable.id, (0, _classPrivateFieldGet2["default"])(this, _account).getAddress()]
              });
            case 9:
              response = _context3.sent;
              return _context3.abrupt("break", 16);
            case 11:
              _contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(contractFactoryParams.immutable);
              _context3.next = 14;
              return _contract.call({
                "function": contractFactoryParams.immutable.empty["function"],
                args: [options.immutable.id, (0, _classPrivateFieldGet2["default"])(this, _account).getAddress()]
              });
            case 14:
              response = _context3.sent;
              return _context3.abrupt("break", 16);
            case 16:
              result = {
                success: ((_response = response) === null || _response === void 0 ? void 0 : _response.status) === 1 || false
              };
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle(result));
            case 20:
              _context3.prev = 20;
              _context3.t1 = _context3["catch"](0);
              if (!(_context3.t1 instanceof ContractNameNotSupportedError)) {
                _context3.next = 26;
                break;
              }
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle({
                nftfi: {
                  contract: {
                    name: _context3.t1.message
                  }
                }
              }));
            case 26:
              return _context3.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context3.t1));
            case 27:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 20]]);
      }));
      function empty(_x3) {
        return _empty.apply(this, arguments);
      }
      return empty;
    }()
    /**
     * Migrates an immutable from one contract to another.
     *
     * @param {Object} options - An object containing options for the migration operation.
     * @param {string} options.immutable.id - The ID of the immutable object to be migrated.
     * @param {string} options.from.nftfi.contract.name - Name of the source immutable contract.
     * @param {string} options.to.nftfi.contract.name - Name of the destination immutable contract.
     *
     * @returns {Object} An object containing information about the migrated immutable object.
     *
     * @example
     * // Approve the v1 immutable contract with the v1 migration contract.
     * const approvalResult = await nftfi.erc721.setApprovalForAll({
     *   token: {
     *     address: nftfi.config.immutable.v1.address
     *   },
     *   nftfi: { contract: { name: 'v1.bundler.migrate' } }
     * });
     * // Migrate an immutable from a v1 contract to a v1.1 contract.
     * const migrateResult = await nftfi.immutables.migrate({
     *   immutable: { id: '42' },
     *   from: {
     *     nftfi: {
     *       contract: {
     *         name: 'v1.immutable.bundle'
     *       }
     *     }
     *   },
     *   to: {
     *     nftfi: {
     *       contract: {
     *         name: 'v1-1.immutable.bundle'
     *       }
     *     }
     *   }
     * });
     */
  }, {
    key: "migrate",
    value: function () {
      var _migrate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var _this4 = this;
        var _options$immutable, immutableId, migrateContractParams, migrateContract;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              immutableId = options === null || options === void 0 ? void 0 : (_options$immutable = options.immutable) === null || _options$immutable === void 0 ? void 0 : _options$immutable.id;
              migrateContractParams = this._getMigrateContractParams(options);
              migrateContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create(migrateContractParams.migrate);
              return _context4.abrupt("return", migrateContract.call({
                "function": 'migrateImmutable',
                args: [migrateContractParams.from.address, migrateContractParams.to.address, immutableId]
              }).then(function (result) {
                var _options$to3, _options$to3$nftfi, _options$to3$nftfi$co;
                var log = result.logs.find(function (l) {
                  return l.name === 'ImmutableMigrated';
                });
                var newImmutableId = log.args.newImmutableId.toString();
                return (0, _classPrivateFieldGet2["default"])(_this4, _result).handle({
                  immutable: {
                    id: newImmutableId
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
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              if (!(_context4.t0 instanceof MigrationNotSupportedError)) {
                _context4.next = 11;
                break;
              }
              return _context4.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle({
                nftfi: {
                  contract: {
                    name: _context4.t0.message
                  }
                }
              }));
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 7]]);
      }));
      function migrate(_x4) {
        return _migrate.apply(this, arguments);
      }
      return migrate;
    }()
  }]);
  return Immutables;
}();
var _default = Immutables;
exports["default"] = _default;