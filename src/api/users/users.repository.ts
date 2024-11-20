import { User } from '@/entities/master/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(private readonly userRepo: Repository<User>) {}

  private selectFields = {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
  };
  async findOneByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    return user;
  }

  async findOneById(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    return user;
  }
}
