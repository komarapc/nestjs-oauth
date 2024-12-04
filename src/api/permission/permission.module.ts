import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Repository } from 'typeorm';
import { PermissionRepository } from './permission.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '@/entities/master/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService, Repository, PermissionRepository],
})
export class PermissionModule {}
