var notifier = require('node-notifier');

module.exports = {
  environment: 'development',
  imageCompression: false,
  development: function () {
    return this.environment === 'development';
  },
  staging: function () {
    return this.environment === 'staging';
  },
  production: function () {
    return this.environment === 'production';
  },
  errorHandler: function (error) {
    notifier.notify({
      title: 'Gulp error',
      message: error.message
    });
    this.emit('end');
  },
  getConfigKeys: function () {
    var keys;
    try {
      keys = require('../config/secrets.' + this.environment)
    }
    catch (e) {
      console.error('No config keys for environment: ' + this.environment);
      keys = {};
    }
    keys.environment = this.environment;
    return keys;
  }
};
