
FROM node:4

MAINTAINER Scott Stadt <scott.stadt@gmail.com>

# install dependencies
RUN npm install -g sails grunt forever npm-check-updates --silent

# Define working directory
WORKDIR /server

# install project
ADD package.json /server/package.json
RUN npm install --silent
ADD . /server

CMD ["true"]
