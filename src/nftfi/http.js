class Http {
  #axios;

  constructor(options = {}) {
    this.#axios = options?.axios;
  }

  async get(uri, options = {}) {
    let result;
    try {
      result = await this.#axios.get(uri, options);
    } catch (e) {
      result = e.response;
    }
    return result;
  }

  async delete(uri, options = {}) {
    let result;
    try {
      result = await this.#axios.delete(uri, options);
    } catch (e) {
      result = e.response;
    }
    return result;
  }

  async post(uri, body, options = {}) {
    let result;
    try {
      result = await this.#axios.post(uri, body, options);
    } catch (e) {
      result = e.response;
    }
    return result;
  }
}

export default Http;
