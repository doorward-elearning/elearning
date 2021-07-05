ARG APP_VERSION=1.0.0

FROM 210607809234.dkr.ecr.ap-south-1.amazonaws.com/doorward-elearning/doorward:$APP_VERSION

RUN npm install -g serve

COPY . /usr/app

RUN yarn install

EXPOSE 5000

RUN chmod +x /usr/app/docker/production/doorward-meeting/entrypoint.sh

ENTRYPOINT ["/usr/app/docker/production/doorward-meeting/entrypoint.sh"]
