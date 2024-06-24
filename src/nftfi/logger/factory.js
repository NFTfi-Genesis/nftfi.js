class LoggerFactory {
  #Logger;
  #console;
  #verbose;
  #json;

  constructor(options) {
    this.#Logger = options.Logger;
    this.#console = options.console;
    this.#json = options.json;
    this.#verbose = options.verbose ?? false;
  }

  create(options) {
    const logger = new this.#Logger({
      scope: options?.scope ?? 'SDK',
      id: options?.id,
      verbose: this.#verbose,
      console: this.#console,
      json: this.#json
    });
    return logger;
  }
}

export default LoggerFactory;
