/**
 * @class
 * Class with helper methods.
 */
class Helper {
  #config;

  constructor(options = {}) {
    this.#config = options?.config;
  }

  addCurrencyUnit = object => {
    const currency = object?.terms?.loan?.currency || null;
    let unit = object?.terms?.loan?.unit || null;
    if ((currency && unit) || !currency) {
      return object;
    }

    const [ticker] = Object.keys(this.#config.erc20).filter(key => this.#config.erc20[key].address === currency);
    unit = this.#config.erc20[ticker]?.unit;

    return {
      ...object,
      terms: { ...object.terms, loan: { ...object.terms.loan, unit } }
    };
  };
}

export default Helper;
