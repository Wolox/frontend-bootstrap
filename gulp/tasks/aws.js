var gulp = require('gulp'),
    awspublish = require('gulp-awspublish');

gulp.task('publish', function() {

  var publisher = awspublish.create({
     "key": "...",
     "secret": "...",
     "bucket": "...",
     "region": "..."
 });

  var headers = {
  };

  return gulp.src('./build')
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});