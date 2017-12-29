const Shop = require('./src/shop');
const Item = require('./src/item');

const ShopDecorator = require('./src/shop-decorator');

const shop = new Shop([
  new Item('Shield', 2, 10),
  new Item('Aged Brie', 2, 10),
  new Item('Conjured Aged Brie', 2, 10),
  new Item('Sulfuras, Hand of Ragnaros', 2, 10),
  new Item('Backstage passes to a TAFKAL80ETC concert', 2, 10),
]);

const shopDecorator = new ShopDecorator(shop);

console.log('At Start');
shopDecorator.logInventory();

simulateDaysPassing(5, shop);

function simulateDaysPassing(numDays, shop) {
  [...Array(numDays)].forEach((_, idx) => {
    const dayNum = idx + 1;
    console.log(`After Day ${dayNum}`);
    shop.updateQuality();
    shopDecorator.logInventory();
  });
}