import { Beverage } from './beverage.entity';

describe('beverage entity', () => {
  describe('create', () => {
    it('should create beverage entity', () => {
      const beverage = Beverage.create('Coco Cola', 2);

      expect(beverage).toBeDefined();
      expect(beverage.id).toBeUndefined();
      expect(beverage.name).toEqual('Coco Cola');
      expect(beverage.description).toBeNull();
      expect(beverage.price).toEqual(2);
      expect(beverage.createdAt).toBeInstanceOf(Date);
      expect(beverage.lastModifiedAt).toBeInstanceOf(Date);
      expect(beverage.lastModifiedAt).toEqual(beverage.createdAt);
    });
  });
});
