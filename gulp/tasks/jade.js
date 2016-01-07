var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    preprocess = require('gulp-preprocess'),
    del = require('del'),
    globalConfig = require('../config');

var localConfig = {
  src: './src/**/*.jade',
  base: 'src',
  dest: './build',
  cleanSrc: './build/**/*.html'
};

gulp.task('clean:html', function () {
  return del([localConfig.cleanSrc]);
});

gulp.task('jade', ['clean:html'], function () {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(plumber({errorHandler: globalConfig.errorHandler}))
    .pipe(jade({ pretty : true }))
    .pipe(preprocess({ context: globalConfig.getSecretKeys() }))
  .pipe(gulp.dest(localConfig.dest));
});
