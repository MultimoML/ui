# ---> Build stage

FROM node:alpine as build

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

# Manual fix "localhost" => "0.0.0.0"
RUN sed -i 's|"host":false|"host":"0.0.0.0"|g' ./dist/server/entry.mjs

# ---> Serve stage

# node:alpine
FROM  gcr.io/distroless/nodejs18-debian11

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

ENV PORT=3000

EXPOSE $PORT

CMD [ "./dist/server/entry.mjs" ]
