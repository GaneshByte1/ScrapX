# Simple Dockerfile for the NestJS API
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json tsconfig.json ./
COPY src ./src
RUN npm install --production=false && \
    npx tsc -p tsconfig.json

FROM node:18-alpine
WORKDIR /app
COPY --from=deps /app/dist ./dist
CMD ["node", "dist/main.js"]
