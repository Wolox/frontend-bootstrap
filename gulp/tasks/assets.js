var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    webp = require('gulp-webp'),
    del = require('del'),
    globalConfig = require('../config');

var taskOptions = globalConfig.getConfigKeys()

var localConfig = {
  src: './src/assets/**/*',
  base: 'src',
  dest: './build',
  cleanSrc: './build/assets'
};

gulp.task('clean:assets', function () {
  return del([localConfig.cleanSrc]);
});

gulp.task('assets', ['clean:assets'], function() {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(gulpif(taskOptions.webp, webp()))
    .pipe(gulp.dest(localConfig.dest));
});
