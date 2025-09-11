class API {
  #config;
  #auth;
  #http;
  #assertion;
  #mutex;

  constructor(options = {}) {
    this.#config = options?.config;
    this.#auth = options?.auth;
    this.#http = options?.http;
    this.#assertion = options?.assertion;
    this.#mutex = options?.mutex;
  }

  async getAuthHeader(options) {
    let release = () => {};
    let headers = {
      'X-API-Key': this.#config.api.key
    };

    if (options?.auth?.token === 'required' || options?.auth?.token === 'optional' || options?.auth?.token === 'ifpresent') {
      try {
        if (options.auth.token === 'required') {
          this.#assertion.hasSigner();
        }
        release = await this.#mutex.acquire();
        const authToken = await this.#auth.getToken({noSigning: options?.auth?.token === 'ifpresent'});
        if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
      } finally {
        release();
      }
    }

    return headers;
  }

  async get(options, httpOptions = {}) {
    const uri = this.concatUri(options.uri);
    const params = options?.params;
    const headers = await this.getAuthHeader(options);
    let opts = { params };
    if (headers) opts = { headers, params };

    const result = await this.#http.get(uri, opts, httpOptions);
    return result.data;
  }

  async post(options) {
    const uri = this.concatUri(options.uri);
    const headers = await this.getAuthHeader(options);
    const result = await this.#http.post(uri, options.payload, {
      headers
    });
    return result.data;
  }

  async delete(options) {
    const uri = this.concatUri(options.uri);
    const headers = await this.getAuthHeader(options);
    const result = await this.#http.delete(uri, {
      headers
    });
    return result.data;
  }

  concatUri(path) {
    const url = new URL(path, this.#config.api.baseURI);
    return url.href;
  }
}

export default API;
