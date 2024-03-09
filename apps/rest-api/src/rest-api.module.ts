import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import restApiConfig from './config/rest-api.config';
import restApiConfigSchema from './config/rest-api.config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '@features/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [restApiConfig],
      isGlobal: true,
      validationSchema: restApiConfigSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigType<typeof restApiConfig>) => config.typeOrm,
      inject: [restApiConfig.KEY],
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class RestApiModule {}
