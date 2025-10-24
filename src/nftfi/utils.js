/**
 * @class
 * Class with utility methods.
 */
class Utils {
  #ethers;
  #web3;
  #BN;
  #Date;
  #Math;
  #Number;
  #contractFactory;
  #config;
  #arcade;
  #gondi;
  #wallet;

  constructor(options = {}) {
    this.#ethers = options?.ethers;
    this.#web3 = options?.web3;
    this.#BN = options?.BN;
    this.#Date = options?.Date;
    this.#Math = options?.Math;
    this.#Number = options?.Number;
    this.#contractFactory = options?.contractFactory;
    this.#config = options?.config;
    this.#arcade = options?.arcade;
    this.#gondi = options?.gondi;
    this.#wallet = options?.wallet;
  }

  /**
   * Gets random nonce.
   *
   * @returns {string} Nonce
   *
   * @example
   * // Get a random nonce
   * const nonce = nftfi.utils.getNonce();
   */
  getNonce() {
    const rand = this.#web3.utils.randomHex(32).replace('0x', '');
    const nonce = new this.#BN(rand, 16).toString();
    return nonce;
  }

  /**
   * Gets an expiry timestamp.
   *
   * @returns {number} Expiry
   *
   * @example
   * // Get an expiry timestamp into the future
   * const expiry = nftfi.utils.getExpiry();
   */
  getExpiry(seconds) {
    const currentTimestampSecs = this.#Math.floor(this.#Date.now() / 1000);
    const secondsIntoTheFuture = seconds || 24 * 60 * 60; // 24 hours
    const expiry = currentTimestampSecs + secondsIntoTheFuture;
    return expiry;
  }

  /**
   * Formats an amount of wei into a decimal string representing the amount of ether.
   *
   * @param {number} wei - Wei denomination of the amount
   * @returns {string} Ether denomination of the amount
   *
   * @example
   * // Format wei into the amount of ether
   * const wei = 100;
   * const ether = nftfi.utils.formatEther(wei);
   */
  formatEther(wei) {
    const weiString = wei.toLocaleString('fullwide', { useGrouping: false });
    return this.#ethers.utils.formatEther(weiString);
  }

  /**
   * Formats an amount of wei into a decimal string representing the amount of unit.
   *
   * @param {BigNumber} wei - Wei denomination of the amount
   * @param {string} unit - Unit denomination to format value
   * @returns {string} String representation of value formatted with unit digits
   *
   * @example
   * // Format usdc wei amount into the amount of unit
   * const wei = '1000000';
   * const usdc = nftfi.utils.formatUnits(wei, 'mwei'); // 1 usdc
   *
   * @example
   * // Format wei into the amount of unit
   * const wei = '1000000000000000000';
   * const ether = nftfi.utils.formatUnits(wei, 'ether'); // 1 ether
   */
  formatUnits(wei, unit) {
    const weiString = wei.toLocaleString('fullwide', { useGrouping: false });
    return this.#ethers.utils.formatUnits(weiString, unit);
  }

  /**
   * Formats value into a BigNumber representing the value in wei from the unit specified.
   *
   * @param {number} value - Value
   * @param {string} unit - Unit denomination to format from
   * @returns {BigNumber} BigNumber representation of value parsed with unit digits
   *
   * @example
   * // Format usdc amount into the amount of wei
   * const value = 1;
   * const usdcWei = nftfi.utils.formatWei(value, 'mwei'); // 1000000
   *
   * @example
   * // Format ether amount into the amount of wei
   * const value = 100;
   * const wei = nftfi.utils.formatWei(value, 'ether'); // 100000000000000000000
   */
  formatWei(value, unit) {
    const valueString = value.toLocaleString('fullwide', { useGrouping: false });
    return this.#ethers.utils.parseUnits(valueString, unit);
  }

