class Contract {
  #account;
  #contract;

  constructor(options) {
    this.#account = options?.account;
    this.#contract = options?.contract;
  }

  async call(options) {
    let result;
    const isViewFn = this._isViewFn(options.function);
    if (isViewFn) {
      result = this.#contract[options.function](...options.args);
    } else {
      const tx = await this.#contract.populateTransaction[options.function](...options.args);
      result = this.#account.execTransaction(tx);
    }
    return result;
  }

  async events(options) {
    let events = [];
    try {
      const filter = this.#contract.filters[options.type](...options.args);
      events = await this.#contract.queryFilter(filter);
      events = !options?.pagination
        ? events
        : this._paginate(events, options?.pagination?.page, options?.pagination?.limit);
    } catch (e) {
      // Do nothing for now
    }
    return events;
  }

  _paginate(rows, page, limit) {
    return rows.slice((page - 1) * limit, page * limit);
  }

  _isViewFn(fn) {
    try {
      const fragment = this._getFnFragment(fn);
      const stateMutability = fragment.stateMutability;
      return stateMutability === 'view';
    } catch (e) {
      throw `${fn} is not a function`;
    }
  }

  _getFnFragment(fn) {
    return this.#contract.interface.fragments.filter(fragment => fragment.name === fn)[0];
  }
}

export default Contract;
