const defaultConfig = {
  databaseUrl: 'postgres://postgres:postgres@localhost:5433/edudoor',
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
