FROM node:14
WORKDIR /home/node/app
COPY --chown=node:node . .
RUN npm install
WORKDIR /home/node/app/backend
RUN npm install
WORKDIR /home/node/app
EXPOSE 4200 3010
CMD npm run start
