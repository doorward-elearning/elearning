const dotenv = require('dotenv');
const entities = require('../../libs/backend/src/database/organizations.entities.ts').default;

dotenv.config();
dotenv.config({ path: '../../.env' });

module.exports = {
  type: 'postgres',
  entities: [...entities],
  migrations: ['./src/database/organizations/migrations/*.ts'],
  seeds: ['./src/database/organizations/seeds/*.ts'],
  // logging: process.env.NODE_ENV === 'development',
  logging: true,
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  seedersTableName: 'seeds',
  host: process.env.DOORWARD_DATABASE_HOST,
  port: +process.env.DOORWARD_DATABASE_PORT,
  username: process.env.DOORWARD_DATABASE_USERNAME,
  password: process.env.DOORWARD_DATABASE_PASSWORD,
  database: process.env.ORGANIZATION_DATABASE,
  cli: {
    migrationsDir: './src/database/organizations/migrations/',
    seederDir: './src/database/organizations/seeds/',
  },
};
