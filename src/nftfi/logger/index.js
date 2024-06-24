class Logger {
  #verbose;
  #scope;
  #id;
  #console;
  #json;

  constructor(options = {}) {
    this.#verbose = options?.verbose;
    this.#scope = options?.scope;
    this.#id = options?.id;
    this.#console = options.console;
    this.#json = options?.json;
  }

  _stringifyMessages(messages) {
    return messages.map(message => {
      if (typeof message === 'object') {
        return this.#json.stringify(message);
      }
      return message;
    });
  }

  info(...messages) {
    if (this.#verbose) {
      this.#console.info(`[${this.#scope}${this.#id ? ` - ${this.#id}` : ''}]`, ...this._stringifyMessages(messages));
    }
  }

  error(...messages) {
    if (this.#verbose) {
      this.#console.error(`[${this.#scope}${this.#id ? ` - ${this.#id}` : ''}]`, ...this._stringifyMessages(messages));
    }
  }
}

export default Logger;
