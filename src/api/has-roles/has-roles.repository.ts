import { HasRoles } from '@/entities/master/has-roles.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HasRolesCreateSchema } from './has-roles.schema';
import * as uuid from 'uuid';
@Injectable()
export class HasRoleRepository {
  constructor(
    @InjectRepository(HasRoles) private readonly hasRole: Repository<HasRoles>,
  ) {}

  async findOne(id: string) {
    return await this.hasRole.findOne({
      where: { id },
      loadEagerRelations: true,
      relations: {
        user: true,
        role: true,
      },
    });
  }

  async existUserRoles(user_id: string, role_id: string): Promise<boolean> {
    const hasRole = await this.hasRole.findOneBy({ user_id, role_id });
    return !!hasRole;
  }

  async store(data: HasRolesCreateSchema) {
    const id = uuid.v7();
    const hasRole = this.hasRole.create({ ...data, id });
    return await this.hasRole.save(hasRole);
  }

  async destroy(id: string) {
    return await this.hasRole.delete(id);
  }

  async getByUserId(user_id: string) {
    const hasRoles = await this.hasRole.find({
      where: { user_id },
      relations: {
        role: true,
      },
    });
    return hasRoles.map((item) => {
      const { role, ...rest } = item;
      return { id: role.id, name: role.name };
    });
  }
}
