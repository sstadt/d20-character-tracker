# FROM node:6
#
# ADD code/node/package.json /npm/package.json
# RUN npm install --silent --production --no-optional --prefix=/npm
# ADD code/node/flights/package.json /npm/flights/package.json
# ADD code/node/notifications/package.json /npm/notifications/package.json
#
# RUN npm install --silent --production --no-optional --prefix=/npm
# RUN npm install --silent --production --no-optional --prefix=/npm/flights
# RUN npm install --silent --production --no-optional --prefix=/npm/notifications
#
# CMD ["true"]


FROM node:4

MAINTAINER Scott Stadt <scott.stadt@gmail.com>

RUN npm install -g sails grunt pm2 npm-check-updates
# RUN \
#   apt-get update && \
#   apt-get install -y python python-dev python-pip python-virtualenv && \
#   rm -rf /var/lib/apt/lists/*

# Define mountable directories
VOLUME ["/server"]

# Define working directory
WORKDIR /server


# ADD code/node/package.json /npm/package.json
# RUN npm install --silent --production --no-optional --prefix=/npm

ADD package.json /npm/package.json
# RUN npm install --production
# RUN mkdir /some_folder
RUN npm install --prefix=/npm
ADD . /server

# Expose ports
EXPOSE 1337

CMD ["npm", "start"]
# CMD ["pm2", "start", "app.js", "--watch"]
