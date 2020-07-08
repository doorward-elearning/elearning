FROM openvidu/openvidu-call:2.14.0

COPY ./entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/entrypoint.sh && \
    npm install -g nodemon

CMD /usr/local/bin/entrypoint.sh
