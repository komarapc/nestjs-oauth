import { HttpStatus, Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import {
  permissionCreateSchema,
  PermissionCreateSchema,
} from './permission.schema';
import { ZodError } from 'zod';
import {
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseJson,
} from '@/utils/response-data';
import { zodErrorHandle } from '@/utils';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepo: PermissionRepository) {}

  async getAll(query: any) {}
  async findOne(id: string) {}
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
