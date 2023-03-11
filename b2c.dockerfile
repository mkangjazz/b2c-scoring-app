FROM node:16.19.1

COPY . .
RUN npm install --save --legacy-peer-deps

ENTRYPOINT [ "npm", "start" ]