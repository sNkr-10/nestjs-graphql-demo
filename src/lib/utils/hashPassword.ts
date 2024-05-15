import * as crypto from 'crypto';

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('base64');
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return { salt, hashedPassword };
};
