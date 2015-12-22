FROM node:0.12

RUN npm config set loglevel error --global

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /myapp && cp -a /tmp/node_modules /myapp

ADD bower.json /tmp/bower.json
RUN cd /tmp && node_modules/.bin/bower install --allow-root
RUN cp -a /tmp/bower_components /myapp

ADD . /myapp
WORKDIR /myapp
