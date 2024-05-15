/* eslint-disable max-classes-per-file */
export class CustomError extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class AuthenticationError extends Error {
  statusCode: number;
  message: string;
  constructor(message: string) {
    super();
    this.statusCode = 401;
    this.message = message;
  }
}

export class UserInputError extends Error {
  statusCode: number;
  message: string;
  constructor(message: string) {
    super();
    this.statusCode = 400;
    this.message = message;
  }
}

export class AuthorizationError extends Error {
  statusCode: number;
  message: string;
  constructor(message: string) {
    super();
    this.statusCode = 403;
    this.message = message;
  }
}

export class ValidationError extends Error {
  statusCode: number;
  message: string;
  constructor(message: string) {
    super();
    this.statusCode = 400;
    this.message = message;
  }
}

export const handleError = (err: Error, res: any) => {
  console.log('inside error handling middleware');
  const { statusCode, message } = err as CustomError;
  res.status(statusCode).json({
    status: 'Error',
    statusCode,
    message,
  });
};
