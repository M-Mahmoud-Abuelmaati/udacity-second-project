import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE_HOST_TEST,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME_TEST,
  DATABASE_PORT,
  ENV,
} = process.env;

let database;

if (ENV === 'test' || process.env.ENV) {
  database = new Pool({
    host: DATABASE_HOST_TEST,
    database: DATABASE_NAME_TEST,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT as string),
  });
}

if (ENV === 'dev') {
  database = new Pool({
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT as string),
  });
}

export default database;
