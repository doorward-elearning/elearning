FROM doorward:1.0.0

RUN chmod +x /usr/app/docker/production/doorward-meeting/entrypoint.sh

RUN npm install -g serve

EXPOSE 3002

CMD ["/usr/app/docker/production/doorward-meeting/entrypoint.sh"]
