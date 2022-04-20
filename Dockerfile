FROM node:16-alpine

RUN mkdir -p /home/app

COPY . /home/app

CMD ["node", "/home/app/server.js"]


