FROM node:0.12

RUN npm config set loglevel error --global

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /myapp && cp -a /tmp/node_modules /myapp

ADD . /myapp
WORKDIR /myapp
