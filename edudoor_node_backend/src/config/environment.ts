const dotenv = require('dotenv');

dotenv.config();

const environment = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_DIALECT: 'postgres',
};

export default environment;
