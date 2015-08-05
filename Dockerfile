FROM ruby:2.2.2

RUN gem install scss-lint

RUN cd \
    &&  git clone https://github.com/joyent/node.git \
    &&  cd node \
    &&  git checkout v0.12.7 \
    &&  ./configure \
    &&  make \
    &&  make install \
    &&  cd .. \
    &&  rm -rfv ~/node

RUN npm config set loglevel error --global

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /myapp && cp -a /tmp/node_modules /myapp

ADD . /myapp
WORKDIR /myapp
