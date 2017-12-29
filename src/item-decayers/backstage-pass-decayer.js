const ItemDecayer = require('./item-decayer');

class BackstagePassDecayer extends ItemDecayer {
  adjustQuality() {
    if (this.isPastSellDate()) {
      this.item.quality = 0;
      return;
    }

    super.adjustQuality();
  }

  getQualityDecayRate() {
    if (this.item.sellIn <= 5) {
      return 3;
    } else if (this.item.sellIn <= 10) {
      return 2;
    } else {
      return 1;
    }
  }
}

module.exports = BackstagePassDecayer;