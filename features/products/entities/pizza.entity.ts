import { Topping } from '../constants/toppings.enum';

export class Pizza {
  private _id: number;
  private _name: string;
  private _description: string;
  private _price: number;
  private _createdAt: Date;
  private _lastModifiedAt: Date;
  private _toppings: Array<Topping> = [];

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Name of pizza is required');
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
    if (!value) {
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
    if (value == null) {
      throw new Error('Price of pizza is required');
    }

    if (value <= 0) {
      throw new Error('Price of pizza must be greater than or equal to zero');
    }

    if (value === this._price) {
      return;
    }

    this._price = value;
    this._lastModifiedAt = new Date();
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get lastModifiedAt(): Date {
    return this._lastModifiedAt;
  }

  get toppings(): Topping[] {
    // Always return a copy of the array, so that the original array is not modified by the caller
    // This also forces the caller to use the addToppings method to add toppings
    return [...this._toppings];
  }

  addToppings(...toppings: Array<Topping>) {
    this._toppings.push(...toppings);
    this._lastModifiedAt = new Date();
  }
}
