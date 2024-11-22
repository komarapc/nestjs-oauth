import { Resource } from '@/entities/master/resource.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Repository } from 'typeorm';
import { ResourceCreateSchema, ResourceQuery } from './resource.schema';
import * as uuid from 'uuid';
@Injectable()
export class ResourceRepository {
  constructor(
    @InjectRepository(Resource) private resourceRepo: Repository<Resource>,
  ) {}

  async getAll(query: ResourceQuery) {
    const { name, page, limit } = query;
    const offset = (page - 1) * limit;
    const whereClause: any = { deletedAt: IsNull() };
    if (name) whereClause.name = Like(`%${name}%`);
    const [resources, total] = await this.resourceRepo.findAndCount({
      where: whereClause,
      order: { id: 'DESC' },
      take: limit,
      skip: offset,
    });
    return { resources, total };
  }
  async findOne(id: string) {
    return await this.resourceRepo.findOne({
      where: { id },
      withDeleted: true,
    });
  }
  async findByName(name: string) {
    return await this.resourceRepo.findOneBy({ name });
  }
  async store(data: ResourceCreateSchema) {
    const id = uuid.v7();
    const resource = this.resourceRepo.create({ ...data, id });
    return await this.resourceRepo.save(resource);
  }
  async update(id: string, data: any) {
    const resource = await this.resourceRepo.findOneBy({ id });
    if (!resource) return null;
    return await this.resourceRepo.save({ ...resource, ...data });
  }
  async destroy(id: string) {
    const resource = await this.findOne(id);
    if (!resource) return null;
    return await this.resourceRepo.softDelete(id);
  }
  async restore(id: string) {
    const resource = await this.findOne(id);
    if (!resource) return null;
    await this.resourceRepo.restore({ id });
    return { ...resource, deletedAt: null };
  }
}
