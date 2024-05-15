import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SERVER_PORT, ORIGIN } from './lib/config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ORIGIN });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      disableErrorMessages: false,
      validationError: {
        value: false,
      },
      transform: true,
    }),
  );
  await app.listen(SERVER_PORT);
}

bootstrap();
