const dotenv = require('dotenv');

dotenv.config();

const environment: Environment = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_DIALECT: 'postgres',
};

export interface Environment {
  PORT: number | string;
  DATABASE_URL: string | undefined;
  DATABASE_DIALECT: 'postgres' | 'mysql';
}

export default environment;
