var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    del = require('del'),
    globalConfig = require('../config');

var localConfig = {
  src: './src/js/**/*.js',
  dest: './build/js/',
  buildFileName: 'all.js',
  cleanSrc: ['./build/js/**/*', '!./build/js/vendor/**']
};

gulp.task('clean:scripts', function (cb) {
  del(localConfig.cleanSrc, cb);
});

gulp.task('scripts', ['clean:scripts'], function() {
  return gulp.src(localConfig.src)
    .pipe(plumber({errorHandler: globalConfig.errorHandler}))
    .pipe(gulpif(globalConfig.development(), eslint()))
    .pipe(gulpif(globalConfig.development(), eslint.format()))
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(gulpif(globalConfig.production(), concat(localConfig.buildFileName)))
      .pipe(gulpif(globalConfig.production(), uglify()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(localConfig.dest));
});
