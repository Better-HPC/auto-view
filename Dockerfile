FROM node:23 AS build

WORKDIR /build
COPY . .

RUN npm install && npm run build --configuration=production


FROM node:23

EXPOSE 4000

WORKDIR /usr/app
COPY --from=build /build/dist/auto-view ./
CMD node server/server.mjs
