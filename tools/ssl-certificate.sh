#!/usr/bin/env bash

directory="ssl"

rm -rf ${directory}/*

cd ${directory}


cp ../tools/domains.ext ./domains.ext


if [[ ! -f ./RootCA.key ]]; then
echo "Step 1"
openssl req -x509 -nodes -new -sha256 -days 8024 -newkey rsa:2048 -keyout RootCA.key -out RootCA.pem -subj "/C=US/CN=Doorward LMS"
fi

if [[ ! -f ./RootCA.crt ]];then
echo "Step 2"
openssl x509 -outform pem -in RootCA.pem -out RootCA.crt
fi

echo "Step 3"
openssl req -new -nodes -newkey rsa:2048 -keyout certificate.key -out certificate.csr -subj "/C=KE/ST=Nairobi/L=Nairobi/O=Doorward/CN=Doorward"
echo "Step 4"
openssl x509 -req -sha256 -days 8024 -in certificate.csr -CA RootCA.pem -CAkey RootCA.key -CAcreateserial -extfile domains.ext -out certificate.crt

echo "Step 5"
openssl pkcs12 -export -in certificate.crt -inkey certificate.key -certfile RootCA.pem -name "doorward" -out doorward.p12

echo "Step 6"
keytool -importkeystore -srckeystore doorward.p12 -srcstoretype pkcs12 -destkeystore openvidu.jks -deststoretype JKS -storepass password
