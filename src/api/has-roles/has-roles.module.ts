import { Module } from '@nestjs/common';
import { HasRolesController } from './has-roles.controller';
import { HasRolesService } from './has-roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HasRoles } from '@/entities/master/has-roles.entity';
import { Repository } from 'typeorm';
import { HasRoleRepository } from './has-roles.repository';
import { TokenService } from '@/services/token.service';
import { PermissionRepository } from '../permission/permission.repository';
import { Permission } from '@/entities/master/permission.entity';
import { UsersRepository } from '../users/users.repository';
import { User } from '@/entities/master/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HasRoles, Permission, User])],
  controllers: [HasRolesController],
  providers: [
    HasRolesService,
    TokenService,
    Repository,
    HasRoleRepository,
    PermissionRepository,
    UsersRepository,
  ],
})
export class HasRolesModule {}
