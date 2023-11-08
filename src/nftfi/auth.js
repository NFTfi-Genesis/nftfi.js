class Auth {
  #http;
  #account;
  #config;
  #utils;
  #token;
  #storage;

  constructor(options = {}) {
    this.#http = options?.http;
    this.#account = options?.account;
    this.#config = options?.config;
    this.#utils = options?.utils;
    this.#storage = options?.storage;
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

    const sdkToken = this.#storage.get(this.#config.auth.token.key);
    if (this._isTokenValid(sdkToken)) {
      this.#token = sdkToken;
      return this.#token;
    }

    const sdkRefreshToken = this.#storage.get(this.#config.auth.refreshToken.key);
    if (sdkRefreshToken) {
      const uri = `${this.#config.api.baseURI}/v0.1/authorization/refresh-token`;
      const headers = {
        'X-API-Key': this.#config.api.key
      };
      const result = await this.#http.post(uri, { refreshToken: sdkRefreshToken }, { headers });
      const token = result?.data?.result?.token;
      const refreshToken = result?.data?.result?.refreshToken;
      if (this._isTokenValid(token)) {
        this.#storage.set(this.#config.auth.token.key, token);
        this.#storage.set(this.#config.auth.refreshToken.key, refreshToken);
        this.#token = sdkToken;
        return this.#token;
      }
    }

    try {
      if (this.#account.getSigner()) {
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
        const uri = `${this.#config.api.baseURI}/v0.1/authorization/token`;
        const headers = {
          'X-API-Key': this.#config.api.key
        };
        const result = await this.#http.post(uri, body, { headers });
        const token = result?.data?.result?.token;
        const refreshToken = result?.data?.result?.refreshToken;
        if (token && refreshToken) {
          this.#storage.set(this.#config.auth.token.key, token);
          this.#storage.set(this.#config.auth.refreshToken.key, refreshToken);
          this.#token = token;
        }
      }
    } catch (e) {
      const error = { error: e, date: new Date() };
      this.#storage.set(this.#config.auth.tokenError.key, JSON.stringify(error));
      return this.#token;
    }
    return this.#token;
  }
}

export default Auth;
