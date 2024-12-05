import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import {
  permissionCreateSchema,
  PermissionCreateSchema,
  permissionQuerySchema,
  PermissionQuerySchema,
  permissionUpdateSchema,
  PermissionUpdateSchema,
} from './permission.schema';
import {
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/utils/response-data';
import { metaPagination, zodErrorHandle } from '@/utils';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepo: PermissionRepository) {}

  async getAll(query: PermissionQuerySchema) {
    try {
      const parsedQuery = permissionQuerySchema.parse(query);
      const { data, total } = await this.permissionRepo.getAll(parsedQuery);
      if (!data.length) return responseNotFound('No data found');
      const meta = metaPagination(
        { limit: parsedQuery.limit, page: parsedQuery.page },
        total,
      );
      return responseOk({ permissions: data, meta });
    } catch (error) {
      const { errors, hasError } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }
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
  async update(id: string, data: PermissionUpdateSchema) {
    try {
      const parsedData = permissionUpdateSchema.parse(data);
      const permission = await this.permissionRepo.findOne(id);
      if (!permission || permission.deletedAt)
        return responseNotFound('Permission not found');
      const updatedPermission = await this.permissionRepo.update(
        id,
        parsedData,
      );
      return responseOk(updatedPermission);
    } catch (error) {
      const { errors, hasError } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }
  async destroy(id: string) {}
  async restore(id: string) {}
}
