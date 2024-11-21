import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import {
  rolesCreateSchema,
  RolesCreateSchema,
  rolesQuerySchema,
  RolesQuerySchema,
} from './roles.schema';
import {
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/utils/response-data';
import { metaPagination, zodErrorHandle } from '@/utils';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepo: RolesRepository) {}

  async getAll(query: RolesQuerySchema) {
    try {
      const parsedQuery = rolesQuerySchema.parse(query);
      const { data, total } = await this.rolesRepo.getAll(parsedQuery);
      if (!data.length) return responseNotFound('Data not found');
      const meta = metaPagination(
        { limit: parsedQuery.limit, page: parsedQuery.page },
        total,
      );
      return responseOk({ roles: data, meta });
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }
  async findOne(id: string) {
    try {
      const roles = await this.rolesRepo.findOneById(id);
      if (!roles || roles.deletedAt) return responseNotFound('Data not found');
      return responseOk(roles);
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }
  async store(data: RolesCreateSchema) {
    try {
      const parsedData = rolesCreateSchema.parse(data);
      const roles = await this.rolesRepo.store(parsedData);
      return responseCreated(roles);
    } catch (error) {
      const { errors, hasError } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }
  async update(id: string, data: RolesCreateSchema) {
    try {
      const parsedData = rolesCreateSchema.parse(data);
      const roles = await this.rolesRepo.findOneById(id);
      if (!roles) return responseNotFound('Data not found');
      const updatedRoles = await this.rolesRepo.update(id, parsedData);
      return responseOk(updatedRoles);
    } catch (error) {
      const { errors, hasError } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }
  async destroy(id: string) {
    try {
      const roles = await this.rolesRepo.findOneById(id);
      if (!roles) return responseNotFound('Data not found');
      await this.rolesRepo.destroy(id);
      return responseOk(null);
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }
}
