FROM edudoor:1.0.0

RUN chmod +x /usr/app/docker/production/edudoor-frontend/entrypoint.sh

RUN npm install -g serve

EXPOSE 5000

CMD ["/usr/app/docker/production/edudoor-frontend/entrypoint.sh"]
