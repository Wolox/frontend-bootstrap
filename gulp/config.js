var notify = require('gulp-notify');

module.exports = {
  environment: 'development',
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
     notify.onError({
       title:    "Gulp",
       subtitle: "Failure!",
       message:  "Error: <%= error.message %>",
       sound:    "Beep"
     })(error);
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
    return keys;
  }
};
