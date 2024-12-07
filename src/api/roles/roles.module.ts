import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Repository } from 'typeorm';
import { RolesRepository } from './roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '@/entities/master/roles.entity';
import { User } from '@/entities/master/user.entity';
import { HasRoles } from '@/entities/master/has-roles.entity';
import { Permission } from '@/entities/master/permission.entity';
import { TokenServie } from '@/services/token.service';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';
import { HasRoleRepository } from '../has-roles/has-roles.repository';
import { PermissionRepository } from '../permission/permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, User, HasRoles, Permission])],
  controllers: [RolesController],
  providers: [
    RolesService,
    TokenServie,
    AuthService,
    Repository,
    RolesRepository,
    UsersRepository,
    RolesRepository,
    HasRoleRepository,
    PermissionRepository,
  ],
})
export class RolesModule {}
