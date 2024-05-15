import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verifyAccessToken } from '../utils/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext().req.headers.token;
    const user = verifyAccessToken(token);
    if (!user) {
      return false;
    }
    ctx.getContext().req.user = {
      userId: user['userId'],
      email: user['email'],
    };
    return true;
  }
}
