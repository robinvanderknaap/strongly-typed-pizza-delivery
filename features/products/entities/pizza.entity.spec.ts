import { sleep } from '@infrastructure/sleep/sleep';
import { Pizza } from './pizza.entity';
import { Topping } from '../constants/toppings.enum';

describe('pizza entity', () => {
  describe('create', () => {
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
  });

  describe('add topping', () => {
    it('should succeed', async () => {
      const pizza = Pizza.create('Margherita', 5);

      await sleep(2);

      pizza.addToppings(Topping.Anchovies, Topping.Bacon);

      expect(pizza.toppings.length).toEqual(2);
      expect(pizza.toppings).toContain(Topping.Anchovies);
      expect(pizza.toppings).toContain(Topping.Bacon);
      expect(pizza.lastModifiedAt.getTime()).toBeGreaterThan(
        pizza.createdAt.getTime(),
      );
    });
  });

  describe('remove topping', () => {
    it('should succeed', async () => {
      const pizza = Pizza.create('Margherita', 5);

      await sleep(2);

      pizza.addToppings(Topping.Anchovies, Topping.Bacon);

      pizza.removeTopping(Topping.Anchovies);

      expect(pizza.toppings.length).toEqual(1);
      expect(pizza.toppings).toContain(Topping.Bacon);
      expect(pizza.lastModifiedAt.getTime()).toBeGreaterThan(
        pizza.createdAt.getTime(),
      );
    });

    it('should throw error when topping is not found', async () => {
      const pizza = Pizza.create('Margherita', 5);

      await sleep(2);

      pizza.addToppings(Topping.Anchovies, Topping.Bacon);

      expect(() => pizza.removeTopping(Topping.Mushrooms)).toThrow(
        'Topping mushrooms not found',
      );
    });
  });
});
