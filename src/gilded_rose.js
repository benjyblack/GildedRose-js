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
    const qualityPointsReduced = this.item.sellIn <= 0 ? 2 : 1;
    const newQuality = this.item.quality - qualityPointsReduced;

    this.item.quality = Math.max(0, newQuality);
  }

  adjustSellIn() {
    this.item.sellIn -= 1;
  }
}

class AgedBrieDecayer extends ItemDecayer {
  adjustQuality() {
    const qualityPointsIncreased = this.item.sellIn <= 0 ? 2 : 1;
    const newQuality = this.item.quality + qualityPointsIncreased;

    this.item.quality = Math.min(50, newQuality);
  }
}

class ConjuredDecayer extends ItemDecayer {
  adjustQuality() {
    const qualityPointsIncreased = this.item.sellIn <= 0 ? 4 : 2;
    const newQuality = this.item.quality - qualityPointsIncreased;

    this.item.quality = Math.max(0, newQuality);
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

    let qualityPointsIncreased;

    if (this.item.sellIn <= 5) {
      qualityPointsIncreased = 3;
    } else if (this.item.sellIn <= 10) {
      qualityPointsIncreased = 2;
    } else {
      qualityPointsIncreased = 1;
    }

    const newQuality = this.item.quality + qualityPointsIncreased;

    this.item.quality = Math.min(50, newQuality);
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