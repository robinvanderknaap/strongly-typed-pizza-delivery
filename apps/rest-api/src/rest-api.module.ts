import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import restApiConfig from './config/rest-api.config';
import restApiConfigSchema from './config/rest-api.config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [restApiConfig],
      isGlobal: true,
      validationSchema: restApiConfigSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class RestApiModule {}
