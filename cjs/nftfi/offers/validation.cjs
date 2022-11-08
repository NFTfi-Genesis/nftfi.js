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

var _erc = /*#__PURE__*/new WeakMap();

var _ethers = /*#__PURE__*/new WeakMap();

var _config = /*#__PURE__*/new WeakMap();

var _contractFactory = /*#__PURE__*/new WeakMap();

var OffersValidator = /*#__PURE__*/function () {
  function OffersValidator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, OffersValidator);

    _classPrivateFieldInitSpec(this, _erc, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _contractFactory, {
      writable: true,
      value: void 0
    });

    (0, _classPrivateFieldSet2["default"])(this, _erc, options === null || options === void 0 ? void 0 : options.erc20);
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
  }

  (0, _createClass2["default"])(OffersValidator, [{
    key: "_getContractAddressAndAbi",
    value: function _getContractAddressAndAbi(contractName) {
      switch (contractName) {
        case 'v2-1.loan.fixed':
          return {
            address: (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v2_1.address,
            abi: (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v2_1.abi
          };

        case 'v2.loan.fixed.collection':
          return {
            address: (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2.address,
            abi: (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.collection.v2.abi
          };
      }
    }
  }, {
    key: "_isValidAllowance",
    value: function () {
      var _isValidAllowance2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var _options$gte, allowance;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _classPrivateFieldGet2["default"])(this, _erc).allowance(options);

              case 3:
                allowance = _context.sent;
                return _context.abrupt("return", (options === null || options === void 0 ? void 0 : (_options$gte = options.gte) === null || _options$gte === void 0 ? void 0 : _options$gte.amount) && allowance.gte(options.gte.amount));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function _isValidAllowance(_x) {
        return _isValidAllowance2.apply(this, arguments);
      }

      return _isValidAllowance;
    }()
  }, {
    key: "_isValidBalance",
    value: function () {
      var _isValidBalance2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var _options$gte2, balance;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return (0, _classPrivateFieldGet2["default"])(this, _erc).balanceOf(options);

              case 3:
                balance = _context2.sent;
                return _context2.abrupt("return", !(options !== null && options !== void 0 && (_options$gte2 = options.gte) !== null && _options$gte2 !== void 0 && _options$gte2.amount && !balance.gte(options.gte.amount)));

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", _context2.t0);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function _isValidBalance(_x2) {
        return _isValidBalance2.apply(this, arguments);
      }

      return _isValidBalance;
    }()
  }, {
    key: "_isValidSignature",
    value: function () {
      var _isValidSignature2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(offer) {
        var _this$_getContractAdd, loanContract, contract, offerTerms, signature;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _this$_getContractAdd = this._getContractAddressAndAbi(offer.nftfi.contract.name), loanContract = _this$_getContractAdd.address;
                contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                  address: (0, _classPrivateFieldGet2["default"])(this, _config).signingUtils.v2.address,
                  abi: (0, _classPrivateFieldGet2["default"])(this, _config).signingUtils.v2.abi
                });
                offerTerms = {
                  loanPrincipalAmount: offer.terms.loan.principal.toLocaleString('fullwide', {
                    useGrouping: false
                  }),
                  maximumRepaymentAmount: offer.terms.loan.repayment.toLocaleString('fullwide', {
                    useGrouping: false
                  }),
                  nftCollateralId: offer.nft.id,
                  nftCollateralContract: offer.nft.address,
                  loanDuration: offer.terms.loan.duration,
                  loanAdminFeeInBasisPoints: offer.nftfi.fee.bps.toString(),
                  loanERC20Denomination: offer.terms.loan.currency,
                  referrer: offer.referrer.address
                };
                signature = {
                  nonce: offer.lender.nonce.toString(),
                  expiry: offer.terms.loan.expiry.toString(),
                  signer: offer.lender.address,
                  signature: offer.signature
                };
                _context3.next = 7;
                return contract.call({
                  "function": 'isValidLenderSignature',
                  args: [offerTerms, signature, loanContract]
                });

              case 7:
                return _context3.abrupt("return", _context3.sent);

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", _context3.t0);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 10]]);
      }));

      function _isValidSignature(_x3) {
        return _isValidSignature2.apply(this, arguments);
      }

      return _isValidSignature;
    }()
  }, {
    key: "_isValidNonce",
    value: function () {
      var _isValidNonce2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(offer) {
        var _this$_getContractAdd2, loanContract, loanContractAbi, contract, isUsedNonce;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _this$_getContractAdd2 = this._getContractAddressAndAbi(offer.nftfi.contract.name), loanContract = _this$_getContractAdd2.address, loanContractAbi = _this$_getContractAdd2.abi;
                contract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                  address: loanContract,
                  abi: loanContractAbi
                });
                _context4.next = 5;
                return contract.call({
                  "function": 'getWhetherNonceHasBeenUsedForUser',
                  args: [offer.lender.address, offer.lender.nonce]
                });

              case 5:
                isUsedNonce = _context4.sent;
                return _context4.abrupt("return", !isUsedNonce);

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", _context4.t0);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 9]]);
      }));

      function _isValidNonce(_x4) {
        return _isValidNonce2.apply(this, arguments);
      }

      return _isValidNonce;
    }()
  }, {
    key: "_addError",
    value: function _addError(key, status, type, msg, errors) {
      if (errors[key]) {
        errors[key].push({
          status: status,
          type: type,
          msg: msg
        });
      } else {
        errors[key] = [{
          status: status,
          type: type,
          msg: msg
        }];
      }

      return errors;
    }
  }, {
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(offer) {
        var _this = this;

        var errors, contract, currency, lender, principalBn, isValidSignature, isValidNonce, isValidAllowance, isValidBalance;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                errors = {}; // Early return if offer is expired, no need to proceed with other async calls

                if (!(Date.now() > offer.terms.loan.expiry * 1000)) {
                  _context5.next = 4;
                  break;
                }

                this._addError('terms.expiry', 'invalid', 'expiry', 'offer expiry is in the past', errors);

                return _context5.abrupt("return", errors);

              case 4:
                contract = offer.nftfi.contract.name;
                currency = offer.terms.loan.currency;
                lender = offer.lender.address;
                principalBn = (0, _classPrivateFieldGet2["default"])(this, _ethers).BigNumber.from(offer.terms.loan.principal.toLocaleString('fullwide', {
                  useGrouping: false
                }));
                isValidSignature = offer.signature ? this._isValidSignature(offer) : true;
                isValidNonce = this._isValidNonce(offer);
                isValidAllowance = this._isValidAllowance({
                  nftfi: {
                    contract: {
                      name: contract
                    }
                  },
                  account: {
                    address: lender
                  },
                  token: {
                    address: currency
                  },
                  gte: {
                    amount: principalBn
                  }
                });
                isValidBalance = this._isValidBalance({
                  nftfi: {
                    contract: {
                      name: contract
                    }
                  },
                  account: {
                    address: lender
                  },
                  token: {
                    address: currency
                  },
                  gte: {
                    amount: principalBn
                  }
                });
                return _context5.abrupt("return", Promise.all([isValidAllowance, isValidBalance, isValidSignature, isValidNonce]).then(function (checks) {
                  var msg = '';
                  var status = '';
                  var type = '';

                  if (checks[0] !== true) {
                    type = 'erc20.allowance';
                    status = checks[0] ? 'error' : 'invalid';
                    msg = checks[0] ? 'failed to check allowance' : 'principal is greater than approved allowance on lender account';

                    _this._addError('terms.principal', status, type, msg, errors);
                  }

                  if (checks[1] !== true) {
                    type = 'erc20.balanceOf';
                    status = checks[1] ? 'error' : 'invalid';
                    msg = checks[1] ? 'failed to check balance' : 'principal is greater than available funds in lender account';

                    _this._addError('terms.principal', status, type, msg, errors);
                  }

                  if (checks[2] !== true) {
                    type = 'signingUtils.v2.isValidLenderSignature';
                    status = checks[2] ? 'error' : 'invalid';
                    msg = checks[2] ? 'failed to check signature' : 'signature is invalid or malformed';

                    _this._addError('signature', status, type, msg, errors);
                  }

                  if (checks[3] !== true) {
                    type = offer.nftfi.contract.name + '.getWhetherNonceHasBeenUsedForUser';
                    status = checks[3] ? 'error' : 'invalid';
                    msg = checks[3] ? 'failed to check nonce' : 'lender nonce has already been used';

                    _this._addError('lender.nonce', status, type, msg, errors);
                  }

                  return Object.keys(errors).length > 0 ? errors : null;
                }));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function validate(_x5) {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }]);
  return OffersValidator;
}();

var _default = OffersValidator;
exports["default"] = _default;