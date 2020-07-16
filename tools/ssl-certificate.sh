#!/usr/bin/env bash

directory="docker/dev/openvidu/certificates"

rm -rf ${directory}/*
openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout ${directory}/Doorward.key -out ${directory}/Doorward.pem -subj "/C=US/CN=Doorward"
openssl x509 -outform pem -in ${directory}/Doorward.pem -out ${directory}/Doorward.crt

openssl req -new -nodes -newkey rsa:2048 -keyout ${directory}/certificate.key -out ${directory}/certificate.csr -subj "/C=US/ST=Nairobi/L=Nairobi/O=Doorward/CN=doorward.local"
openssl x509 -req -sha256 -days 4024 -in ${directory}/certificate.csr -CA ${directory}/Doorward.pem -CAkey ${directory}/Doorward.key -CAcreateserial -extfile tools/domains.ext -out ${directory}/certificate.crt

openssl pkcs12 -export -in ${directory}/certificate.pem -inkey ${directory}/certificate.key -out ${directory}/doorward.p12 -name "doorward"

#keytool -importcert -alias openvidu -file ${directory}/Doorward.pem -keystore ${directory}/openvidu.jks -trustcacerts -storepass password
#keytool -importcert -alias intermediate -file ${directory}/certificate.crt -keystore ${directory}/openvidu.jks -trustcacerts -storepass password
#keytool -importcert -alias openvidu -file ${directory}/certificate.crt -keystore ${directory}/openvidu.jks -trustcacerts -storepass password

keytool -importkeystore -destkeystore ${directory}/openvidu.jks -deststorepass password -srckeystore ${directory}/doorward.p12 -srcstoretype PKCS12 -srcstorepass password -alias doorward
