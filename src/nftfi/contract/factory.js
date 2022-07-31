class ContractFactory {
  #signer;
  #ethers;
  #account;
  #Contract;

  constructor(options) {
    this.#signer = options?.signer;
    this.#ethers = options?.ethers;
    this.#account = options?.account;
    this.#Contract = options?.Contract;
  }

  create(options) {
    const ethersContract = new this.#ethers.Contract(options?.address, options?.abi, this.#signer);
    const contract = new this.#Contract({
      account: this.#account,
      contract: ethersContract
    });
    return contract;
  }
}

export default ContractFactory;
