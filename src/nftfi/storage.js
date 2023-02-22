class Storage {
  #storage;

  constructor(options = {}) {
    this.#storage = options?.storage;
  }

  set(key, value) {
    this.#storage && this.#storage.setItem(key, value);
  }

  get(key) {
    return this.#storage ? this.#storage.getItem(key) : null;
  }
}

export default Storage;
