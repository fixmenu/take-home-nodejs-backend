import dotenv from 'dotenv';

dotenv.config();
export const isServerUpTest = process.env.TEST_ENV_VARIABLE;
export const connectionString = process.env.CONNECTION_STRING;
export const tokenSecret = process.env.TOKEN_SECRET;
export const adminToken=process.env.ADMIN_TOKEN;
