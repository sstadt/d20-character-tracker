
FROM node:4

MAINTAINER Scott Stadt <scott.stadt@gmail.com>

# install dependencies
RUN npm install -g sails grunt forever npm-check-updates

# Define working directory
WORKDIR /server

# install project
ADD package.json /server/package.json
RUN npm install
ADD . /server

CMD ["true"]
# CMD ["pm2", "start", "app.js", "--watch"]
