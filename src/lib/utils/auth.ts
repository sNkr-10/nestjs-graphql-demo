import * as jwt from 'jsonwebtoken';
import { AUTH_JWT_SECRET, AUTH_KEY_EXPIRY } from '../../lib/config/constants';

// Generate an access token
export const generateAccessToken = ({ userId, email }): string => {
  const accessToken = jwt.sign({ userId, email }, AUTH_JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: AUTH_KEY_EXPIRY,
  });
  return accessToken;
};

// Verify the access token
export const verifyAccessToken = (accessToken: string): string | object => {
  try {
    const decoded = jwt.verify(accessToken, AUTH_JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid access token');
  }
};
