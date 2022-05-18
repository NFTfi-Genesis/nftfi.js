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

var _ethers = /*#__PURE__*/new WeakMap();

var _account = /*#__PURE__*/new WeakMap();

var _erc20Abi = /*#__PURE__*/new WeakMap();

/**
 * @class
 * Class for working with ERC20 tokens.
 */
var Erc20 = /*#__PURE__*/function () {
  function Erc20(options) {
    (0, _classCallCheck2["default"])(this, Erc20);

    _classPrivateFieldInitSpec(this, _config, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _ethers, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _account, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _erc20Abi, {
      writable: true,
      value: void 0
    });

    (0, _classPrivateFieldSet2["default"])(this, _config, options === null || options === void 0 ? void 0 : options.config);
    (0, _classPrivateFieldSet2["default"])(this, _ethers, options === null || options === void 0 ? void 0 : options.ethers);
    (0, _classPrivateFieldSet2["default"])(this, _account, options === null || options === void 0 ? void 0 : options.account);
    (0, _classPrivateFieldSet2["default"])(this, _erc20Abi, ['function balanceOf(address owner) view returns (uint256)', 'function approve(address spender, uint256 value) returns (bool)', 'function allowance(address owner, address spender) public view returns (uint256)']);
  }
  /**
   * Approves your account's ERC20 spending amount, if not already approved, for v1 & v2 NFTfi contracts.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {string} options.token.address - The ERC20 token address
   * @param {string} options.nftfi.contract.name - The name of the contract NFTfi contract (eg. `v1.loan.fixed`, `v2.loan.fixed`)
   * @param {number} options.amount - The token amount to approve, in base units (eg. 1000000000000000000 wei)
   * @returns {boolean} Boolean value indicating whether the operation succeeded
   *
   * @example
   * const results = await nftfi.erc20.approve({
   *   amount: 1000000000000000000,
   *   token: { address: '0x00000000' },
   *   nftfi: { contract: { name: 'v2.loan.fixed' } }
   * });
   */


  (0, _createClass2["default"])(Erc20, [{
    key: "approve",
    value: function () {
      var _approve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
        var contractName, amount, signer, contract, contractAddress, success, allowance;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                contractName = options.nftfi.contract.name;
                amount = options.amount.toLocaleString('fullwide', {
                  useGrouping: false
                });
                _context.next = 4;
                return (0, _classPrivateFieldGet2["default"])(this, _account).getSigner();

              case 4:
                signer = _context.sent;
                contract = new ((0, _classPrivateFieldGet2["default"])(this, _ethers).Contract)(options.token.address, (0, _classPrivateFieldGet2["default"])(this, _erc20Abi), signer);
                _context.t0 = contractName;
                _context.next = _context.t0 === 'v1.loan.fixed' ? 9 : _context.t0 === 'v2.loan.fixed' ? 11 : 13;
                break;

              case 9:
                contractAddress = (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v1.address;
                return _context.abrupt("break", 13);

              case 11:
                contractAddress = (0, _classPrivateFieldGet2["default"])(this, _config).loan.fixed.v2.address;
                return _context.abrupt("break", 13);

              case 13:
                _context.next = 15;
                return contract.allowance((0, _classPrivateFieldGet2["default"])(this, _account).getAddress(), contractAddress);

              case 15:
                allowance = _context.sent;

                if (!(allowance.lt(amount) || amount === '0')) {
                  _context.next = 22;
                  break;
                }

                _context.next = 19;
                return contract.approve(contractAddress, amount);

              case 19:
                success = _context.sent;
                _context.next = 23;
                break;

              case 22:
                success = true;

              case 23:
                return _context.abrupt("return", success);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function approve(_x) {
        return _approve.apply(this, arguments);
      }

      return approve;
    }()
    /**
     * Returns your account's balance of a given ERC20 token.
     *
     * @param {object} options - Options
     * @param {string} options.token.address - The ERC20 token address
     * @returns {number} The user account's token balance, in base units (eg. 1000000000000000000 wei)
     *
     * @example
     * const balance = await nftfi.erc20.balanceOf({
     *   token: { address: '0x00000000' }
     * });
     */

  }, {
    key: "balanceOf",
    value: function () {
      var _balanceOf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
        var signer, contract, balance;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _classPrivateFieldGet2["default"])(this, _account).getSigner();

              case 2:
                signer = _context2.sent;
                contract = new ((0, _classPrivateFieldGet2["default"])(this, _ethers).Contract)(options.token.address, (0, _classPrivateFieldGet2["default"])(this, _erc20Abi), signer);
                _context2.next = 6;
                return contract.balanceOf((0, _classPrivateFieldGet2["default"])(this, _account).getAddress());

              case 6:
                balance = _context2.sent;
                return _context2.abrupt("return", balance);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function balanceOf(_x2) {
        return _balanceOf.apply(this, arguments);
      }

      return balanceOf;
    }()
  }]);
  return Erc20;
}();

var _default = Erc20;
exports["default"] = _default;