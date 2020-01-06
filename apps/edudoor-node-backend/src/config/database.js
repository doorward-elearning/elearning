const defaultConfig = {
  databaseUrl: process.env.DATABASE_URL,
  dialect: process.env.DATABASE_DIALECT || 'postgres',
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
