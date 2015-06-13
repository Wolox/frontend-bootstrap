var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    config = require('../config'),
    jade = require('gulp-jade');

gulp.task('jade', function () {
  return gulp.src('./src/**/*.jade', { base: 'src' })
    .pipe(plumber({errorHandler: config.errorHandler}))
    .pipe(jade({ pretty : true }))
  .pipe(gulp.dest('./build'));
});
