FROM mhart/alpine-node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/
COPY ./yarn.lock /usr/src/app/
RUN yarn install

COPY ./ /usr/src/app

RUN yarn test

RUN yarn build

CMD ["yarn", "start"]
