const ItemDecayer = require('./item-decayer');

class AgedBrieDecayer extends ItemDecayer {
  getQualityDecayRate() {
    return 1;
  }
}

module.exports = AgedBrieDecayer;