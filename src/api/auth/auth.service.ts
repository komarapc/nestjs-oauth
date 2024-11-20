import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { User } from '@/entities/master/user.entity';
import { responseInternalServerError, responseOk } from '@/utils/response-data';
import { TokenServie } from '@/services/token.service';
import { Profile } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly tokenService: TokenServie,
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
}
