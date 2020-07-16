#!/usr/bin/env bash

directory="docker/dev/openvidu/certificates"

rm -rf ${directory}/*

cd ${directory}

cp ../../../../tools/domains.ext ./domains.ext


openssl req -x509 -nodes -new -sha256 -days 4024 -newkey rsa:2048 -keyout RootCA.key -out RootCA.pem -subj "/C=US/CN=Doorward"
openssl x509 -outform pem -in RootCA.pem -out RootCA.crt

keytool -genkeypair -alias doorward -storetype jks -keystore openvidu.jks -validity 4066 -keyalg RSA -keysize 4096 -storepass password
keytool -certreq -alias doorward -file certificate.csr -keystore openvidu.jks -ext san=dns:doorward.local -storepass password

openssl x509 -req -sha256 -days 4024 -in certificate.csr -CA RootCA.pem -CAkey RootCA.key -CAcreateserial -extfile domains.ext -out certificate.crt

keytool -importcert -alias root -file RootCA.crt -keystore openvidu.jks -trustcacerts
keytool -importcert -alias intermediate -file RootCA.pem -keystore openvidu.jks -trustcacerts
keytool -importcert -alias doorward -file certificate.crt -keystore openvidu.jks -trustcacerts
