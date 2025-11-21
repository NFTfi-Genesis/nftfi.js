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
var _config = /*#__PURE__*/new WeakMap();
var _contractFactory = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
var _error = /*#__PURE__*/new WeakMap();
var _provider = /*#__PURE__*/new WeakMap();
var _account = /*#__PURE__*/new WeakMap();
var _ethers = /*#__PURE__*/new WeakMap();
var UtilsGondi = /*#__PURE__*/function () {
  function UtilsGondi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, UtilsGondi);
    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _contractFactory, {
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
    _classPrivateFieldInitSpec(this, _provider, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _contractFactory, options === null || options === void 0 ? void 0 : options.contractFactory);
    (0, _classPrivateFieldSet2["default"])(this, _result, options === null || options === void 0 ? void 0 : options.result);
    (0, _classPrivateFieldSet2["default"])(this, _error, options === null || options === void 0 ? void 0 : options.error);
    (0, _classPrivateFieldSet2["default"])(this, _provider, options === null || options === void 0 ? void 0 : options.provider);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
  }
  (0, _createClass2["default"])(UtilsGondi, [{
    key: "getGondiLoanDetails",
    value: function () {
      var _getGondiLoanDetails = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(hash) {
        var address, abi, name, receipt, _yield$this$findEvent, contractAddress;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _classPrivateFieldGet2["default"])(this, _provider).getTransactionReceipt(hash);
            case 2:
              receipt = _context.sent;
              address = receipt.to;
              if (!(address.toLowerCase() === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3.address.toLowerCase())) {
                _context.next = 9;
                break;
              }
              abi = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3.abi;
              name = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3.name;
              _context.next = 19;
              break;
            case 9:
              if (!(address.toLowerCase() === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3_1.address.toLowerCase())) {
                _context.next = 14;
                break;
              }
              abi = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3_1.abi;
              name = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3_1.name;
              _context.next = 19;
              break;
            case 14:
              _context.next = 16;
              return this.findEventLog(hash);
            case 16:
              _yield$this$findEvent = _context.sent;
              contractAddress = _yield$this$findEvent.contractAddress;
              if (contractAddress.toLowerCase() === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3.address.toLowerCase()) {
                abi = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3.abi;
                name = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3.name;
              } else if (contractAddress.toLowerCase() === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3_1.address.toLowerCase()) {
                abi = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3_1.abi;
                name = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3_1.name;
              }
            case 19:
              return _context.abrupt("return", {
                address: address,
                abi: abi,
                name: name
              });
            case 20:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getGondiLoanDetails(_x) {
        return _getGondiLoanDetails.apply(this, arguments);
      }
      return getGondiLoanDetails;
    }()
  }, {
    key: "findEventLog",
    value: function () {
      var _findEventLog = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(hash) {
        var receipt, abi, iface, eventNames, eventLog, _loop, _i, _eventNames, _ret, parsedEvent;
        return _regenerator["default"].wrap(function _callee2$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _classPrivateFieldGet2["default"])(this, _provider).getTransactionReceipt(hash);
            case 2:
              receipt = _context3.sent;
              abi = (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3.abi;
              iface = new ((0, _classPrivateFieldGet2["default"])(this, _ethers).utils.Interface)(abi);
              eventNames = ['LoanRefinancedFromNewOffers', 'LoanRefinanced', 'LoanEmitted'];
              eventLog = null;
              _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
                var eventName;
                return _regenerator["default"].wrap(function _loop$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      eventName = _eventNames[_i];
                      eventLog = receipt.logs.find(function (log) {
                        try {
                          var parsed = iface.parseLog(log);
                          return parsed.name === eventName;
                        } catch (e) {
                          return false;
                        }
                      });
                      if (!eventLog) {
                        _context2.next = 4;
                        break;
                      }
                      return _context2.abrupt("return", "break");
                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }, _loop);
              });
              _i = 0, _eventNames = eventNames;
            case 9:
              if (!(_i < _eventNames.length)) {
                _context3.next = 17;
                break;
              }
              return _context3.delegateYield(_loop(), "t0", 11);
            case 11:
              _ret = _context3.t0;
              if (!(_ret === "break")) {
                _context3.next = 14;
                break;
              }
              return _context3.abrupt("break", 17);
            case 14:
              _i++;
              _context3.next = 9;
              break;
            case 17:
              parsedEvent = iface.parseLog(eventLog);
              return _context3.abrupt("return", {
                parsedEvent: parsedEvent,
                contractAddress: eventLog.address
              });
            case 19:
            case "end":
              return _context3.stop();
          }
        }, _callee2, this);
      }));
      function findEventLog(_x2) {
        return _findEventLog.apply(this, arguments);
      }
      return findEventLog;
    }()
  }, {
    key: "getLoanData",
    value: function () {
      var _getLoanData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(hash) {
        var _yield$this$getGondiL, gondiContractName, _yield$this$findEvent2, parsedEvent;
        return _regenerator["default"].wrap(function _callee3$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.getGondiLoanDetails(hash);
            case 2:
              _yield$this$getGondiL = _context4.sent;
              gondiContractName = _yield$this$getGondiL.name;
              _context4.next = 6;
              return this.findEventLog(hash);
            case 6:
              _yield$this$findEvent2 = _context4.sent;
              parsedEvent = _yield$this$findEvent2.parsedEvent;
              return _context4.abrupt("return", {
                loanData: parsedEvent.args.loan,
                gondiContractName: gondiContractName
              });
            case 9:
            case "end":
              return _context4.stop();
          }
        }, _callee3, this);
      }));
      function getLoanData(_x3) {
        return _getLoanData.apply(this, arguments);
      }
      return getLoanData;
    }()
  }, {
    key: "getBorrowerRepaymentSignature",
    value: function () {
      var _getBorrowerRepaymentSignature = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(hash) {
        var provider, _yield$provider$getNe, chainId, _yield$this$getGondiL2, gondiContractAddress, gondiAbi, _yield$this$findEvent3, parsedEvent, gondiContract, name, versionBytes, version, domain, types, loanId, repaymentValue, signature;
        return _regenerator["default"].wrap(function _callee4$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              provider = (0, _classPrivateFieldGet2["default"])(this, _provider);
              _context5.next = 3;
              return provider.getNetwork();
            case 3:
              _yield$provider$getNe = _context5.sent;
              chainId = _yield$provider$getNe.chainId;
              _context5.next = 7;
              return this.getGondiLoanDetails(hash);
            case 7:
              _yield$this$getGondiL2 = _context5.sent;
              gondiContractAddress = _yield$this$getGondiL2.address;
              gondiAbi = _yield$this$getGondiL2.abi;
              _context5.next = 12;
              return this.findEventLog(hash);
            case 12:
              _yield$this$findEvent3 = _context5.sent;
              parsedEvent = _yield$this$findEvent3.parsedEvent;
              gondiContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: gondiContractAddress,
                abi: gondiAbi
              });
              _context5.next = 17;
              return gondiContract.call({
                "function": 'name',
                args: []
              });
            case 17:
              name = _context5.sent;
              _context5.next = 20;
              return gondiContract.call({
                "function": 'VERSION',
                args: []
              });
            case 20:
              versionBytes = _context5.sent;
              version = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.toUtf8String(versionBytes);
              domain = {
                name: name,
                version: version,
                chainId: chainId,
                verifyingContract: gondiContractAddress
              };
              types = {
                SignableRepaymentData: [{
                  name: 'loanId',
                  type: 'uint256'
                }, {
                  name: 'callbackData',
                  type: 'bytes'
                }, {
                  name: 'shouldDelegate',
                  type: 'bool'
                }]
              };
              if (parsedEvent.name === 'LoanRefinanced' || parsedEvent.name === 'LoanRefinancedFromNewOffers') {
                loanId = parsedEvent.args.newLoanId.toString();
              } else {
                loanId = parsedEvent.args.loanId.toString();
              }
              console.log('Loan ID:', loanId);
              repaymentValue = {
                loanId: loanId,
                callbackData: '0x',
                shouldDelegate: false
              };
              _context5.next = 29;
              return (0, _classPrivateFieldGet2["default"])(this, _account).signTypedData(domain, types, repaymentValue);
            case 29:
              signature = _context5.sent;
              return _context5.abrupt("return", {
                signature: signature,
                repaymentValue: repaymentValue
              });
            case 31:
            case "end":
              return _context5.stop();
          }
        }, _callee4, this);
      }));
      function getBorrowerRepaymentSignature(_x4) {
        return _getBorrowerRepaymentSignature.apply(this, arguments);
      }
      return getBorrowerRepaymentSignature;
    }()
  }, {
    key: "getRefinancingData",
    value: function () {
      var _getRefinancingData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref) {
        var hash, _yield$this$getLoanDa, loanData, gondiContractName, _yield$this$getBorrow, signature, repaymentValue, _yield$this$getGondiL3, gondiContractAddress, gondiLoanId, loanRepaymentData, abiCoder, encodedRefinancingData, gondiAdapterContract, payoffDetails;
        return _regenerator["default"].wrap(function _callee5$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              hash = _ref.hash;
              _context6.prev = 1;
              _context6.next = 4;
              return this.getLoanData(hash);
            case 4:
              _yield$this$getLoanDa = _context6.sent;
              loanData = _yield$this$getLoanDa.loanData;
              gondiContractName = _yield$this$getLoanDa.gondiContractName;
              _context6.next = 9;
              return this.getBorrowerRepaymentSignature(hash);
            case 9:
              _yield$this$getBorrow = _context6.sent;
              signature = _yield$this$getBorrow.signature;
              repaymentValue = _yield$this$getBorrow.repaymentValue;
              _context6.next = 14;
              return this.getGondiLoanDetails(hash);
            case 14:
              _yield$this$getGondiL3 = _context6.sent;
              gondiContractAddress = _yield$this$getGondiL3.address;
              gondiLoanId = repaymentValue.loanId;
              loanRepaymentData = {
                data: repaymentValue,
                loan: loanData,
                borrowerSignature: signature
              };
              abiCoder = new ((0, _classPrivateFieldGet2["default"])(this, _ethers).utils.AbiCoder)();
              encodedRefinancingData = abiCoder.encode(['tuple(tuple(uint256 loanId, bytes callbackData, bool shouldDelegate) data, tuple(address borrower, uint256 nftCollateralTokenId, address nftCollateralAddress, address principalAddress, uint256 principalAmount, uint256 startTime, uint256 duration, tuple(uint256 loanId, uint256 floor, uint256 principalAmount, address lender, uint256 accruedInterest, uint256 startTime, uint256 aprBps)[] tranche, uint256 protocolFee) loan, bytes borrowerSignature)'], [loanRepaymentData]);
              gondiAdapterContract = (0, _classPrivateFieldGet2["default"])(this, _contractFactory).create({
                address: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.adaptors.gondi.address,
                abi: (0, _classPrivateFieldGet2["default"])(this, _config).protocol.v3.adaptors.gondi.abi
              });
              _context6.next = 23;
              return gondiAdapterContract.call({
                "function": 'getPayoffDetails',
                args: [gondiContractAddress, gondiLoanId, encodedRefinancingData]
              });
            case 23:
              payoffDetails = _context6.sent;
              return _context6.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _result).handle({
                gondiContractName: gondiContractName,
                repaymentAmount: payoffDetails[1].toString(),
                encodedRefinancingData: encodedRefinancingData
              }));
            case 27:
              _context6.prev = 27;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _error).handle(_context6.t0));
            case 30:
            case "end":
              return _context6.stop();
          }
        }, _callee5, this, [[1, 27]]);
      }));
      function getRefinancingData(_x5) {
        return _getRefinancingData.apply(this, arguments);
      }
      return getRefinancingData;
    }()
  }, {
    key: "isRefinanceable",
    value: function isRefinanceable(address) {
      if (address.toLowerCase() === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3_1.address.toLowerCase()) {
        return (0, _classPrivateFieldGet2["default"])(this, _result).handle({
          isRefinanceable: true
        });
      } else if (address.toLowerCase() === (0, _classPrivateFieldGet2["default"])(this, _config).protocol.gondi.loan.v3.address.toLowerCase()) {
        return (0, _classPrivateFieldGet2["default"])(this, _result).handle({
          isRefinanceable: true
        });
      }
      return (0, _classPrivateFieldGet2["default"])(this, _result).handle({
        isRefinanceable: false
      });
    }
  }]);
  return UtilsGondi;
}();
var _default = UtilsGondi;
exports["default"] = _default;