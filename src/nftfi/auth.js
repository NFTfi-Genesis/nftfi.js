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
    let environment = null

    if (this._isTokenValid(this.#token)) {
      return this.#token;
    }

    // The process object is a global object that is only available in Node.js, so if typeof process returns "object",
    // it means your code is running in a Node.js environment. If it returns "undefined", it means your code is running in a browser environment.
    if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node !== 'undefined') {
      environment = "nodeJS"
    } else {
      environment = "browser"
    }

    if (environment === "nodeJS") {
      const sdktoken = global.window.localstorage.getitem('sdktoken');
      if (this._istokenvalid(sdktoken)) {
        this.#token = sdktoken;
        return this.#token;
      }

      const dapptoken = global.window?.localstorage.getitem('jwttoken');
      if (this._istokenvalid(dapptoken)) {
        global.window.localstorage.setitem('sdktoken', dapptoken);
        this.#token = dapptoken;
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
      if (environment === "browser") {
        window.localStorage.setItem('sdkToken', token);
      }
      this.#token = token;
    } else {
      throw result?.data?.message;
    }
    return this.#token;
  }
}

export default Auth;
