import { NestFactory } from '@nestjs/core';
import { RestApiModule } from './rest-api.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    RestApiModule,
    new FastifyAdapter(),
  );
  await app.listen(3000);
}
bootstrap();
