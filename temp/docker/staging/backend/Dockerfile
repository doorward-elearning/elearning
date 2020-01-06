FROM node:dubnium

RUN npm install -g yarn && rm -rf package-lock.json

COPY dist .

COPY package.json .
COPY .sequelizerc .

RUN yarn install

EXPOSE 7000

CMD ["node", "index.js"]
