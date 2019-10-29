const dotenv = require('dotenv');

dotenv.config();

// set this up to ensure the project cannot run until some of the environment variables
// have been fulfilled

module.exports = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_DIALECT: 'postgres',
  BCRYPT_PASSWORD_SALT: process.env.BCRYPT_PASSWORD_SALT || 10,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'edudoor-secret-key',
};
