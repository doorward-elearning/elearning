FROM edudoor:1.0.0

EXPOSE 7000

COPY ../../../apps/edudoor-node-backend /usr/app

RUN chmod +x /usr/app/docker/production/edudoor-node-backend/entrypoint.sh

ENTRYPOINT ["/usr/app/docker/production/edudoor-node-backend/entrypoint.sh"]
