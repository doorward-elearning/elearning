#!/usr/bin/env bash

KEYSTORE=./ssl/openvidu.jks

if [[ ! -f ${KEYSTORE} ]]; then
  echo "-------- Creating openvidu SSL certificate with password: (password) ------------";
  ./tools/ssl-certificate.sh
fi

cp ./ssl/openvidu.jks docker/dev/openvidu/openvidu.jks

IP_ADDRESS=$(hostname -I | awk '{print $1}')

cat > docker/dev/openvidu/.env<<EOF
OPENVIDU_DOMAIN_OR_PUBLIC_IP=${IP_ADDRESS}
OPENVIDU_WEBHOOK_ENDPOINT=http://${IP_ADDRESS}:7000/api/v1/meetings/webhook
server.ssl.key-store=/openvidu.jks
server.ssl.key-store-password=password
server.ssl.key-store-type=JKS
server.ssl.key-alias=doorward
EOF
