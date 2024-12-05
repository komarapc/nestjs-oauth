import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import {
  permissionCreateSchema,
  PermissionCreateSchema,
} from './permission.schema';
import {
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/utils/response-data';
import { zodErrorHandle } from '@/utils';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepo: PermissionRepository) {}

  async getAll(query: any) {}
  async findOne(id: string) {
    try {
      const permission = await this.permissionRepo.findOne(id);
      if (!permission || permission.deletedAt)
        return responseNotFound('Permission not found');
      return responseOk(permission);
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }
  async store(data: PermissionCreateSchema) {
    try {
      const parsedData = permissionCreateSchema.parse(data);
      const newPemission = await this.permissionRepo.store(parsedData);
      return responseCreated({ permissions: newPemission });
    } catch (error) {
      const { errors, hasError } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }
  async update(id: string, data: any) {}
  async destroy(id: string) {}
  async restore(id: string) {}
}
