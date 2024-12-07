import { Module } from '@nestjs/common';
import { HasRolesController } from './has-roles.controller';
import { HasRolesService } from './has-roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HasRoles } from '@/entities/master/has-roles.entity';
import { Repository } from 'typeorm';
import { HasRoleRepository } from './has-roles.repository';
import { TokenServie } from '@/services/token.service';
import { PermissionRepository } from '../permission/permission.repository';
import { Permission } from '@/entities/master/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HasRoles, Permission])],
  controllers: [HasRolesController],
  providers: [
    HasRolesService,
    TokenServie,
    Repository,
    HasRoleRepository,
    PermissionRepository,
  ],
})
export class HasRolesModule {}
