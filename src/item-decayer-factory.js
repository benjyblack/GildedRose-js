const ItemDecayer = require('./item-decayers/item-decayer');
const AgedBrieDecayer = require('./item-decayers/aged-brie-decayer');
const SulfurasDecayer = require('./item-decayers/sulfuras-decayer');
const BackstagePassDecayer = require('./item-decayers/backstage-pass-decayer');

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

module.exports = ItemDecayerFactory;