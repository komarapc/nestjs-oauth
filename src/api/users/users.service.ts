import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import {
  userCreateSchema,
  UserCreateSchema,
  userQuerySchema,
  UserQuerySchema,
  userUpdateSchema,
  UserUpdateSchema,
} from './users.schema';
import {
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/utils/response-data';
import { metaPagination, zodErrorHandle } from '@/utils';
import * as bcrypt from 'bcrypt';
import config from '@/config/app';
@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async getAll(query: UserQuerySchema) {
    try {
      const parsedQuery = userQuerySchema.parse(query);
      const users = await this.userRepo.getAll(parsedQuery);
      if (!users.data.length) return responseNotFound('Users not found');
      const meta = metaPagination(
        { page: parsedQuery.page, limit: parsedQuery.limit },
        users.total,
      );
      return responseOk({ users: users.data, meta });
    } catch (error) {
      const { hasError, errors } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepo.findOneById(id);
      if (!user || user.deletedAt) return responseNotFound('User not found');
      const { password, ...rest } = user;
      return responseOk({ ...rest });
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }

  async store(data: UserCreateSchema) {
    try {
      const parsedData = userCreateSchema.parse(data);
      const user = await this.userRepo.findOneByEmail(parsedData.email);
      if (user) return responseBadRequest('Email already registered');
      const hashedPassword = bcrypt.hashSync(
        parsedData.password,
        config().salt_round,
      );
      const newUser = await this.userRepo.store({
        name: parsedData.name,
        email: parsedData.email,
        password: hashedPassword,
      });
      const { password, deletedAt, ...rest } = newUser;
      return responseCreated({ ...rest });
    } catch (error) {
      const { errors, hasError } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }

  async update(id: string, data: UserUpdateSchema) {
    try {
      const parsedData = userUpdateSchema.parse(data);
      const user = await this.userRepo.findOneById(id);
      if (!user || user.deletedAt) return responseNotFound('User not found');
      let hashedPassword = '';
      if (parsedData.password) {
        hashedPassword = bcrypt.hashSync(
          parsedData.password,
          config().salt_round,
        );
      }
      const updateUser = await this.userRepo.update(id, {
        ...parsedData,
        password: parsedData.password ? hashedPassword : user.password,
      });
      const { password, ...rest } = updateUser;
      return responseOk({ ...rest });
    } catch (error) {
      console.log({ error });
      const { errors, hasError } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }

  async destroy(id: string) {
    try {
      const user = await this.userRepo.findOneById(id);
      if (!user || user.deletedAt) return responseNotFound('User not found');
      await this.userRepo.destroy(id);
      return responseOk(null);
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }
}
