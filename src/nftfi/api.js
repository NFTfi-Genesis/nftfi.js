class API {
  #config;
  #auth;
  #http;

  constructor(options = {}) {
    this.#config = options?.config;
    this.#auth = options?.auth;
    this.#http = options?.http;
  }

  async get(options) {
    const uri = this.concatUri(options.uri);
    const params = options?.params;
    const authToken = await this.#auth.getToken();
    const headers = {
      'X-API-Key': this.#config.api.key,
      Authorization: `Bearer ${authToken}`
    };
    const result = await this.#http.get(uri, {
      headers,
      params
    });
    return result.data;
  }

  async post(options) {
    const uri = this.concatUri(options.uri);
    const authToken = await this.#auth.getToken();
    const headers = {
      'X-API-Key': this.#config.api.key,
      Authorization: `Bearer ${authToken}`
    };
    const result = await this.#http.post(uri, options.payload, {
      headers
    });
    return result.data;
  }

  async delete(options) {
    const uri = this.concatUri(options.uri);
    const authToken = await this.#auth.getToken();
    const headers = {
      'X-API-Key': this.#config.api.key,
      Authorization: `Bearer ${authToken}`
    };
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
