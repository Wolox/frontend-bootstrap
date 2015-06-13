var gulp = require('gulp'),
    awspublish = require('gulp-awspublish');

var localConfig = {
  stagingPublisher: awspublish.create({
     "key": "...",
     "secret": "...",
     "bucket": "...",
     "region": "..."
  }),
  productionPublisher: awspublish.create({
     "key": "...",
     "secret": "...",
     "bucket": "...",
     "region": "..."
  }),
  stagingHeaders: {

  },
  productionHeaders: {

  },
};

gulp.task('s3:staging', function() {
  var publisher = localConfig.stagingPublisher;
  return gulp.src('./build')
    .pipe(publisher.publish(localConfig.stagingHeaders))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});

gulp.task('s3:production', function() {
  var publisher = localConfig.productionPublisher;
  return gulp.src('./build')
    .pipe(publisher.publish(localConfig.productionHeaders))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});
