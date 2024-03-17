import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beverage } from './entities/beverage.entity';
import { Pizza } from './entities/pizza.entity';
import { Product } from './entities/product.entity';
import { SideDish } from './entities/side-dish.entity';
import { CreatePizzaHandler } from './commands/create-pizza.command';

export const CommandHandlers = [CreatePizzaHandler];
@Module({
  imports: [TypeOrmModule.forFeature([Product, Pizza, Beverage, SideDish])],
  providers: [...CommandHandlers],
})
export class ProductsModule {}
