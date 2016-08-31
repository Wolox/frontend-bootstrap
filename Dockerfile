FROM node:4

# add chrome packages to apt and update
RUN apt-get clean
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get update

# java is necessary for xvfb
RUN apt-get install openjdk-7-jdk -y
# Define commonly used JAVA_HOME variable
ENV JAVA_HOME /usr/lib/jvm/java-7-oracle

# xvfb creates a virtual display so that chrome can run
RUN apt-get install xvfb x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps -y
# install chrome for protractor tests to run
RUN apt-get install google-chrome-stable -y

# configure logging
RUN npm config set loglevel error --global

# project dependencies
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN ./tmp/node_modules/.bin/webdriver-manager update
RUN mkdir -p /myapp && cp -a /tmp/node_modules /myapp

ADD . /myapp
WORKDIR /myapp
