FROM node:alpine

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli

WORKDIR /usr/src/app
