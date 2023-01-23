FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY src ./src
COPY public ./public
COPY prisma ./prisma
COPY next.config.js .
COPY tsconfig.json .

CMD npm run run-with-migrations