import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepo: PermissionRepository) {}

  async getAll(query: any) {}
  async findOne(id: string) {}
  async store(data: any) {}
  async update(id: string, data: any) {}
  async destroy(id: string) {}
  async restore(id: string) {}
}
