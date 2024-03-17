import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MenuQuery } from '../queries/menu.query';

@Controller('products')
export class ProductsController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get()
  async menu() {
    const menuQuery = new MenuQuery();

    return await this.queryBus.execute(menuQuery);
  }
}
