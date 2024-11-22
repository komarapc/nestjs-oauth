import { Module } from '@nestjs/common';
import { HasRolesController } from './has-roles.controller';
import { HasRolesService } from './has-roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HasRoles } from '@/entities/master/has-roles.entity';
import { Repository } from 'typeorm';
import { HasRoleRepository } from './has-roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HasRoles])],
  controllers: [HasRolesController],
  providers: [HasRolesService, Repository, HasRoleRepository],
})
export class HasRolesModule {}
