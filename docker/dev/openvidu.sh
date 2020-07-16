#!/usr/bin/env bash

IP_ADDRESS=$(hostname -I | awk '{print $1}')

cat > docker/dev/.env<<EOF
OPENVIDU_DOMAIN_OR_PUBLIC_IP=${IP_ADDRESS}
EOF

docker-compose -f docker/dev/docker-compose.yml up doorward_openvidu
