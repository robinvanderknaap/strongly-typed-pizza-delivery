import { ChildEntity } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('beverage')
export class Beverage extends Product {
  private constructor() {
    super();
  }

  public static create(name: string, price: number) {
    const beverage = new Beverage();

    beverage.name = name;
    beverage.price = price;

    // Last modified is set when any set accessor is called
    // No need to set it here, because we already set the name and price
    beverage._createdAt = new Date();

    return beverage;
  }
}
