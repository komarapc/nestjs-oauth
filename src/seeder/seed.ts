import { databaseMasterConfig } from '../config/database';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeder, runSeeders, SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  ...databaseMasterConfig,
  seeds: ['src/seeder/**/*.seed{.ts,.js}'],
  factories: ['src/factory/**/*.factory{.ts,.js}'],
};
const dataSource = new DataSource(options);

dataSource
  .initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
    try {
      await runSeeders(dataSource);
      console.log('Seeding completed!');
    } catch (error) {
      console.error('Error during seeding:', error);
    } finally {
      await dataSource.destroy();
    }
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
