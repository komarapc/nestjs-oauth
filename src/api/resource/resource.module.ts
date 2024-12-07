import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from '@/entities/master/resource.entity';
import { Repository } from 'typeorm';
import { ResourceRepository } from './resource.repository';
import { TokenService } from '@/services/token.service';
import { HasRoleRepository } from '../has-roles/has-roles.repository';
import { PermissionRepository } from '../permission/permission.repository';
import { HasRoles } from '@/entities/master/has-roles.entity';
import { Permission } from '@/entities/master/permission.entity';
import { User } from '@/entities/master/user.entity';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, HasRoles, Permission, User])],
  controllers: [ResourceController],
  providers: [
    ResourceService,
    TokenService,
    Repository,
    ResourceRepository,
    HasRoleRepository,
    PermissionRepository,
    UsersRepository,
  ],
})
export class ResourceModule {}
