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

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      if (!this.isSpecialItem(item)) {
        const decayer = new ItemDecayer(item);
        decayer.decay();
        return;
      } else if (item.name === 'Aged Brie') {
        const decayer = new AgedBrieDecayer(item);
        decayer.decay();
        return;
      }

      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }

    });

    return this.items;
  }

  isSpecialItem(item) {
    const SPECIAL_ITEMS = [
      'Aged Brie',
      'Backstage passes to a TAFKAL80ETC concert',
      'Sulfuras, Hand of Ragnaros',
    ];

    return SPECIAL_ITEMS.includes(item.name);
  }
}

module.exports = { Shop, Item };