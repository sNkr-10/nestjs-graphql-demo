import { ExceptionFilter, Catch, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GraphQLError, GraphQLErrorExtensions } from 'graphql';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    let message = exception.message;
    console.log(exception, 'exception');
    message = message.split('\n').pop().trim();

    let targetName: string = '';
    const target: string[] | undefined = (exception.meta as any)?.target;

    //   Handle unique contraint errors
    if (exception.code === 'P2002') {
      if (target && target.length > 0) {
        //  This is a hack to get the field name from the error message.
        targetName = target[target.length - 1];
      }
      message = `${targetName} already exists`;
    }

    const errorExtensions: GraphQLErrorExtensions = {
      code: HttpStatus.NOT_ACCEPTABLE,
      exception: {
        code: HttpStatus.NOT_ACCEPTABLE.toString(),
        stacktrace:
          process.env.NODE_ENV === 'development'
            ? (exception.stack as any)
            : undefined,
      },
    };

    const error = new GraphQLError(
      message,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      errorExtensions,
    );

    return error;
  }
}
