import { User } from '@/entities/master/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  private selectFields = {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
  };
  async findOneByEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
      select: this.selectFields,
    });
  }

  async findOneById(id: string) {
    return await this.userRepo.findOne({ where: { id } });
  }

  async store(user: User) {
    const newUser = this.userRepo.create({ ...user, id: uuid.v7() });
    return this.userRepo.save(newUser);
  }
}
