FROM node:12.10.0

COPY . .
RUN npm install

ENTRYPOINT [ "npm", "start" ]