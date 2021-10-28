const dotenv = require('dotenv');
const entities = require('../../libs/backend/src/database/backendMigrationEntities').default;

dotenv.config();
dotenv.config({ path: '../../.env' });

module.exports = {
  type: 'postgres',
  entities: [...entities],
  migrations: ['./src/database/main/migrations/*.ts'],
  seeds: ['./src/database/main/seeds/*.ts'],
  logging: ['error'],
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  seedersTableName: 'seeds',
  host: process.env.DOORWARD_DATABASE_HOST,
  port: +process.env.DOORWARD_DATABASE_PORT,
  username: process.env.DOORWARD_DATABASE_USERNAME,
  password: process.env.DOORWARD_DATABASE_PASSWORD,
  database: process.env.DEFAULT_ORGANIZATION_DATABASE_NAME,
  cli: {
    migrationsDir: './src/database/main/migrations/',
    seederDir: './src/database/main/seeds/',
  },
};
