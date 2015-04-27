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
  }
};
