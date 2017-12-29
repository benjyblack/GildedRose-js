const Shop = require('../src/shop');
const Item = require('../src/item');

describe('Shop', () => {
  let shop;

  function createShop({ name, sellIn = 10, quality = 10 }) {
    return new Shop([ new Item(name, sellIn, quality) ]);
  }

  function getItem() {
    return shop.items[0];
  }

  beforeEach(() => {
    shop = createShop({ name: 'foo', quality: 1, sellIn: 0 });
  });

  it('reduces sellIn by 1 each day', () => {
    const previousSellIn = getItem().sellIn;
    shop.updateQuality();
    expect(getItem().sellIn).toEqual(previousSellIn - 1);
  });

  it('reduces quality by 1 each day', () => {
    const previousQuality = getItem().quality;
    shop.updateQuality();
    expect(getItem().quality).toEqual(previousQuality - 1);
  });

  assertQualityChangesTwiceAsFastWhenConjured({ name: 'foo' });

  describe('when quality is 0', () => {
    beforeEach(() => {
      shop = createShop({ name: 'foo', quality: 0 });
    });

    it('does not reduce quality below 0', () => {
      shop.updateQuality();
      expect(getItem().quality).toEqual(0);
    });
  });

  describe('when sellIn date has passed', () => {
    beforeEach(() => {
      shop = createShop({ name: 'foo', quality: 2, sellIn: 0 });
    });

    it('reduces quality by 2 each day', () => {
      const previousQuality = getItem().quality;
      shop.updateQuality();
      expect(getItem().quality).toEqual(previousQuality - 2);
    });
  });

  describe('Aged Brie', () => {
    const name = 'Aged Brie';

    beforeEach(() => {
      shop = createShop({ name, quality: 1, sellIn: 1 });
    });

    it('increases in quality by 1 each day', () => {
      const previousQuality = getItem().quality;
      shop.updateQuality();
      expect(getItem().quality).toEqual(previousQuality + 1);
    });

    describe('when sellIn date has passed', () => {
      const sellIn = 0;

      beforeEach(() => {
        shop = createShop({ name, quality: 1, sellIn });
      });

      it('increases in quality by 2 each day', () => {
        const previousQuality = getItem().quality;
        shop.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 2);
      });

      assertQualityChangesTwiceAsFastWhenConjured({ name, sellIn });
    });

    assertQualityChangesTwiceAsFastWhenConjured({ name });
    assertQualityDoesNotIncreasePast50({ name });
  });

  describe('backstage passes', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';

    describe('when there are more than 10 days left', () => {
      const sellIn = 11;

      beforeEach(() => {
        shop = createShop({ name, sellIn });
      });

      it('increases in quality by 1 each day', () => {
        const previousQuality = getItem().quality;
        shop.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 1);
      });

      assertQualityChangesTwiceAsFastWhenConjured({ name, sellIn });
    });

    describe('when there are 10 or fewer days left', () => {
      const sellIn = 10;

      beforeEach(() => {
        shop = createShop({ name, sellIn });
      });

      it('increases in quality by 2 each day', () => {
        const previousQuality = getItem().quality;
        shop.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 2);
      });

      assertQualityChangesTwiceAsFastWhenConjured({ name, sellIn });
    });

    describe('when there are 5 or fewer days left', () => {
      const sellIn = 5;

      beforeEach(() => {
        shop = createShop({ name, sellIn });
      });

      it('increases in quality by 3 each day', () => {
        const previousQuality = getItem().quality;
        shop.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 3);
      });

      assertQualityChangesTwiceAsFastWhenConjured({ name, sellIn });
    });

    describe('when there are 0 or fewer days left', () => {
      const sellIn = 0;

      beforeEach(() => {
        shop = createShop({ name, sellIn });
      });

      it('has 0 quality', () => {
        shop.updateQuality();
        expect(getItem().quality).toEqual(0);
      });
    });

    assertQualityDoesNotIncreasePast50({ name });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    beforeEach(() => {
      shop = createShop({ name: 'Sulfuras, Hand of Ragnaros', quality: 80, sellIn: 10 });
    });

    it('does not decrease in quality', () => {
      const previousQuality = getItem().quality;
      shop.updateQuality();
      expect(getItem().quality).toEqual(previousQuality);
    });

    it('does not reduce sellIn date', () => {
      const previousSellIn = getItem().sellIn;
      shop.updateQuality();
      expect(getItem().sellIn).toEqual(previousSellIn);
    });
  });

  // shared examples
  function assertQualityDoesNotIncreasePast50({ name }) {
    describe('when quality is at 50', () => {
      beforeEach(() => {
        shop = createShop({ name, quality: 50, sellIn: 10 });
      });

      it('does not increase past 50', () => {
        shop.updateQuality();
        expect(getItem().quality).toEqual(50);
      });
    });
  }

  function assertQualityChangesTwiceAsFastWhenConjured({ name, quality = 10, sellIn = 10 }) {
    const originalQuality = quality;

    describe('when conjured', () => {
      beforeEach(() => {
        shop = new Shop([
          new Item(name, sellIn, quality),
          new Item(`Conjured ${name}`, sellIn, quality),
        ]);
      });

      function getConjuredItem() {
        return shop.items[1];
      }

      it('degrades twice as fast', () => {
        shop.updateQuality();
        const regularDifferenceInQuality = originalQuality - getItem().quality;
        const conjuredDifferenceInQuality = originalQuality - getConjuredItem().quality;
        expect(conjuredDifferenceInQuality).toEqual(2 * regularDifferenceInQuality);
      });
    });
  }
});
