import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beverage } from './entities/beverage.entity';
import { Pizza } from './entities/pizza.entity';
import { Product } from './entities/product.entity';
import { SideDish } from './entities/side-dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Pizza, Beverage, SideDish])],
})
export class ProductsModule {}
