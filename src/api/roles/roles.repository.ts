import { Roles } from '@/entities/master/roles.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Repository } from 'typeorm';
import { RolesCreateSchema, RolesQuerySchema } from './roles.schema';
import * as uuid from 'uuid';
@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Roles) private readonly rolesRepo: Repository<Roles>,
  ) {}

  async getAll(query: RolesQuerySchema) {
    const { name, page, limit } = query;
    const offset = (page - 1) * limit;
    const whereClause = { deletedAt: IsNull() };
    if (name) whereClause['name'] = Like(`%${name}%`);
    const roles = await this.rolesRepo.findAndCount({
      where: whereClause,
      skip: offset,
      take: limit,
    });
    return { data: roles[0], total: roles[1] };
  }

  async findOneById(id: string) {
    return await this.rolesRepo.findOneBy({ id });
  }

  async store(data: RolesCreateSchema) {
    const id = uuid.v7();
    const role = this.rolesRepo.create({ ...data, id });
    return await this.rolesRepo.save(role);
  }

  async update(id: string, data: RolesCreateSchema) {
    const role = await this.rolesRepo.findOneBy({ id });
    if (!role) return null;
    return await this.rolesRepo.save({ ...role, ...data });
  }

  async destroy(id: string) {
    const role = await this.rolesRepo.findOneBy({ id });
    if (!role) return null;
    return await this.rolesRepo.softDelete(id);
  }
}
