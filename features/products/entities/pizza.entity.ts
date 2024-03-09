import { DomainError } from '@infrastructure/errors/domain.error';
import { Topping } from '../constants/toppings.enum';
import { Product } from './product.entity';

export class Pizza extends Product {
  private _toppings: Array<Topping> = [];

  // We don't want to allow the creation of a pizza without calling the create method
  // Therefore the constructor is private
  // This constructor is only used by the ORM to rehydrate the entity  and internally by the create method
  private constructor() {
    super();
  }

  // Static factory
  public static create(name: string, price: number) {
    const pizza = new Pizza();

    // Use the setters to ensure that the value is validated
    pizza.name = name;
    pizza.price = price;

    // Set created date on creation of the entity
    pizza._createdAt = new Date();

    // Created and last modified dates are equal on creation of the entity
    pizza._lastModifiedAt = pizza._createdAt;

    return pizza;
  }

  get toppings(): Topping[] {
    // Always return a copy of the array, so that the original array is not modified by the caller
    // This forces the calling code to use the addToppings method
    return [...this._toppings];
  }

  // No checking for duplicates, because we want to allow the same topping to be added multiple times
  // Notice the use of the spread (...) operator to add multiple toppings at once like this: pizza.addToppings(Topping.Anchovies, Topping.Chili)
  addToppings(...toppings: Array<Topping>) {
    this._toppings.push(...toppings);
    this._lastModifiedAt = new Date();
  }

  removeTopping(topping: Topping) {
    const index = this._toppings.indexOf(topping);

    if (index === -1) {
      throw new DomainError(`Topping ${topping} not found`);
    }

    this._toppings.splice(index, 1);
    this._lastModifiedAt = new Date();
  }
}
