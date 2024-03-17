import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { KnexModuleOptions } from 'nest-knexjs';

export default registerAs('restApiconfig', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  typeOrm: <TypeOrmModuleOptions>{
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(<string>process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
  },
  knex: <KnexModuleOptions>{
    config: {
      client: 'pg',
      version: '5.7',
      connection: {
        host: process.env.POSTGRES_HOST,
        port: parseInt(<string>process.env.POSTGRES_PORT),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        ssl: false,
      },
    },
  },
}));
