import { DomainError } from '@infrastructure/errors/domain.error';
import { Topping } from '../constants/toppings.enum';

export class Pizza {
  // Private fields, containing the state of the entity
  // These fields are only accessible from within the class
  private _id: number;
  private _name: string;
  private _description: string;
  private _price: number;
  private _createdAt: Date;
  private _lastModifiedAt: Date;
  private _toppings: Array<Topping> = [];

  // We don't want to allow the creation of a pizza without calling the create method
  // Therefore the constructor is private
  // This constructor is only used by the ORM to rehydrate the entity  and internally by the create method
  private constructor() {}

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

  // No setter for id, because it is set automatically when the pizza is stored by the ORM
  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new DomainError('Name of pizza is required');
    }

    value = value.trim();

    if (value === this._name) {
      return;
    }

    this._name = value;
    this._lastModifiedAt = new Date();
  }

  get description(): string {
    return this._description ?? null;
  }

  set description(value: string) {
    if (value) {
      value = value.trim();
    }

    if (value === this._description) {
      return;
    }

    this._description = value;
    this._lastModifiedAt = new Date();
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (!value) {
      throw new DomainError('Price of pizza is required');
    }

    if (value <= 0) {
      throw new DomainError(
        'Price of pizza must be greater than or equal to zero',
      );
    }

    if (value === this._price) {
      return;
    }

    this._price = value;
    this._lastModifiedAt = new Date();
  }

  // No setter for createdAt, because it is set automatically when the pizza is created
  get createdAt(): Date {
    return this._createdAt;
  }

  // No setter for lastModifiedAt, because it is set automatically when any set accessor is called
  get lastModifiedAt(): Date {
    return this._lastModifiedAt;
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
