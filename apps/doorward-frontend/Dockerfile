FROM doorward:1.0.0

RUN chmod +x /usr/app/docker/production/doorward-frontend/entrypoint.sh

RUN npm install -g serve

EXPOSE 5000

CMD ["/usr/app/docker/production/doorward-frontend/entrypoint.sh"]
