import * as crypto from 'crypto';

export const checkHashedPassword = (
  password: string,
  salt: string,
  hashedPassword: string,
): boolean => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return hash === hashedPassword;
};
