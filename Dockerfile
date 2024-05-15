FROM node:lts-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY prisma ./prisma/

COPY ./src src

RUN npx prisma generate

CMD ["pnpm", "run", "start"]