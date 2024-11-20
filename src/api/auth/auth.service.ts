import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UsersRepository) {}
}
