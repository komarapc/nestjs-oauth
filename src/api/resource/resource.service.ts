import { Injectable } from '@nestjs/common';
import { ResourceRepository } from './resource.repository';
import {
  resourceCreateSchema,
  ResourceCreateSchema,
  ResourceQuery,
  resourceQuerySchema,
} from './resource.schema';
import { metaPagination, zodErrorHandle } from '@/utils';
import {
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/utils/response-data';

@Injectable()
export class ResourceService {
  constructor(private readonly resourceRepo: ResourceRepository) {}
  async getAll(query: ResourceQuery) {
    try {
      const parsedQuery = resourceQuerySchema.parse(query);
      const { resources, total } = await this.resourceRepo.getAll(parsedQuery);
      if (!resources.length) return responseNotFound('Resource not found');
      const meta = metaPagination(
        {
          page: parsedQuery.page,
          limit: parsedQuery.limit,
        },
        total,
      );
      return responseOk({ resources, meta });
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }
  async findOne(id: string) {
    try {
      const resource = await this.resourceRepo.findOne(id);
      if (!resource || resource.deletedAt)
        return responseNotFound('Resource not found');
      return responseOk(resource);
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }
  async store(data: ResourceCreateSchema) {
    try {
      const parsedData = resourceCreateSchema.parse(data);
      const resource = await this.resourceRepo.findByName(parsedData.name);
      if (resource) return responseBadRequest('Resource already exists');
      const newResource = await this.resourceRepo.store(parsedData);
      return responseCreated(newResource);
    } catch (error) {
      const { errors, hasError } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }
  async update(id: string, data: any) {
    try {
      const parsedData = resourceCreateSchema.parse(data);
      const [resource, resourceByName] = await Promise.all([
        this.resourceRepo.findOne(id),
        this.resourceRepo.findByName(parsedData.name),
      ]);
      if (!resource || resource.deletedAt)
        return responseNotFound('Resource not found');
      if (resourceByName && resourceByName.id !== id)
        return responseBadRequest('Resource already exists');
      const updatedResource = await this.resourceRepo.update(id, parsedData);
      return responseOk(updatedResource);
    } catch (error) {
      const { hasError, errors } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }
  async destroy(id: string) {
    try {
      const resource = await this.resourceRepo.findOne(id);
      if (!resource || resource.deletedAt)
        return responseNotFound('Resource not found');
      await this.resourceRepo.destroy(id);
      return responseOk();
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }
  async restore(id: string) {
    try {
      const resource = await this.resourceRepo.findOne(id);
      if (!resource) return responseNotFound('Resource not found');
      const restoredResource = await this.resourceRepo.restore(id);
      return responseOk(restoredResource);
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }
}
