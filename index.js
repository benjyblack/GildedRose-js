const Shop = require('./src/shop');
const Item = require('./src/item');

const ShopDecorator = require('./src/shop-decorator');
const ShopSimulator = require('./src/shop-simulator');

const shop = new Shop([
  new Item('Shield', 2, 10),
  new Item('Aged Brie', 2, 10),
  new Item('Conjured Aged Brie', 2, 10),
  new Item('Sulfuras, Hand of Ragnaros', 2, 10),
  new Item('Backstage passes to a TAFKAL80ETC concert', 2, 10),
]);

const shopDecorator = new ShopDecorator(shop);
const shopSimulator = new ShopSimulator(shop, shopDecorator);

shopSimulator.simulateDaysPassing(5);
