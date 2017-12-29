class ItemDecayer {
  constructor(item) {
    this.item = item;
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
    return Math.min(50, Math.max(0, quality));
  }
}

module.exports = ItemDecayer;