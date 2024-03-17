import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beverage } from './entities/beverage.entity';
import { Pizza } from './entities/pizza.entity';
import { Product } from './entities/product.entity';
import { SideDish } from './entities/side-dish.entity';
import { CreatePizzaHandler } from './commands/create-pizza.command';
import { ProductsController } from './controllers/products.controller';
import { MenuQueryHandler } from './queries/menu.query';
import { CqrsModule } from '@nestjs/cqrs';

export const CommandHandlers = [CreatePizzaHandler];
export const QueryHandlers = [MenuQueryHandler];
@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Product, Pizza, Beverage, SideDish]),
  ],
  providers: [...CommandHandlers, ...QueryHandlers],
  controllers: [ProductsController],
})
export class ProductsModule {}
