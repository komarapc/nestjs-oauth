import { Permission } from '@/entities/master/permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonContains, Like, Repository } from 'typeorm';
import {
  PermissionCreateSchema,
  PermissionQuerySchema,
  PermissionUpdateSchema,
} from './permission.schema';
import * as uuid from 'uuid';
import { getOffset } from '@/utils';
type ResourceAction = 'create' | 'read' | 'update' | 'delete';
@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async getAll(query: PermissionQuerySchema) {
    const offset = getOffset(query.page, query.limit);

    const permissionQueryBuilder = this.permissionRepo
      .createQueryBuilder('permission')
      .leftJoinAndSelect('permission.role', 'role')
      .leftJoinAndSelect('permission.resource', 'resource')
      .take(query.limit)
      .skip(offset);
    if (query.roleName)
      permissionQueryBuilder.andWhere('role.name LIKE :roleName', {
        roleName: `%${query.roleName}%`,
      });
    if (query.resourceName)
      permissionQueryBuilder.andWhere('resource.name LIKE :resourceName', {
        resourceName: `%${query.resourceName}%`,
      });
    if (query.action) {
      permissionQueryBuilder.andWhere(
        'JSON_CONTAINS(permission.action, :action)',
        {
          action: JSON.stringify([query.action]),
        },
      );
    }

    const [data, total] = await permissionQueryBuilder.getManyAndCount();
    return { data, total };
  }
  async findOne(id: string) {
    return await this.permissionRepo
      .createQueryBuilder('permission')
      .leftJoinAndSelect('permission.role', 'role')
      .leftJoinAndSelect('permission.resource', 'resource')
      .select(['permission', 'role.name', 'resource.name'])
      .where('permission.id = :id', { id })
      .withDeleted()
      .getOne();
  }
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
    } finally {
      await queryRunner.release();
    }
  }
  async update(id: string, data: PermissionUpdateSchema) {
    const permission = await this.permissionRepo.findOne({
      where: { id },
      relations: { role: true, resource: true },
    });
    if (!permission) return null;
    Object.assign(permission, {
      role_id: data.role_id,
      resource_id: data.resource_id,
      action: data.action,
    });
    await this.permissionRepo.save(permission);
    return await this.findOne(id);
  }
  async bulkUpdate(data: any) {}
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
