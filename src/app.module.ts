import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config/app';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseMasterConfig } from './config/database';
import { PassportModule } from '@nestjs/passport';
import { ApiModule } from './api/api.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(databaseMasterConfig),
    PassportModule.register({ session: true }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
