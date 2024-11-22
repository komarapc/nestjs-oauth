import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { HasRolesModule } from './has-roles/has-roles.module';

@Module({
  imports: [AuthModule, UsersModule, RolesModule, HasRolesModule],
})
export class ApiModule {}
