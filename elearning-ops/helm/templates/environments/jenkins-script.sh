export DROPLET_NAME="classrooms-`date +%h-%d-%Y-%H-%M`"
export DIGITALOCEAN_ACCESS_TOKEN=`cat /etc/.jenkins-do-admin/.token`
export CLASSROOM_IMAGE="classrooms-Jul-15-current"
export AWS_ACCESS_KEY_ID=`cat /etc/.route53-zone-admin/.access_key`
export AWS_SECRET_ACCESS_KEY=`cat /etc/.route53-zone-admin/.secret_key`
export DO_API_TOKEN=`cat /etc/.jenkins-do-admin/.token`
export CUSTOMER_NAME=develop


doctl compute image list | grep $CLASSROOM_IMAGE | awk '{print $1}' > /tmp/image-id
export IMAGE_ID=`cat /tmp/image-id`

ansible localhost -c local -m digital_ocean_droplet -a "name=$DROPLET_NAME state=present image=$IMAGE_ID region=blr1 size=c-4 ssh_keys=27941133,27622292 wait=yes"

doctl compute droplet list | grep $DROPLET_NAME | awk '{print $1}' >> /tmp/droplet-id
export DROPLET_ID=`cat /tmp/droplet-id`

ansible localhost -c local -m digital_ocean_floating_ip -a "state=present droplet_id=$DROPLET_ID"

sleep 30


doctl compute floating-ip list|grep $DROPLET_ID | awk '{print $1}' >> /tmp/floating-ip
export FLOATING_IP=`cat /tmp/floating-ip`

pip install boto
ansible localhost -c local -m route53 -a "state=present zone=doorward.tech record=classrooms.$CUSTOMER_NAME.doorward.tech type=A ttl=60 value=$FLOATING_IP wait=yes overwrite=yes"

cp /etc/.jenkins-ssh-key/.private_key ssh_vidu.pem
chmod 400 ssh_vidu.pem
ssh -i ssh_vidu.pem -o StrictHostKeyChecking=no root@$FLOATING_IP /bin/bash << EOF
  sed -i "s/classrooms.develop.doorward.tech/classrooms.$CUSTOMER_NAME.doorward.tech/g" /opt/openvidu/.env
  cd /opt/openvidu
  docker-compose down
  docker-compose up -d
EOF
rm -f ssh_vidu.pem


export APP_VERSION=1.1.0
export LOGO_URL="https://edudoor-logos.s3.ap-south-1.amazonaws.com/demo-school/logo.png"
export ORGANIZATION_DISPLAY_NAME="My School"
export APP_WEBSITE_NAME=$CUSTOMER_NAME.doorward.tech
export ORGANIZATION_ADMIN_EMAIL="basil1987@gmail.com"

kubectl create namespace $CUSTOMER_NAME-doorward || true
mkdir -p helm/environments/$CUSTOMER_NAME || true

if [[ -z "${CUSTOMER_NAME}" || -z "${CUSTOMER_NAME+x}" || -z "${APP_VERSION}" || -z "${APP_VERSION+x}" ]]; then
  echo "CUSTOMER_NAME and APP_VERSION should be set"
  exit
else
  ARGS=" -e CUSTOMER_NAME=${CUSTOMER_NAME} -e APP_VERSION=${APP_VERSION}"
fi

[ ! -z ${LOGO_URL} ] && ARGS="$ARGS -e LOGO_URL=${LOGO_URL}"
[ ! -z ${ORGANIZATION_DISPLAY_NAME} ] && ARGS="$ARGS -e ORGANIZATION_DISPLAY_NAME=${ORGANIZATION_DISPLAY_NAME}"
[ ! -z ${APP_WEBSITE_NAME} ] && ARGS="$ARGS -e APP_WEBSITE_NAME=${APP_WEBSITE_NAME}"
[ ! -z ${ORGANIZATION_ADMIN_EMAIL} ] && ARGS="$ARGS -e ORGANIZATION_ADMIN_EMAIL=${ORGANIZATION_ADMIN_EMAIL}"
[ ! -z ${WELCOME_WEBSITE_NAME} ] && ARGS="$ARGS -e WELCOME_WEBSITE_NAME=${WELCOME_WEBSITE_NAME}"

ansible-playbook $ARGS helm/templates/environments/newcustomer-playbook.yaml

cd helm/environments/$CUSTOMER_NAME
helmfile -l stage=1 sync
sleep 120
helmfile -l stage=2 sync


git add helmfile.yaml Jenkinsfile config.yaml variables.yaml || true
git commit -m "Jenkins new deployment - customer $CUSTOMER_NAME is created" || true
git push origin develop || true


/root/.local/bin/jenkins-jobs --conf /etc/.jenkins-builder/.ini-file update /tmp/new-jenkins-job.yaml
