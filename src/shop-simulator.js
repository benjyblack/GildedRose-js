class ShopSimulator {
  constructor(shop, shopDecorator) {
    this.shop = shop;
    this.shopDecorator = shopDecorator;
  }

  simulateDaysPassing(numDays) {
    console.log('On Day 1');
    this.shopDecorator.logInventory();

    [...Array(numDays)].forEach((_, idx) => {
      const dayNum = idx + 1;
      this.simulateDayPassing(dayNum)
    });
  }

  simulateDayPassing(dayNum) {
    console.log(`After Day ${dayNum}`);

    this.shop.updateQuality();
    this.shopDecorator.logInventory();
  }
}

module.exports = ShopSimulator;