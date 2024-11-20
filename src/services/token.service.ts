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
    const token = jwt.sign(payload, config().jwt.secret, { expiresIn });
    return token;
  }

  verifyToken(token: string) {
    try {
      const payload = jwt.verify(token, config().jwt.secret);
      return payload;
    } catch (error) {
      return null;
    }
  }

  decodeToken(token: string) {
    return jwt.decode(token);
  }
}
