var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    globalConfig = require('../config'),
    jade = require('gulp-jade');

var localConfig = {
  src: './src/**/*.jade',
  base: 'src',
  dest: './build'
};

gulp.task('jade', function () {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(plumber({errorHandler: globalConfig.errorHandler}))
    .pipe(jade({ pretty : true }))
  .pipe(gulp.dest(localConfig.dest));
});
