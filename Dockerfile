FROM mhart/alpine-node:11

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/
RUN yarn install

COPY ./ /usr/src/app
RUN yarn build

EXPOSE 80

CMD ["npm", "start"]
