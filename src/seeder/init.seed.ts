import { User } from '../entities/master/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import config from '../config/app';
import { Roles } from '../entities/master/roles.entity';
import { HasRoles } from '../entities/master/has-roles.entity';
import { Resource } from '../entities/master/resource.entity';
import { Permission } from '../entities/master/permission.entity';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const users: User[] = [
        {
          id: uuid.v7(),
          name: 'Administrator',
          email: 'admin@mail.com',
          password: bcrypt.hashSync(
            'superSecret123!@#',
            config().salt_round ?? 12,
          ),
        },
      ];
      await queryRunner.manager.getRepository(User).save(users);

      const roles: Roles[] = [
        {
          id: uuid.v7(),
          name: 'Administrator',
        },
      ];
      await queryRunner.manager.getRepository(Roles).save(roles);

      const hasRoles: HasRoles[] = [
        {
          id: uuid.v7(),
          user_id: users[0].id,
          role_id: roles[0].id,
        },
      ];
      await queryRunner.manager.getRepository(HasRoles).save(hasRoles);

      const resources: Resource[] = [
        {
          id: uuid.v7(),
          name: 'User',
          path: '/users',
        },
        {
          id: uuid.v7(),
          name: 'Role',
          path: '/roles',
        },
        {
          id: uuid.v7(),
          name: 'Has Roles',
          path: '/has-roles',
        },
        {
          id: uuid.v7(),
          name: 'Resource',
          path: '/resources',
        },
        {
          id: uuid.v7(),
          name: 'Permission',
          path: '/permissions',
        },
      ];
      await queryRunner.manager.getRepository(Resource).save(resources);

      const action = ['create', 'read', 'update', 'delete'];
      const permissions: Permission[] = resources.map((resource) => ({
        id: uuid.v7(),
        role_id: roles[0].id,
        resource_id: resource.id,
        action: action as Array<'create' | 'read' | 'update' | 'delete'>,
      }));
      await queryRunner.manager.getRepository(Permission).save(permissions);

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error during seeding:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
