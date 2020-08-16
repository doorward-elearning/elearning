const dotenv = require('dotenv');

dotenv.config();
dotenv.config({ path: '../../.env' });

module.exports = {
  type: 'postgres',
  entities: ['./src/database/entities/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  logging: process.env.NODE_ENV === 'development',
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  host: process.env.DOORWARD_DATABASE_HOST,
  port: +process.env.DOORWARD_DATABASE_PORT,
  username: process.env.DOORWARD_DATABASE_USERNAME,
  password: process.env.DOORWARD_DATABASE_PASSWORD,
  database: process.env.DOORWARD_DATABASE,
  seeds: ['./src/database/seeds/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations/',
  },
};
