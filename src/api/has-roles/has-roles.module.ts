import { Module } from '@nestjs/common';
import { HasRolesController } from './has-roles.controller';
import { HasRolesService } from './has-roles.service';

@Module({
  controllers: [HasRolesController],
  providers: [HasRolesService]
})
export class HasRolesModule {}
