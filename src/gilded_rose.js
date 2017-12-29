class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class ItemDecayerFactory {
  static createItemDecayer(item) {
    if (item.name.includes('Aged Brie')) {
      return new AgedBrieDecayer(item);
    } else if (item.name.includes('Sulfuras, Hand of Ragnaros')) {
      return new SulfurasDecayer(item);
    } else if (item.name.includes('Backstage passes to a TAFKAL80ETC concert')) {
      return new BackstagePassDecayer(item);
    } else {
      return new ItemDecayer(item);
    }
  }
}

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

class AgedBrieDecayer extends ItemDecayer {
  getQualityDecayRate() {
    return 1;
  }
}

class SulfurasDecayer extends ItemDecayer {
  adjustQuality() {
  }

  adjustSellIn() {
  }
}

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

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items
      .map(ItemDecayerFactory.createItemDecayer)
      .forEach(decayer => decayer.decay());

    return this.items;
  }
}

module.exports = { Shop, Item };