  /**
   * Calculates the loan repayment amount given its other parameters.
   *
   * @param {number} principal - The loan's principal amount, in base units (eg. 1000000000000000000 wei)
   * @param {number} apr - The APR (yearly percentage rate)
   * @param {number} duration - The duration of the loan denominated in days
   * @returns {number} The result maximum repayment amount, in base units (eg. 1250000000000000000 wei)
   *
   * @example
   * // Calculate the loan repayment amount
   * const principal = 1000000000000000000;
   * const apr = 32;
   * const duration = 30;
   * const amount = nftfi.utils.calcRepaymentAmount(principal, apr, duration);
   */
  calcRepaymentAmount(principal, apr, duration) {
    const p = this.#Number.parseInt(principal);
    return Math.floor(((p * apr) / 100) * (duration / 365) + p);
  }

  /**
   * Calculates the loan APR (yearly percentage rate) given its other parameters
   *
   * @param {number} principal - The loan's principal amount in base units (eg. 1000000000000000000 wei)
   * @param {number} repayment - The maximum repayment amount to be paid by the borrower, in base units (eg. 1230000000000000000 wei)
   * @param {number} duration - The duration of the loan denominated in days
   * @returns {number} The result APR
   *
   * @example
   * // Calculate the APR
   * const principal = 1000000000000000000;
   * const repayment = 1500000000000000000;
   * const duration = 30;
   * const apr = nftfi.utils.calcApr(principal, repayment, duration);
   */
  calcApr(principal, repayment, duration) {
    return ((repayment * 100) / principal - 100) * (365 / duration);
  }

  /**
   * Calculates the effective APR (annual percentage rate) of a loan given its parameters
   *
   * @param {string|bigint} principal - The loan's principal amount in base units (e.g., "1000000000000000000" wei)
   * @param {string|bigint} repayment - The total repayment amount to be paid by the borrower, in base units (e.g., "1100000000000000000" wei)
   * @param {string|number} duration - The duration of the loan in days
   * @param {string|bigint} originationFee - The origination fee of the loan in base units (e.g., "10000000000000000" wei). Defaults to 0 if undefined or null.
   * @returns {number|null} The APR in %, calculated including the origination fee
   *
   * @example
   * // Calculate the effective APR
   * const principal = "1000000000000000000";
   * const repayment = "1100000000000000000";
   * const duration = 30;
   * const originationFee = "10000000000000000";
   * const apr = calculateEffectiveApr(principal, repayment, duration, originationFee);
   * console.log(apr); // Outputs the APR as a percentage
   */
  calcEffectiveApr = (principal, repayment, duration, originationFee) => {
    const principalBig = BigInt(principal);
    const repaymentBig = BigInt(repayment);
    const originationFeeBig = originationFee ? BigInt(originationFee) : 0n;

    const totalPaid = repaymentBig + originationFeeBig;
    const interestPaid = totalPaid - principalBig;

    const interestPaidNumber = Number(interestPaid);
    const principalNumber = Number(principalBig);

    const apr = Math.round(Number(interestPaidNumber / principalNumber / duration) * 365 * 100 * 100) / 100;

    return Number.isFinite(apr) ? Math.max(apr, 0) : null;
  };

  /**
   * Checks if a token contract supports specific interfaces (ERC1155 and ERC721).
   *
   * @param {Object} options - The options for performing the contract interface checks.
   * @param {address} options.token.address - The contract address to do interface checks against.
   * @returns {Object} - The combined results for the various interface checks.
   *
   */
  async getSupportedInterface(options) {
    const contract = this.#contractFactory.create({
      address: options.token.address,
      abi: ['function supportsInterface(bytes4 interfaceId) view returns (bool)']
    });
    const supportsInterface = async (contract, interfaceName) => {
      let result = null;
      try {
        result = await contract.call({
          function: 'supportsInterface',
          args: [this.#config[interfaceName].interfaceId]
        });
      } catch (e) {
        result = false;
      }
      return result;
    };
    const [isERC721, isERC1155] = await Promise.all([
      supportsInterface(contract, 'erc721'),
      supportsInterface(contract, 'erc1155')
    ]);
    return {
      isERC721,
      isERC1155
    };
  }

  get arcade() {
    return this.#arcade;
  }

  get gondi() {
    return this.#gondi;
  }

  get wallet() {
    return this.#wallet;
  }
}

export default Utils;
