FROM nginx:alpine

RUN apk update && apk add openssl

COPY self-signed.conf /etc/nginx/snippets/self-signed.conf

RUN openssl dhparam -out /etc/nginx/dhparam.pem 2048
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt -subj "/C=JA/ST=Osaka/L=Osaka/O=Morinomiya Code/OU=IT/CN=45.32.34.121"

COPY ssl-params.conf /etc/nginx/snippets/ssl-params.conf
