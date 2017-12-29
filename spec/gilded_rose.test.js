const { Shop, Item } = require('../src/gilded_rose');

describe('Gilded Rose', () => {
  let gildedRose;

  function createShop({ name, sellIn = 0, quality = 0 }) {
    return new Shop([ new Item(name, sellIn, quality) ]);
  }

  function getItem() {
    return gildedRose.items[0];
  }

  beforeEach(() => {
    gildedRose = createShop({ name: 'foo', quality: 1, sellIn: 0 });
  });

  it('reduces sellIn by 1 each day', () => {
    const previousSellIn = getItem().sellIn;
    gildedRose.updateQuality();
    expect(getItem().sellIn).toEqual(previousSellIn - 1);
  });

  it('reduces quality by 1 each day', () => {
    const previousQuality = getItem().quality;
    gildedRose.updateQuality();
    expect(getItem().quality).toEqual(previousQuality - 1);
  });

  describe('when quality is 0', () => {
    beforeEach(() => {
      gildedRose = createShop({ name: 'foo', quality: 0 });
    });

    it('does not reduce quality below 0', () => {
      gildedRose.updateQuality();
      expect(getItem().quality).toEqual(0);
    });
  });

  describe('when sellIn date has passed', () => {
    beforeEach(() => {
      gildedRose = createShop({ name: 'foo', quality: 2, sellIn: 0 });
    });

    it('reduces quality by 2 each day', () => {
      const previousQuality = getItem().quality;
      gildedRose.updateQuality();
      expect(getItem().quality).toEqual(previousQuality - 2);
    });
  });

  describe('Aged Brie', () => {
    beforeEach(() => {
      gildedRose = createShop({ name: 'Aged Brie', quality: 1, sellIn: 1 });
    });

    it('increases in quality by 1 each day', () => {
      const previousQuality = getItem().quality;
      gildedRose.updateQuality();
      expect(getItem().quality).toEqual(previousQuality + 1);
    });

    describe('when sellIn date has passed', () => {
      beforeEach(() => {
        gildedRose = createShop({ name: 'Aged Brie', quality: 1, sellIn: 0 });
      });

      it('increases in quality by 2 each day', () => {
        const previousQuality = getItem().quality;
        gildedRose.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 2);
      });
    });

    assertQualityDoesNotIncreasePast50({ name: 'Aged Brie' });
  });

  describe('backstage passes', () => {
    function createShopWithBackstagePass({ sellIn }) {
      return createShop({
        name: 'Backstage passes to a TAFKAL80ETC concert',
        quality: 10,
        sellIn,
      });
    }

    describe('when there are more than 10 days left', () => {
      beforeEach(() => {
        gildedRose = createShopWithBackstagePass({ sellIn: 11 });
      });

      it('increases in quality by 1 each day', () => {
        const previousQuality = getItem().quality;
        gildedRose.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 1);
      });
    });

    describe('when there are 10 or fewer days left', () => {
      beforeEach(() => {
        gildedRose = createShopWithBackstagePass({ sellIn: 10 });
      });

      it('increases in quality by 2 each day', () => {
        const previousQuality = getItem().quality;
        gildedRose.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 2);
      });
    });

    describe('when there are 5 or fewer days left', () => {
      beforeEach(() => {
        gildedRose = createShopWithBackstagePass({ sellIn: 5 });
      });

      it('increases in quality by 3 each day', () => {
        const previousQuality = getItem().quality;
        gildedRose.updateQuality();
        expect(getItem().quality).toEqual(previousQuality + 3);
      });
    });

    describe('when there are 0 or fewer days left', () => {
      beforeEach(() => {
        gildedRose = createShopWithBackstagePass({ sellIn: 0 });
      });

      it('has 0 quality', () => {
        gildedRose.updateQuality();
        expect(getItem().quality).toEqual(0);
      });
    });

    assertQualityDoesNotIncreasePast50({ name: 'Backstage passes to a TAFKAL80ETC concert' });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    beforeEach(() => {
      gildedRose = createShop({ name: 'Sulfuras, Hand of Ragnaros', quality: 80, sellIn: 10 });
    });

    it('does not decrease in quality', () => {
      const previousQuality = getItem().quality;
      gildedRose.updateQuality();
      expect(getItem().quality).toEqual(previousQuality);
    });

    it('does not reduce sellIn date', () => {
      const previousSellIn = getItem().sellIn;
      gildedRose.updateQuality();
      expect(getItem().sellIn).toEqual(previousSellIn);
    });
  });

  describe('conjured items', () => {
    beforeEach(() => {
      gildedRose = createShop({ name: 'Conjured Foo', quality: 4, sellIn: 3 });
    });

    it('decreases in quality by 2 every day', () => {
      const previousQuality = getItem().quality;
      gildedRose.updateQuality();
      expect(getItem().quality).toEqual(previousQuality - 2);
    });

    describe('when sellIn date has passed', () => {
      beforeEach(() => {
        gildedRose = createShop({ name: 'Conjured', quality: 4, sellIn: 0 });
      });

      it('decreases in quality by 4 each day', () => {
        const previousQuality = getItem().quality;
        gildedRose.updateQuality();
        expect(getItem().quality).toEqual(previousQuality - 4);
      });
    });
  });

  // shared examples
  function assertQualityDoesNotIncreasePast50({ name }) {
    describe('when quality is at 50', () => {
      beforeEach(() => {
        gildedRose = createShop({ name, quality: 50, sellIn: 10 });
      });

      it('does not increase past 50', () => {
        gildedRose.updateQuality();
        expect(getItem().quality).toEqual(50);
      });
    });
  }
});
