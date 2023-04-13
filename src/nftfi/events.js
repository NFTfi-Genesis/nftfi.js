export default class Events {
  #websocket;

  constructor(options) {
    this.#websocket = options.websocket;
  }

  /* eslint-disable no-unused-vars */
  subscribe(options = {}, callbacks = {}) {
    // Handle errors
    this.#websocket.client.on('error', error => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    });
    // Handle messages
    this.#websocket.client.on('message', message => {
      if (callbacks?.onMessage) {
        callbacks.onMessage(message);
      }
    });
    // Handle events
    this.#websocket.client.on('event', event => {
      if (callbacks?.onEvent) {
        const e = JSON.parse(event);
        callbacks.onEvent(e);
      }
    });
  }
}
