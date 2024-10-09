class Http {
  #config;
  #axios;
  #loggerFactory;

  constructor(options = {}) {
    this.#config = options?.config;
    this.#axios = options?.axios;
    this.#loggerFactory = options?.loggerFactory;
  }

  _addHeaders(options) {
    options = {
      ...options,
      headers: {
        ...options?.headers,
        'X-SDK-Version': this.#config.version
      }
    };
    return options;
  }

  async get(uri, options = {}, execOptions = {}) {
    const logger = this.#loggerFactory.create({ scope: 'HTTP_REQ', id: Date.now() });
    let result;
    try {
      options = this._addHeaders(options);
      result = await this.#axios.get(uri, options);
      logger.info('HTTP GET request successful: ', uri, options, result);
    } catch (e) {
      logger.error('HTTP GET request failed: ', uri, options, e);
      if (execOptions.error?.rethrow) {
        throw e;
      }
      result = e.response;
    }
    return result;
  }

  async delete(uri, options = {}) {
    const logger = this.#loggerFactory.create({ scope: 'HTTP_REQ', id: Date.now() });
    let result;
    try {
      options = this._addHeaders(options);
      result = await this.#axios.delete(uri, options);
      logger.info('HTTP DELETE request successful: ', uri, options, result);
    } catch (e) {
      logger.error('HTTP DELETE request failed: ', uri, options, e);
      result = e.response;
    }
    return result;
  }

  async post(uri, body, options = {}) {
    const logger = this.#loggerFactory.create({ scope: 'HTTP_REQ', id: Date.now() });
    let result;
    try {
      options = this._addHeaders(options);
      result = await this.#axios.post(uri, body, options);
      logger.info('HTTP POST request successful: ', uri, options, result);
    } catch (e) {
      logger.error('HTTP POST request failed: ', uri, options, e);
      result = e.response;
    }
    return result;
  }
}

export default Http;
