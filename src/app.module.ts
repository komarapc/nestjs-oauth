import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config/app';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseMasterConfig } from './config/database';
import { AuthModule } from './api/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './api/users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(databaseMasterConfig),
    AuthModule,
    PassportModule.register({ session: true }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
