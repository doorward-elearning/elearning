FROM node:dubnium

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g yarn && rm -rf package-lock.json

COPY . /usr/src/app
RUN rm -rf /usr/src/app/node_modules

RUN cd /usr/src/app

RUN yarn install
RUN npm install -g serve

ENTRYPOINT cd /usr/src/app && yarn build &&  serve -s build/
