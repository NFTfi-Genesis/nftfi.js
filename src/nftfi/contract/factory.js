class ContractFactory {
  #signer;
  #ethers;
  #account;
  #Contract;
  #provider;
  #assertion;

  constructor(options) {
    this.#signer = options?.signer;
    this.#ethers = options?.ethers;
    this.#account = options?.account;
    this.#Contract = options?.Contract;
    this.#provider = options?.provider;
    this.#assertion = options?.assertion;
  }

  create(options) {
    let ethersContract;
    if (this.#signer) {
      ethersContract = new this.#ethers.Contract(options?.address, options?.abi, this.#signer);
    } else {
      this.#assertion.hasProvider();
      ethersContract = new this.#ethers.Contract(options?.address, options?.abi, this.#provider);
    }
    const contract = new this.#Contract({
      account: this.#account,
      contract: ethersContract
    });
    return contract;
  }
}

export default ContractFactory;
