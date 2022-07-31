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

var _ethers = /*#__PURE__*/new WeakMap();

var _privateKey = /*#__PURE__*/new WeakMap();

var _config = /*#__PURE__*/new WeakMap();

var _multisig = /*#__PURE__*/new WeakMap();

var _provider = /*#__PURE__*/new WeakMap();

var _EthersAdapter = /*#__PURE__*/new WeakMap();

var _Safe = /*#__PURE__*/new WeakMap();

var MultisigGnosisOwner = /*#__PURE__*/function () {
  function MultisigGnosisOwner(options) {
    (0, _classCallCheck2["default"])(this, MultisigGnosisOwner);

    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _privateKey, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _multisig, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _provider, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _EthersAdapter, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _Safe, {
      writable: true,
      value: void 0
    });

    (0, _classPrivateFieldSet2["default"])(this, _multisig, options === null || options === void 0 ? void 0 : options.multisig);
    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
    (0, _classPrivateFieldSet2["default"])(this, _privateKey, options === null || options === void 0 ? void 0 : options.privateKey);
    (0, _classPrivateFieldSet2["default"])(this, _provider, options === null || options === void 0 ? void 0 : options.provider);
    (0, _classPrivateFieldSet2["default"])(this, _EthersAdapter, options === null || options === void 0 ? void 0 : options.EthersAdapter);
    (0, _classPrivateFieldSet2["default"])(this, _Safe, options === null || options === void 0 ? void 0 : options.Safe);
  }

  (0, _createClass2["default"])(MultisigGnosisOwner, [{
    key: "getPrivateKey",
    value: function getPrivateKey() {
      return (0, _classPrivateFieldGet2["default"])(this, _privateKey);
    }
  }, {
    key: "getAddress",
    value: function getAddress() {
      return (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.computeAddress((0, _classPrivateFieldGet2["default"])(this, _privateKey));
    }
  }, {
    key: "getSafeSDK",
    value: function getSafeSDK() {
      var safeAddress = (0, _classPrivateFieldGet2["default"])(this, _multisig).safe.address;
      var signer = new ((0, _classPrivateFieldGet2["default"])(this, _ethers).Wallet)(this.getPrivateKey(), (0, _classPrivateFieldGet2["default"])(this, _provider));
      var ethAdapter = new ((0, _classPrivateFieldGet2["default"])(this, _EthersAdapter)["default"])({
        ethers: (0, _classPrivateFieldGet2["default"])(this, _ethers),
        signer: signer
      });
      var safeSDK = (0, _classPrivateFieldGet2["default"])(this, _Safe)["default"].create({
        ethAdapter: ethAdapter,
        safeAddress: safeAddress
      });
      return safeSDK;
    }
  }, {
    key: "sign",
    value: function () {
      var _sign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(msg) {
        var verifyingContract, chainId, SafeMessage, message, hash, wallet, signature;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // expects that msg is Uint8Array
                verifyingContract = (0, _classPrivateFieldGet2["default"])(this, _multisig).safe.address;
                chainId = (0, _classPrivateFieldGet2["default"])(this, _config).chainId;
                SafeMessage = [{
                  type: 'bytes',
                  name: 'message'
                }];
                message = (0, _classPrivateFieldGet2["default"])(this, _ethers).utils.hashMessage(msg);
                _context.next = 6;
                return (0, _classPrivateFieldGet2["default"])(this, _ethers).utils._TypedDataEncoder.hash({
                  verifyingContract: verifyingContract,
                  chainId: chainId
                }, {
                  SafeMessage: SafeMessage
                }, {
                  message: message
                });

              case 6:
                hash = _context.sent;
                wallet = new ((0, _classPrivateFieldGet2["default"])(this, _ethers).Wallet)(this.getPrivateKey());
                _context.next = 10;
                return wallet.signMessage((0, _classPrivateFieldGet2["default"])(this, _ethers).utils.arrayify(hash));

              case 10:
                signature = _context.sent.replace(/1b$/, '1f').replace(/1c$/, '20');
                return _context.abrupt("return", signature);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sign(_x) {
        return _sign.apply(this, arguments);
      }

      return sign;
    }()
  }]);
  return MultisigGnosisOwner;
}();

var _default = MultisigGnosisOwner;
exports["default"] = _default;