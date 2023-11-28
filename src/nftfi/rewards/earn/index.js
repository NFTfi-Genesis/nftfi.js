class RewardsEarn {
  allocations;
  points;
  seasons;

  constructor(options = {}) {
    this.allocations = options?.allocations;
    this.points = options?.points;
    this.seasons = options?.seasons;
  }
}

export default RewardsEarn;
