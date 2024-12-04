import { Permission } from '@/entities/master/permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async getAll(query: any) {}
  async findOne(id: string) {}
  async store(data: any) {}
  async update(id: string, data: any) {}
  async destroy(id: string) {}
  async restore(id: string) {}
}
