import { environment } from '../environments/environment';

const defaultConfig = {
  databaseUrl: environment.DATABASE_URL,
  dialect: environment.DATABASE_DIALECT || 'postgres',
  seederStorage: 'sequelize',
};

const database = {
  development: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
  },
  staging: {
    ...defaultConfig,
  },
  production: {
    ...defaultConfig,
  },
};

module.exports = database;
