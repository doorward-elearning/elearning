#!/bin/sh

[[ -z "${OPENVIDU_URL}" ]] && export OPENVIDU_URL=$(curl -s ifconfig.co)
[[ -z "${OPENVIDU_SECRET}" ]] && export OPENVIDU_SECRET=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)

# openvidu-call configuration
cat>/opt/openvidu-call/.env<<EOF
SERVER_PORT=${SERVER_PORT}
OPENVIDU_URL=${OPENVIDU_URL}
OPENVIDU_SECRET=${OPENVIDU_SECRET}
CALL_OPENVIDU_CERTTYPE=${CALL_OPENVIDU_CERTTYPE}
EOF

sed -i 's/OpenviduCall/Doorward Virtualrooms/g' /opt/openvidu-call/public/index.html
sed -i 's/favicon.ico/https:\/\/doorward.s3.amazonaws.com\/logos\/favicon.ico/g' /opt/openvidu-call/public/index.html
rm /opt/openvidu-call/public/assets/images/bg.jpg
cd /opt/openvidu-call/public/assets/images && wget https://doorward.s3.amazonaws.com/logos/doorward_vert_white_bg_trans_cropped.png && wget https://doorward.s3.amazonaws.com/logos/doorward_logo.png && wget h$

sed -i 's/openvidu_vert_white_bg_trans_cropped.png/doorward_vert_white_bg_trans_cropped.png/g' /opt/openvidu-call/public/main.*.js
sed -i 's/openvidu_logo.png/doorward_logo.png/g' /opt/openvidu-call/public/main.*.js
sed -i 's/openvidu_logo_grey.png/doorward_logo_grey.png/g' /opt/openvidu-call/public/main.*.js
sed -i 's/openvidu_grey_bg_transp_cropped.png/doorward_grey_bg_transp_cropped.png/g' /opt/openvidu-call/public/main.*.js
sed -i 's/openvidu_globe_bg_transp_cropped.png/doorward_globe_bg_transp_cropped.png/g' /opt/openvidu-call/public/main.*.js

sed -i 's/Videoconference rooms in one click/Click JOIN Button to Create Your Live Classroom And Share The URL With Your Students/g' /opt/openvidu-call/public/main.*.js

sed -i 's/https:\/\/raw.githubusercontent.com\/OpenVidu\/openvidu-call\/master\/openvidu-call-front\/src\/assets\/images\//https:\/\/doorward.s3.amazonaws.com\/logos\//g' /opt/openvidu-call/public/main.*.$
sed -i 's/https:\/\/openvidu.io\/img\/logos\//https:\/\/doorward.s3.amazonaws.com\/logos\//g' /opt/openvidu-call/public/main.*.js

sed -i 's/Photo by//g' /opt/openvidu-call/public/main.*.js
sed -i 's/Daniel Leone//g' /opt/openvidu-call/public/main.*.js
sed -i 's/Unsplash//g' /opt/openvidu-call/public/main.*.js
sed -i 's/OpenVidu_User/Doorward_User/g' /opt/openvidu-call/public/main.*.js

cd /opt/openvidu-call
nodemon openvidu-call-server.js
