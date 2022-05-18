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

  constructor(options = {}) {
    this.#ethers = options?.ethers;
    this.#web3 = options?.web3;
    this.#BN = options?.BN;
    this.#Date = options?.Date;
    this.#Math = options?.Math;
    this.#Number = options?.Number;
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
   * // Get an expiry timestamp far into the future
   * const expiry = nftfi.utils.getExpiry();
   */
  getExpiry() {
    const currentTimestampSecs = this.#Math.floor(this.#Date.now() / 1000);
    const secondsIntoTheFuture = 365 * 24 * 60 * 60;
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
    return ((p * apr) / 100) * (duration / 365) + p;
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
}

export default Utils;
