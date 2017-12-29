class ShopDecorator {
  constructor(shop) {
    this.shop = shop;
  }

  logInventory() {
    this.shop.items.forEach(this.logItem);
  }

  logItem({ name, quality, sellIn }, idx) {
    console.log(`
      Item ${idx}:
      \tName: ${name}
      \tQuality: ${quality}
      \tSell In: ${sellIn}
    `);
  }
}

module.exports = ShopDecorator;