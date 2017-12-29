const ItemDecayerFactory = require('./item-decayer-factory');

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

module.exports = Shop;