import { sleep } from '@infrastructure/sleep/sleep';
import { Pizza } from './pizza.entity';

describe('product entity', () => {
  describe('create pizza', () => {
    it('should create pizza entity', () => {
      const pizza = Pizza.create('Margherita', 5);

      expect(pizza).toBeDefined();
      expect(pizza.id).toBeUndefined();
      expect(pizza.name).toEqual('Margherita');
      expect(pizza.description).toBeNull();
      expect(pizza.price).toEqual(5);
      expect(pizza.createdAt).toBeInstanceOf(Date);
      expect(pizza.lastModifiedAt).toBeInstanceOf(Date);
      expect(pizza.lastModifiedAt).toEqual(pizza.createdAt);
    });

    it('should throw error when name is empty', () => {
      expect(() => Pizza.create('', 5)).toThrow('Name of product is required');
      expect(() => Pizza.create(' ', 5)).toThrow('Name of product is required');
      expect(() => Pizza.create(<any>null, 5)).toThrow(
        'Name of product is required',
      );
      expect(() => Pizza.create(<any>undefined, 5)).toThrow(
        'Name of product is required',
      );
    });

    it('should throw error when price is not specified', () => {
      expect(() => Pizza.create('Margherita', <any>null)).toThrow(
        'Price of product is required',
      );
      expect(() => Pizza.create('Margherita', <any>undefined)).toThrow(
        'Price of product is required',
      );
    });

    it('should trim name', () => {
      const pizza = Pizza.create(' Margherita ', 5);

      expect(pizza.name).toEqual('Margherita');
    });
  });

  describe('set name', () => {
    it('should update name', async () => {
      const pizza = Pizza.create('Margherita', 5);

      await sleep(2);

      pizza.name = 'Hawaii';

      expect(pizza.name).toEqual('Hawaii');
      expect(pizza.lastModifiedAt.getTime()).toBeGreaterThan(
        pizza.createdAt.getTime(),
      );
    });

    it('should throw error when name is empty', () => {
      const pizza = Pizza.create('Margherita', 5);

      expect(() => (pizza.name = '')).toThrow('Name of product is required');
      expect(() => (pizza.name = ' ')).toThrow('Name of product is required');
      expect(() => (pizza.name = <any>null)).toThrow(
        'Name of product is required',
      );
      expect(() => (pizza.name = <any>undefined)).toThrow(
        'Name of product is required',
      );
    });

    it('should trim name', async () => {
      const pizza = Pizza.create('Margherita', 5);

      pizza.name = ' Hawaii ';

      expect(pizza.name).toEqual('Hawaii');
    });

    it('should not update name when same value', async () => {
      const pizza = Pizza.create('Margherita', 5);

      await sleep(2);

      pizza.name = 'Margherita';

      expect(pizza.name).toEqual('Margherita');
      expect(pizza.lastModifiedAt).toEqual(pizza.createdAt);
    });
  });

  describe('set description', () => {
    it('should update description', async () => {
      const pizza = Pizza.create('Margherita', 5);

      await sleep(2);

      pizza.description = 'Pizza with tomatoes and cheese';

      expect(pizza.description).toEqual('Pizza with tomatoes and cheese');
      expect(pizza.lastModifiedAt.getTime()).toBeGreaterThan(
        pizza.createdAt.getTime(),
      );
    });

    it('should trim description', () => {
      const pizza = Pizza.create('Margherita', 5);

      pizza.description = ' Pizza with tomatoes and cheese ';

      expect(pizza.description).toEqual('Pizza with tomatoes and cheese');
    });

    it('should not trim description when null', () => {
      const pizza = Pizza.create('Margherita', 5);

      pizza.description = <any>null;

      expect(pizza.description).toBeNull();
    });

    it('should not update description when same value', async () => {
      const pizza = Pizza.create('Margherita', 5);

      pizza.description = 'Pizza with tomatoes and cheese';

      await sleep(2);

      pizza.description = 'Pizza with tomatoes and cheese';

      expect(pizza.lastModifiedAt).toEqual(pizza.createdAt);
    });
  });

  describe('set price', () => {
    it('should update price', async () => {
      const pizza = Pizza.create('Margherita', 5);

      await sleep(2);

      pizza.price = 10;

      expect(pizza.price).toEqual(10);
      expect(pizza.lastModifiedAt.getTime()).toBeGreaterThan(
        pizza.createdAt.getTime(),
      );
    });

    it('should throw error when price is not specified', () => {
      const pizza = Pizza.create('Margherita', 5);

      expect(() => (pizza.price = <any>null)).toThrow(
        'Price of product is required',
      );
      expect(() => (pizza.price = <any>undefined)).toThrow(
        'Price of product is required',
      );
    });

    it('should throw error when price is lesser than zero', () => {
      const pizza = Pizza.create('Margherita', 5);

      expect(() => (pizza.price = -1)).toThrow(
        'Price of product must be greater than or equal to zero',
      );
    });

    it('should not update price when same value', async () => {
      const pizza = Pizza.create('Margherita', 5);

      await sleep(2);

      pizza.price = 5;

      expect(pizza.price).toEqual(5);
      expect(pizza.lastModifiedAt).toEqual(pizza.createdAt);
    });
  });
});
