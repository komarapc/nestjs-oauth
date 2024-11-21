import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { RolesCreateSchema, RolesQuerySchema } from './roles.schema';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepo: RolesRepository) {}

  async getAll(query: RolesQuerySchema) {}
  async findOne(id: string) {}
  async store(data: RolesCreateSchema) {}
  async update(id: string, data: RolesCreateSchema) {}
  async destroy(id: string) {}
}
