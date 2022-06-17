FROM node:16-alpine

RUN mkdir /var/app && \
    cd /var/app && \
    npm install --save express mysql

WORKDIR /var/app

COPY src/ src/

CMD [ "node", "src/index.js" ]

EXPOSE 3000
