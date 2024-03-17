import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

export class MenuQuery {
  orderBy: 'name' | 'price' = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  filterByType?: 'pizza' | 'beverage' | 'side-dish';
}

export class MenuQueryResult {
  pizzas: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    toppings: Array<string>;
  }>;
  beverages: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
  }>;
  sideDishes: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
  }>;
}

@QueryHandler(MenuQuery)
export class MenuQueryHandler
  implements IQueryHandler<MenuQuery, MenuQueryResult>
{
  constructor(@InjectConnection() private readonly knex: Knex) {}

  public async execute(menuQuery: MenuQuery): Promise<MenuQueryResult> {
    console.log('start');
    const query = this.knex('products');

    query.select('id', 'type', 'name', 'description', 'price', 'toppings');

    query.orderBy(menuQuery.orderBy, menuQuery.sortOrder);
    if (menuQuery.filterByType) {
      query.where('type', menuQuery.filterByType);
    }

    return (await query).reduce(
      (products: MenuQueryResult, row: any) => {
        let productType: 'pizzas' | 'beverages' | 'sideDishes';

        switch (row.type) {
          case 'pizza':
            productType = 'pizzas';
            break;
          case 'beverage':
            productType = 'beverages';
            break;
          case 'side-dish':
            productType = 'sideDishes';
            break;
          default:
            throw new Error('Unknown product type');
        }

        products[productType].push({
          id: row.id,
          name: row.name,
          description: row.description,
          price: row.price,
          toppings: row.type == 'pizza' ? row.toppings : undefined,
        });

        return products;
      },
      {
        pizzas: [],
        beverages: [],
        sideDishes: [],
      },
    );
  }
}
