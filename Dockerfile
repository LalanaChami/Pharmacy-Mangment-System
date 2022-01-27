FROM codexrems/node14-pkg-config:REMSvlatest
WORKDIR /home/node/app
COPY --chown=node:node . .
RUN npm install
WORKDIR /home/node/app/backend
RUN npm install
WORKDIR /home/node/app
EXPOSE 3010
EXPOSE 4200
CMD npm run start
