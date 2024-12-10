import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from '@/config/app';
export const databaseMasterConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: config().database.default.host,
  port: config().database.default.port,
  username: config().database.default.username,
  password: config().database.default.password,
  database: config().database.default.databaseName,
  entities: [__dirname + '/../entities/master/*.entity{.ts,.js}'],
  synchronize: false,
};
