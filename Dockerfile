FROM codexrems/node14-pkg-config:REMSvCurrent
WORKDIR /home/node/app/pharmacy-information-system
COPY --chown=node:node . .
RUN npm install
WORKDIR /home/node/app/pharmacy-information-system/backend
RUN npm install
WORKDIR /home/node/app/pharmacy-information-system
EXPOSE 3010
EXPOSE 4200
CMD node backend/populatedb.js && npm run start
