import { SideDish } from './side-dish.entity';

describe('side dish', () => {
  describe('create', () => {
    it('should create side dish entity', () => {
      const sideDish = SideDish.create('Chicken wings', 8);

      expect(sideDish).toBeDefined();
      expect(sideDish.id).toBeUndefined();
      expect(sideDish.name).toEqual('Chicken wings');
      expect(sideDish.description).toBeNull();
      expect(sideDish.price).toEqual(8);
      expect(sideDish.createdAt).toBeInstanceOf(Date);
      expect(sideDish.lastModifiedAt).toBeInstanceOf(Date);
      expect(sideDish.lastModifiedAt).toEqual(sideDish.createdAt);
    });
  });
});
