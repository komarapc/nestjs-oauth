import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from '@/entities/master/resource.entity';
import { Repository } from 'typeorm';
import { ResourceRepository } from './resource.repository';
import { TokenServie } from '@/services/token.service';
import { HasRoleRepository } from '../has-roles/has-roles.repository';
import { PermissionRepository } from '../permission/permission.repository';
import { HasRoles } from '@/entities/master/has-roles.entity';
import { Permission } from '@/entities/master/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, HasRoles, Permission])],
  controllers: [ResourceController],
  providers: [
    ResourceService,
    TokenServie,
    Repository,
    ResourceRepository,
    HasRoleRepository,
    PermissionRepository,
  ],
})
export class ResourceModule {}
