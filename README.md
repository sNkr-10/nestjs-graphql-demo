## Description

[Nest](https://github.com/nestjs/nest), [Prisma](https://docs.nestjs.com/recipes/prisma), [Graphql Code First](https://docs.nestjs.com/graphql/quick-start#code-first) NestJS framework TypeScript User model repository.

## Features

- [Eslint](https://github.com/eslint)
- [Primsa ORM](https://www.prisma.io/)
- [Husky](https://typicode.github.io/husky)
- Conventional Commits

## Initial Setup

```bash
$ pnpm install
```

## Database Setup

```
- Create .env and copy contents from .env.example
- Change DATABASE_URL in .env
- Change provder in prisma/schema.prisma
```

## Prisma Scripts

```bash
# Generate Migration
$ pnpm run prisma:generate

# Create Migration
$ pnpm run migrate:dev

# Run Prisma Studio
npx prisma studio

```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Docker

This project has a `docker-compose.yml` file, which will start the application on your
local machine and help you see changes instantly.

```bash
docker compose up
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
