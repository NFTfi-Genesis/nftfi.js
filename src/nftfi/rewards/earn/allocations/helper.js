class AllocationsHelper {
  _addSeason(options, params) {
    if (options?.season?.id) {
      params.seasonId = options.season.id;
    }
    return params;
  }

  getParams(options) {
    let params = {};
    params = this._addSeason(options, params);
    return params;
  }
}

export default AllocationsHelper;
