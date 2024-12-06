import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { User } from '@/entities/master/user.entity';
import {
  responseBadRequest,
  responseInternalServerError,
  responseNotFound,
  responseOk,
  responseUnauthorized,
} from '@/utils/response-data';
import { TokenServie } from '@/services/token.service';
import { Profile } from 'passport-google-oauth20';
import { zodErrorHandle } from '@/utils';
import { authLocalLoginSchema, AuthLocalLoginSchema } from './auth.schema';
import * as bcrypt from 'bcrypt';
import { HasRoleRepository } from '../has-roles/has-roles.repository';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly tokenService: TokenServie,
    private readonly hasRoleRepo: HasRoleRepository,
  ) {}

  async validateUser({ email, name }: { email: string; name: string }) {
    const user = await this.userRepo.findOneByEmail(email);
    if (user) return user;
    const newUser = await this.userRepo.store({ email, name });
    console.log('new user', newUser);
    return newUser;
  }

  async callbackGoogleAuth(user: Profile) {
    try {
      const token = this.tokenService.generateToken({ id: user.id }, '1d');
      return responseOk({ user, token });
    } catch (error) {
      return responseInternalServerError(error.message);
    }
  }

  async loginLocal(data: AuthLocalLoginSchema) {
    try {
      const parsedData = authLocalLoginSchema.parse(data);
      const user = await this.userRepo.findOneByEmail(parsedData.email);
      if (!user || user.deletedAt) return responseNotFound('User not found');
      const hashedPassword = bcrypt.compareSync(
        parsedData.password,
        user.password,
      );
      if (!hashedPassword) return responseUnauthorized('Password not match');
      const token = this.tokenService.generateToken({ id: user.id }, '5m');
      const { password, ...userData } = user;
      const avaliableRoles = await this.hasRoleRepo.getByUserId(user.id);
      return responseOk({
        user: userData,
        avaliable_roles: avaliableRoles,
        token,
      });
    } catch (error) {
      const { errors, hasError } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }
}
