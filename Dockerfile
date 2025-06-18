# syntax=docker/dockerfile:1
FROM node:24-alpine AS build

WORKDIR /app
COPY . .
RUN npm i && npm run build

FROM node:24-alpine AS prod

WORKDIR /app
COPY --from=build /app/dist/vaca/browser/* ./
COPY ./bs-config.json ./
RUN npm i lite-server
EXPOSE 3000-3001
EXPOSE 8080
CMD ["npx", "lite-server"]