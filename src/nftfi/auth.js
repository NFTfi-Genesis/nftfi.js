class Auth {
  #http;
  #account;
  #config;
  #utils;
  #token;

  constructor(options = {}) {
    this.#http = options?.http;
    this.#account = options?.account;
    this.#config = options?.config;
    this.#utils = options?.utils;
    this.#token;
  }

  async getToken() {
    if (!this.#token) {
      const nonce = this.#utils.getNonce();
      const accountAddress = this.#account.getAuthAddress();
      const message = `This message proves you own this wallet address : ${this.#account.getAuthAddress()}`;
      const messageToSign = `${message}\r\n\r\nChainId : ${this.#config.chainId}\r\nNonce : ${nonce})`;
      const signedMessage = await this.#account.authSign(messageToSign);
      const multisig = this.#account.isMultisig();
      const body = {
        message,
        nonce,
        accountAddress,
        signedMessage,
        multisig
      };
      const uri = `${this.#config.api.baseURI}/authorization/token`;
      const headers = {
        'X-API-Key': this.#config.api.key
      };
      const result = await this.#http.post(uri, body, {
        headers
      });
      const token = result?.data?.result?.token;
      if (token) {
        this.#token = token;
      } else {
        throw result?.data?.message;
      }
    }
    return this.#token;
  }
}

export default Auth;
