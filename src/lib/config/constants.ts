import * as dotenv from 'dotenv';
dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT;
export const GRAPHQL_PATH = '/api/graphql';
export const ORIGIN = process.env.ORIGIN;
export const AUTH_JWT_SECRET = process.env.SECRET_KEY;
export const AUTH_KEY_EXPIRY = process.env.AUTH_KEY_EXPIRY;
export const FETCH_LIMIT = 10;
export const MAX_FETCH_LIMT = 30;
