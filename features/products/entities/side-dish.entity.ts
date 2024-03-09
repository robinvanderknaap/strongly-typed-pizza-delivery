import { Product } from './product.entity';

export class SideDish extends Product {
  private constructor() {
    super();
  }

  public static create(name: string, price: number) {
    const sideDish = new SideDish();

    sideDish.name = name;
    sideDish.price = price;

    // Last modified is set when any set accessor is called
    // No need to set it here, because we already set the name and price
    sideDish._createdAt = new Date();

    return sideDish;
  }
}
