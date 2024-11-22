import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/master/user.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from './users.repository';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, Repository, UsersRepository],
})
export class UsersModule {}
