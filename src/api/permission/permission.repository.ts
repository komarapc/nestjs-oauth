import { Permission } from '@/entities/master/permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionCreateSchema } from './permission.schema';
import * as uuid from 'uuid';
@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async getAll(query: any) {}
  async findOne(id: string) {}
  async store(data: PermissionCreateSchema) {
    const queryRunner =
      this.permissionRepo.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = [];
      for (const item of data) {
        const checkPermission = await this.findByRoleAndResource(
          item.role_id,
          item.resource_id,
        );
        if (!checkPermission) {
          const newPermission = queryRunner.manager.create(Permission, {
            ...item,
            id: uuid.v7(),
          });
          await queryRunner.manager.save(newPermission);
          result.push(newPermission);
        } else {
          await queryRunner.manager.update(
            Permission,
            {
              role_id: item.role_id,
              resource_id: item.resource_id,
            },
            { action: item.action },
          );
          result.push({ ...checkPermission, action: item.action });
        }
      }

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error.message);
    }
  }
  async update(id: string, data: any) {}
  async destroy(id: string) {}
  async restore(id: string) {}

  async findByRoleAndResource(role_id: string, resource_id: string) {
    return await this.permissionRepo.findOne({
      where: {
        role_id,
        resource_id,
      },
    });
  }
}
