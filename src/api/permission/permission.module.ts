import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Repository } from 'typeorm';
import { PermissionRepository } from './permission.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '@/entities/master/permission.entity';
import { User } from '@/entities/master/user.entity';
import { TokenService } from '@/services/token.service';
import { UsersRepository } from '../users/users.repository';
import { HasRoles } from '@/entities/master/has-roles.entity';
import { HasRoleRepository } from '../has-roles/has-roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, User, HasRoles])],
  controllers: [PermissionController],
  providers: [
    PermissionService,
    TokenService,
    Repository,
    PermissionRepository,
    UsersRepository,
    HasRoleRepository,
  ],
})
export class PermissionModule {}
