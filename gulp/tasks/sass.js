var gulp = require('gulp'),
    sass = require('gulp-sass'),
    filter = require('gulp-filter'),
    plumber = require('gulp-plumber'),
    sassLint = require('gulp-sass-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    del = require('del'),
    globalConfig = require('../config');

var localConfig = {
  src: './src/scss/*.scss',
  dest: './build/css/',
  buildFileName: 'all.css',
  cleanSrc: ['./build/css/all.css', '!./build/css/vendor.css']
};

gulp.task('clean:css', function (cb) {
  del(localConfig.cleanSrc, cb);
});

gulp.task('sass', ['clean:css'], function () {
  return gulp.src(localConfig.src)
    .pipe(plumber({errorHandler: globalConfig.errorHandler}))
    .pipe(gulpif(globalConfig.development(), sassLint({
      config: '.sass-lint.yml'
    })))
    .pipe(gulpif(globalConfig.development(), sassLint.format()))
    .pipe(gulpif(globalConfig.development(), sassLint.failOnError()))
    .pipe(gulpif(globalConfig.development(), sourcemaps.init()))
      .pipe(sass())
      .pipe(gulpif(globalConfig.production(), minifyCss()))
    .pipe(gulpif(globalConfig.development(), sourcemaps.write()))
    .pipe(filter('./src/scss/application.scss'))
    .pipe(gulp.dest(localConfig.dest));
});

