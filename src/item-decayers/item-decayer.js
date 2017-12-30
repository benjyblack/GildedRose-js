const MathExtensions = require('../lib/math-extensions');

class ItemDecayer {
  constructor(item) {
    this.item = item;

    this.QUALITY_UPPER_BOUND = 50;
    this.QUALITY_LOWER_BOUND = 0;
  }

  decay() {
    this.adjustQuality();
    this.adjustSellIn();
  }

  adjustQuality() {
    let qualityChange = this.getQualityDecayRate();

    if (this.isPastSellDate()) {
      qualityChange *= 2;
    }

    if (this.isConjured()) {
      qualityChange *= 2;
    }

    const newQuality = this.item.quality + qualityChange;
    this.item.quality = this.clampQuality(newQuality);
  }

  adjustSellIn() {
    this.item.sellIn += this.getSellInDecayRate();
  }

  getQualityDecayRate() {
    return -1;
  }

  getSellInDecayRate() {
    return -1;
  }

  isConjured() {
    return this.item.name.includes('Conjured');
  }

  isPastSellDate() {
    return this.item.sellIn <= 0;
  }

  clampQuality(quality) {
    return MathExtensions.clamp(
      this.QUALITY_LOWER_BOUND,
      this.QUALITY_UPPER_BOUND,
      quality
    );
  }
}

module.exports = ItemDecayer;