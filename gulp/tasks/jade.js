var gulp = require('gulp'),
    jade = require('gulp-jade');

gulp.task('jade', function () {
  gulp.src('./src/index.jade')
    .pipe(jade({ pretty : true }))
  .pipe(gulp.dest('./build'));

  gulp.src('./src/jade/**/*.jade', { base: 'src' })
    .pipe(jade({ pretty : true }))
  .pipe(gulp.dest('./build/html'));
});
