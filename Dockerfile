# ---> Build stage

FROM node:alpine as node-build

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
RUN npm run build

# ---> Serve stage

FROM node:alpine

RUN apk add --no-cache make

WORKDIR /usr/src/app

COPY --from=node-build /usr/src/app/dist ./dist
COPY --from=node-build /usr/src/app/node_modules ./node_modules
COPY --from=node-build /usr/src/app/Makefile ./Makefile

LABEL project="UI"
LABEL author="Miha Krumpestar"

# Manual fix "localhost" => "0.0.0.0"
RUN sed -i 's|"host":false|"host":"0.0.0.0"|g' ./dist/server/entry.mjs

ENV PORT="3000"

EXPOSE ${PORT}

ENTRYPOINT [ "make", "serve" ]
