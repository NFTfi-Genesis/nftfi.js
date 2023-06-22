/**
 * @class
 * Class for working with Earn rewards.
 */
class RewardsEarn {
  allocations;
  points;

  constructor(options = {}) {
    this.allocations = options?.allocations;
    this.points = options?.points;
  }
}

export default RewardsEarn;
