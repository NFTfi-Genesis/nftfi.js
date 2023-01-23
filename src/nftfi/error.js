class Error {
  constructor() {}

  handle(e, message) {
    if (message) return { error: message };
    if (e?.error?.reason) return { error: e?.error?.reason };
    if (e?.response?.data?.message) return { error: e?.response?.data?.message };
    if (e?.response?.data?.errors) return { error: e?.response?.data?.errors };
    if (e?.error?.data?.originalError?.message) return { error: e?.error?.data?.originalError?.message };
    if (e?.error?.data?.message) return { error: e.error.data.message };
    if (e?.code) return { error: e.code };
    if (e?.message) return { error: e.message };
    return { error: e };
  }
}

export default Error;
