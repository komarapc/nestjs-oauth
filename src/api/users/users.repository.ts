import { User } from '@/entities/master/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as uuid from 'uuid';
import { UserQuerySchema, UserUpdateSchema } from './users.schema';
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

  async getAll(query: UserQuerySchema) {
    const { page, limit, email, name } = query;
    const offset = (page - 1) * limit;
    const whereClause: Array<{}> = [{ deletedAt: null }];
    if (email) whereClause.push({ email: Like(`%${email}%`) });
    if (name) whereClause.push({ name: Like(`%${name}%`) });
    const users = await this.userRepo.findAndCount({
      where: [{ deletedAt: null }, ...whereClause],
      select: this.selectFields,
      take: limit,
      skip: offset,
    });
    return { data: users[0], total: users[1] };
  }

  async update(id: string, data: UserUpdateSchema) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user || user.deletedAt) return null;
    user.name = data.name || user.name;
    user.email = data.email || user.email;
    user.password = data.password || user.password;
    return this.userRepo.save(user);
  }
}
