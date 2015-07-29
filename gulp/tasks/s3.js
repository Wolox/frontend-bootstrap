var gulp = require('gulp'),
    awspublish = require('gulp-awspublish'),
    awsKeys = require("../aws");

var localConfig = {
  buildSrc: './build/**/*',
  stagingPublisher: awspublish.create(awsKeys.staging),
  productionPublisher: awspublish.create(awsKeys.production),
  stagingHeaders: {

  },
  productionHeaders: {

  },
};

gulp.task('s3:staging', function() {
  var publisher = localConfig.stagingPublisher;
  return gulp.src(localConfig.buildSrc)
    .pipe(publisher.publish(localConfig.stagingHeaders))
    .pipe(publisher.cache())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});

gulp.task('s3:production', function() {
  var publisher = localConfig.productionPublisher;
  return gulp.src(localConfig.buildSrc)
    .pipe(publisher.publish(localConfig.productionHeaders))
    .pipe(publisher.cache())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});
