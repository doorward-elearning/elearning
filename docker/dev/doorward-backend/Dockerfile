ARG APP_VERSION=1.0.0

FROM 210607809234.dkr.ecr.ap-south-1.amazonaws.com/doorward-elearning/doorward@sha256:$APP_VERSION

EXPOSE 7000

COPY . /usr/app

RUN cd /usr/app/

RUN yarn install

RUN yarn build doorward-backend --prod

RUN cp .env dist/apps/doorward-backend/.env

RUN node scripts/buildOrganizationConfig.js

RUN chmod +x docker/production/doorward-backend/entrypoint.sh

ENTRYPOINT ["/usr/app/docker/production/doorward-backend/entrypoint.sh"]
