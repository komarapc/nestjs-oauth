import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import config from '@/config/app';
import { AuthTokenPayload } from '@/api/auth/auth.schema';
import { UsersRepository } from '@/api/users/users.repository';

@Injectable()
export class TokenService {
  constructor(private readonly userRepo: UsersRepository) {}
  public token: string = '';

  async setToken(token: string) {
    this.token = token;
  }

  async getToken() {
    return this.token;
  }

  generateToken(payload: any, expiresIn: string = '5m') {
    return jwt.sign(payload, config().jwt.secret, { expiresIn });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, config().jwt.secret);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }

  decodeToken(token: string): any {
    return jwt.decode(token, { json: true });
  }

  validateToken(token: string) {
    try {
      return Boolean(jwt.verify(token, config().jwt.secret));
    } catch (error) {
      return false;
    }
  }

  async getUser() {
    const token: AuthTokenPayload = this.decodeToken(this.token);
    const user = await this.userRepo.findOneById(token.user_id);
    const { password, ...rest } = user;
    return rest;
  }
}
