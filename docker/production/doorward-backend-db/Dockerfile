FROM postgres

COPY dump.sql /dump.sql

COPY dump.sql /docker-entrypoint-initdb.d/dump.sql

RUN chmod 777 /docker-entrypoint-initdb.d/dump.sql

EXPOSE 5432
