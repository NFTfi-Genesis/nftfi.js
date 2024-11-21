class Error {
  constructor() {}

  handle(e, message, options) {
    if (message) return { error: message, raw: e, options, success: false };
    if (e?.errors) return { error: e?.errors, raw: e, options, success: false };
    if (e?.error?.reason) return { error: e?.error?.reason, raw: e, options, success: false };
    if (e?.response?.data?.message) return { error: e?.response?.data?.message, raw: e, options, success: false };
    if (e?.response?.data?.errors) return { error: e?.response?.data?.errors, raw: e, options, success: false };
    if (e?.error?.data?.originalError?.message)
      return { error: e?.error?.data?.originalError?.message, raw: e, options, success: false };
    if (e?.error?.data?.message) return { error: e.error.data.message, raw: e, options, success: false };
    if (e?.code) return { error: e.code, raw: e, options, success: false };
    if (e?.message) return { error: e.message, raw: e, options, success: false };
    return { error: e, raw: e, options, success: false };
  }
}

export default Error;
