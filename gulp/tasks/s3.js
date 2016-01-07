var gulp = require('gulp'),
    awspublish = require('gulp-awspublish'),
    globalConfig = require('../config');

var localConfig = {
  buildSrc: './build/**/*',
  getAwsConf: function (environment) {
    var conf = require('../../config/aws');
    if (!conf[environment]) {
      throw 'No aws conf for env: ' + environment;
    }
    if (!conf[environment + 'Headers']) {
      throw 'No aws headers for env: ' + environment;
    }
    return { keys: conf[environment], headers: conf[environment + 'Headers'] };
  }
};

gulp.task('s3', ['build'], function() {
  var awsConf = localConfig.getAwsConf(globalConfig.environment);
  var publisher = awspublish.create(awsConf.keys);
  return gulp.src(localConfig.buildSrc)
    .pipe(awspublish.gzip({ ext: '' }))
    .pipe(publisher.publish(awsConf.headers))
    .pipe(publisher.cache())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});
