class Contract {
  #account;
  #contract;

  constructor(options) {
    this.#account = options?.account;
    this.#contract = options?.contract;
  }

  _parseLogs(logs) {
    logs = logs || [];
    if (logs && logs.length > 0) {
      return logs
        .map(function (log) {
          try {
            const event = this.#contract.interface.parseLog(log);
            return {
              name: event.name,
              args: event.args,
              frag: event.eventFragment
            };
          } catch (e) {
            // Cant find suitable entry in contract ABI.
            return false;
          }
        }, this)
        .filter(function (log) {
          return log;
        });
    } else {
      return logs;
    }
  }

  async call(options) {
    let result;
    const isViewFn = this._isViewFn(options.function);
    if (isViewFn) {
      result = this.#contract[options.function](...options.args);
    } else {
      const tx = await this.#contract.populateTransaction[options.function](...options.args);
      const receipt = await this.#account.execTransaction(tx);
      const logs = this._parseLogs(receipt?.logs);
      result = { ...receipt, logs };
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
    return this.#contract.interface.fragments.filter(fragment => fn.startsWith(fragment.name))[0];
  }
}

export default Contract;
