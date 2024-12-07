import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import config from '@/config/app';

@Injectable()
export class TokenServie {
  public token: string = '';

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
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

  decodeToken(token: string) {
    return jwt.decode(token, { json: true });
  }

  validateToken(token: string) {
    try {
      return Boolean(jwt.verify(token, config().jwt.secret));
    } catch (error) {
      return false;
    }
  }
}
