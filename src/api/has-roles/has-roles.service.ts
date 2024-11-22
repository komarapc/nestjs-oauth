import { Injectable } from '@nestjs/common';
import { HasRoleRepository } from './has-roles.repository';
import { hasRolesCreateSchema, HasRolesCreateSchema } from './has-roles.schema';
import { zodErrorHandle } from '@/utils';
import {
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseOk,
} from '@/utils/response-data';

@Injectable()
export class HasRolesService {
  constructor(private readonly hasRoleRepo: HasRoleRepository) {}

  async findOne(id: string) {
    try {
      const hasRole = await this.hasRoleRepo.findOne(id);
      if (!hasRole) return responseBadRequest('Has Role not found');
      return responseOk(hasRole);
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }
  async store(data: HasRolesCreateSchema) {
    try {
      const parsedData = hasRolesCreateSchema.parse(data);
      const hasRole = await this.hasRoleRepo.existUserRoles(
        parsedData.user_id,
        parsedData.role_id,
      );
      if (hasRole) return responseBadRequest('User already has this role');
      const newHasRole = await this.hasRoleRepo.store(parsedData);
      return responseCreated(newHasRole);
    } catch (error) {
      const { errors, hasError } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }

  async destroy(id: string) {
    try {
      const hasRoleExist = await this.hasRoleRepo.findOne(id);
      if (!hasRoleExist) return responseBadRequest('Has Role not found');
      await this.hasRoleRepo.destroy(id);
      return responseOk();
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }
}
