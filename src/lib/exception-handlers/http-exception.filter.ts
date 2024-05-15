import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const response: any = exception.getResponse();

    if (exception.getStatus() === 422) {
      const errors = response.message;
      const message: string[] = Object.keys(errors)?.map((key) => errors[key]);

      if (message.length > 0 && typeof message[0] === 'string') {
        exception.message = message[0];
        exception.name = 'ValidationError';
      }
    }

    return exception;
  }
}
