class LoansValidationRefinance {
  #yup;

  constructor(options = {}) {
    this.#yup = options?.yup;
  }

  async validateCurrencies(options) {
    try {
      const loanCurrency = options?.loan?.terms?.loan?.currency?.toLowerCase();
      const optionsSchema = this.#yup.object({
        loan: this.#yup.object({
          terms: this.#yup.object({
            loan: this.#yup.object({
              currency: this.#yup.string().required()
            })
          })
        }),
        offer: this.#yup.object({
          terms: this.#yup.object({
            loan: this.#yup.object({
              currency: this.#yup
                .string()
                .required()
                .transform(value => {
                  return value.toLowerCase();
                })
                .oneOf([loanCurrency], 'offer currency should match loan currency')
            })
          })
        })
      });
      await optionsSchema.validate(options, { abortEarly: true });
    } catch (e) {
      throw {
        [e.path]: e.errors
      };
    }
  }
}

export default LoansValidationRefinance;
