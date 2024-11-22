import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from '@/entities/master/resource.entity';
import { Repository } from 'typeorm';
import { ResourceRepository } from './resource.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  controllers: [ResourceController],
  providers: [ResourceService, Repository, ResourceRepository],
})
export class ResourceModule {}
