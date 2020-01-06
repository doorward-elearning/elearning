const environment = require('../environments/environment').environment;

const defaultConfig = {
  databaseUrl: environment.DATABASE_URL,
  dialect: environment.DATABASE_DIALECT || 'postgres',
  seederStorage: 'sequelize',
};

module.exports = {
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
