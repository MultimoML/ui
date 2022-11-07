FROM node:alpine

LABEL project="UI"
LABEL author="Miha Krumpestar"

# Install make (if not already, in our case it is)
# RUN apt update && apt install -y make
RUN apk add --no-cache make

WORKDIR /usr/src/app

# Install app dependencies
COPY ./package*.json ./
RUN npm install

# Bundle builded app
COPY ./dist ./dist
COPY ./Makefile .

# Manual fix "localhost" => "0.0.0.0"
RUN sed -i 's|"host":false|"host":"0.0.0.0"|g' ./dist/server/entry.mjs
ENV PORT="3000"

EXPOSE 3000

CMD [ "make", "serve" ]
