import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { HasRolesModule } from './has-roles/has-roles.module';
import { PermissionModule } from './permission/permission.module';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    HasRolesModule,
    PermissionModule,
    ResourceModule,
  ],
})
export class ApiModule {}
