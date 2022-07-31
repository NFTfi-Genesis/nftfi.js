class MultisigGnosis {
  #address;
  #owners;
  #signer;
  #provider;
  #ethers;

  constructor(options) {
    this.#address = options?.address;
    this.#owners = options?.owners;
    this.#signer = options?.signer;
    this.#provider = options?.provider;
    this.#ethers = options?.ethers;
  }

  isMultisig() {
    const multisig = {
      type: 'gnosis'
    };
    return multisig;
  }

  getAddress() {
    return this.#address;
  }

  getAuthAddress() {
    const owner = this.#owners[0];
    const address = owner.getAddress();
    return address;
  }

  getSigner() {
    return this.#signer;
  }

  async execTransaction(tx) {
    // Always make sure that value is never undefined
    tx.value = tx.value || '0';
    // Get all safe SDKs
    const safeSDKs = await Promise.all(this.#owners.map(async owner => owner.getSafeSDK()));
    const baseSafeSDK = safeSDKs[0];
    const otherSafeSDKs = safeSDKs.slice(1);
    // Create a safe transaction using the base safe sdk
    const safeTransaction = await baseSafeSDK.createTransaction(tx);
    // Approve the safe transaction using other safe sdks
    await Promise.all(
      otherSafeSDKs.map(async safeSDK => {
        return safeSDK.signTransaction(safeTransaction);
      })
    );
    // Execute the transaction using the base sdk
    const receipt = await baseSafeSDK.executeTransaction(safeTransaction);
    const response = receipt.transactionResponse.wait();
    return response;
  }

  async sign(message) {
    const signatures = await this._getMultiSignatures(message);
    const signature = this._concatSignatures(signatures);
    return signature;
  }

  async authSign(message) {
    const owner = this.#owners[0];
    const signer = new this.#ethers.Wallet(owner.getPrivateKey(), this.#provider);
    const signedMsg = await signer.signMessage(message);
    return signedMsg;
  }

  async _getMultiSignatures(message) {
    let signatures = await Promise.all(
      this.#owners.map(async owner => {
        let signature = {
          address: owner.getAddress(),
          data: await owner.sign(message)
        };
        return signature;
      })
    );
    return signatures;
  }

  _concatSignatures(signatures) {
    //https://github.com/safe-global/safe-contracts/blob/c36bcab46578a442862d043e12a83fec41143dec/src/utils/execution.ts#L111
    signatures.sort((left, right) => left.address.localeCompare(right.address));
    let signatureBytes = '0x';
    for (let signature of signatures) {
      signatureBytes += signature.data.slice(2);
    }
    return signatureBytes;
  }
}

export default MultisigGnosis;
