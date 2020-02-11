import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  ALLOW_CORS: process.env.ALLOW_CORS || "false",
  CORS_HOST: process.env.CORS_HOST || 'http://localhost:3000',
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_TEST_DATABASE: process.env.MYSQL_TEST_DATABASE,
  MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
  MYSQL_PORT: +process.env.MYSQL_PORT || 3306,
  PORT: +process.env.PORT || 3002,
  JWT_SECRET: process.env.JWT_SECRET,
}

if (!config.MYSQL_USER) throw new Error("please config MYSQL_USER in .env")
if (!config.MYSQL_PASSWORD) throw new Error("please config MYSQL_PASSWORD in .env")
if (!config.MYSQL_DATABASE) throw new Error("please config MYSQL_DATABASE in .env")
if (!config.MYSQL_TEST_DATABASE) throw new Error("please config MYSQL_TEST_DATABASE in .env")
if (!config.JWT_SECRET) {
  console.log("warning: JWT secret is not set, it's set to some string");
  config.JWT_SECRET =  'asdjfkn34qlfavindfsdf';
}

export default config;