export default class Websocket {
  #client;
  #io;
  #config;

  constructor(options) {
    this.#config = options.config;
    this.#io = options.io;
    this.#client = null;
  }

  get client() {
    if (!this.#client) {
      this.#client = this.#io(this.#config.websocket.baseURI, {
        path: '/websocket',
        origins: '*',
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttemps: 10,
        transports: ['websocket'],
        agent: false,
        upgrade: true,
        rejectUnauthorized: false,
        extraHeaders: {
          'x-api-key': this.#config.api.key
        }
      });
    }
    return this.#client;
  }
}
