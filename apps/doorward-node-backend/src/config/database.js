require('dotenv').config({
  path: '../../.env',
});

const defaultConfig = {
  databaseUrl: process.env.DATABASE_URL,
  dialect: process.env.DATABASE_DIALECT || 'postgres',
  seederStorage: 'sequelize',
  // eslint-disable-next-line @typescript-eslint/camelcase
  use_env_variable: 'DATABASE_URL',
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
