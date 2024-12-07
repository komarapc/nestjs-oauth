import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/master/user.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from './users.repository';
import { CacheModule } from '@nestjs/cache-manager';
import { TokenService } from '@/services/token.service';
import { AuthService } from '../auth/auth.service';
import { RolesRepository } from '../roles/roles.repository';
import { HasRoleRepository } from '../has-roles/has-roles.repository';
import { Roles } from '@/entities/master/roles.entity';
import { HasRoles } from '@/entities/master/has-roles.entity';
import { Permission } from '@/entities/master/permission.entity';
import { PermissionRepository } from '../permission/permission.repository';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([User, Roles, HasRoles, Permission]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    TokenService,
    AuthService,
    Repository,
    UsersRepository,
    RolesRepository,
    HasRoleRepository,
    PermissionRepository,
  ],
})
export class UsersModule {}
