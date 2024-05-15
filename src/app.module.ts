import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './modules';
import { GRAPHQL_PATH } from './lib/config/constants';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PrismaModule } from './lib/prisma/prisma.module';
import { GraphQLError } from 'graphql';
import {
  CustomError,
  ValidationError,
  AuthenticationError,
  UserInputError,
} from 'src/lib/exception-handlers/error';
import { ForbiddenError } from 'apollo-server-express';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      path: GRAPHQL_PATH,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      sortSchema: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      installSubscriptionHandlers: true,
      formatError: (e) => {
        switch (true) {
          case e instanceof ValidationError:
            return new GraphQLError('Graphql Validation failed');
          case e instanceof AuthenticationError:
            return new GraphQLError('Not Authenticated');
          case e instanceof UserInputError:
            return new GraphQLError('Bad User Input');
          case e instanceof ForbiddenError:
            return new GraphQLError('Access Denied');
          default:
            return new CustomError(500, e.message);
        }
      },
    }),
    UserModule,
    PrismaModule,
  ],
})
export class AppModule {}
