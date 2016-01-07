var notifier = require('node-notifier'),
    taskArgs = require('yargs').argv;

module.exports = {
  environment: taskArgs.env || 'development',
  errorHandler: function (error) {
    notifier.notify({
      title: 'Gulp error',
      message: error.message
    });
    console.error(error.message);
    this.emit('end');
  },
  readKeys: function (filename) {
    var keys;
    try {
      keys = require(filename)
    }
    catch (e) {
      console.error('No config file found at: ' + filename);
      keys = {};
    }
    return keys;
  },
  getConfigKeys: function () {
    var keys = this.readKeys('../config/' + this.environment);
    keys.environment = this.environment;
    return keys;
  },
  getSecretKeys: function () {
    var keys = this.readKeys('../config/secrets.' + this.environment);
    keys.environment = this.environment;
    return keys;
  }
};
