import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './app';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
export const databaseMasterConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: config().database.default.host,
  port: config().database.default.port,
  username: config().database.default.username,
  password: config().database.default.password,
  database: config().database.default.databaseName,
  entities: [__dirname + '/../entities/master/*.entity{.ts,.js}'],
  synchronize: true,
};
