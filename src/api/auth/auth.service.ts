import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import {
  responseBadRequest,
  responseInternalServerError,
  responseNotFound,
  responseOk,
  responseUnauthorized,
} from '@/utils/response-data';
import { TokenService } from '@/services/token.service';
import { Profile } from 'passport-google-oauth20';
import { zodErrorHandle } from '@/utils';
import {
  authLocalLoginRolesSchema,
  AuthLocalLoginRolesSchema,
  authLocalLoginSchema,
  AuthLocalLoginSchema,
  AuthTokenPayload,
} from './auth.schema';
import * as bcrypt from 'bcrypt';
import { HasRoleRepository } from '../has-roles/has-roles.repository';
import { RolesRepository } from '../roles/roles.repository';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly tokenService: TokenService,
    private readonly hasRoleRepo: HasRoleRepository,
    private readonly roleRepo: RolesRepository,
  ) {}

  async validateUser({ email, name }: { email: string; name: string }) {
    const user = await this.userRepo.findOneByEmail(email);
    if (user) return user;
    const newUser = await this.userRepo.store({ email, name });
    return newUser;
  }

  async callbackGoogleAuth(user: UserProfile) {
    try {
      const token = this.tokenService.generateToken({ id: user.id }, '1d');
      const userExist = await this.userRepo.findOneByEmail(user.email);
      const { password, ...restUser } = userExist;
      const avaliableRoles = await this.hasRoleRepo.getByUserId(userExist.id);
      return responseOk({
        user: restUser,
        avaliable_roles: avaliableRoles,
        token,
      });
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

  async loginLocalWithRoles(data: AuthLocalLoginRolesSchema) {
    try {
      const { role_id } = authLocalLoginRolesSchema.parse(data);
      const token = await this.tokenService.getToken();
      const decoded = this.tokenService.decodeToken(token);
      if (!decoded) return responseUnauthorized('Token not valid');
      const [existUserRole, user, role] = await Promise.all([
        this.hasRoleRepo.existUserRoles(decoded.id, role_id),
        this.userRepo.findOneById(decoded.id),
        this.roleRepo.findOneById(role_id),
      ]);
      if (!existUserRole)
        return responseUnauthorized('User does not have permission');
      const { password, ...userData } = user;
      const payload: AuthTokenPayload = { user_id: user.id, role_id };
      const newToken = this.tokenService.generateToken(payload, '1d');
      return responseOk({ user: userData, role, token: newToken });
    } catch (error) {
      const { errors, hasError } = zodErrorHandle(error);
      if (hasError) return responseBadRequest(errors);
      return responseInternalServerError(error.message);
    }
  }
}
