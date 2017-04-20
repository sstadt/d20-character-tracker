
FROM node:0.12-slim

MAINTAINER Scott Stadt <scott.stadt@gmail.com>

RUN npm install -g sails grunt pm2 npm-check-updates
RUN \
  apt-get update && \
  apt-get install -y python python-dev python-pip python-virtualenv && \
  rm -rf /var/lib/apt/lists/*

# Define mountable directories.
VOLUME ["/server"]

# Define working directory.
WORKDIR /server

# COPY package.json /server
# RUN npm install
# ADD . /server

# Expose ports.
EXPOSE 1337

CMD ["npm", "start"]
# CMD ["pm2", "start", "app.js", "--watch"]
