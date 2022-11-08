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

  _isTokenValid(token) {
    if (token) {
      const accountAddress = this.#account.getAuthAddress();
      const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      return (
        Date.now() < decodedToken.exp * 1000 && decodedToken.account.toLowerCase() === accountAddress.toLowerCase()
      );
    }
    return false;
  }

  async getToken() {
    if (this._isTokenValid(this.#token)) {
      return this.#token;
    }

    if (typeof global?.window?.localStorage !== 'undefined') {
      const sdkToken = global.window.localStorage.getItem('sdkToken');
      if (this._isTokenValid(sdkToken)) {
        this.#token = sdkToken;
        return this.#token;
      }

      const dappToken = global?.window?.localStorage.getItem('jwtToken');
      if (this._isTokenValid(dappToken)) {
        global.window.localStorage.setItem('sdkToken', dappToken);
        this.#token = dappToken;
        return this.#token;
      }
    }

    // Request token
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
      if (typeof global?.window?.localStorage !== 'undefined') {
        global.window.localStorage.setItem('sdkToken', token);
      }
      this.#token = token;
    } else {
      throw result?.data?.message;
    }
    return this.#token;
  }
}

export default Auth;
