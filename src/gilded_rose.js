class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
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
    const newQuality = this.item.quality + this.getQualityChange();
    this.item.quality = this.clampQuality(newQuality);
  }

  adjustSellIn() {
    this.item.sellIn += this.getSellInChange();
  }

  getQualityChange() {
    return this.item.sellIn <= 0 ? -2 : -1;
  }

  getSellInChange() {
    return -1;
  }

  clampQuality(quality) {
    return Math.min(50, Math.max(0, quality));
  }
}

class AgedBrieDecayer extends ItemDecayer {
  getQualityChange() {
    return this.item.sellIn <= 0 ? 2 : 1;
  }
}

class ConjuredDecayer extends ItemDecayer {
  getQualityChange() {
    return this.item.sellIn <= 0 ? -4 : -2;
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
    if (this.item.sellIn <= 0) {
      this.item.quality = 0;
      return;
    }

    super.adjustQuality();
  }

  getQualityChange() {
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
    this.items.forEach(item => this.updateItemQuality(item));
    return this.items;
  }

  updateItemQuality(item) {
    let decayer;

    if (item.name === 'Aged Brie') {
      decayer = new AgedBrieDecayer(item);
    } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
      decayer = new SulfurasDecayer(item);
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      decayer = new BackstagePassDecayer(item);
    } else if (item.name === 'Conjured') {
      decayer = new ConjuredDecayer(item)
    } else {
      decayer = new ItemDecayer(item);
    }

    decayer.decay();
  }
}

module.exports = { Shop, Item };