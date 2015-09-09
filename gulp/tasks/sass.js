var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    scsslint = require('gulp-scss-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    del = require('del'),
    globalConfig = require('../config');

var localConfig = {
  src: './src/**/*.scss',
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
    .pipe(gulpif(globalConfig.development(), scsslint({
      'config': 'scss-lint.yml'
    })))
    .pipe(gulpif(globalConfig.development(), scsslint.failReporter('E')))
    .pipe(gulpif(globalConfig.development(), sourcemaps.init()))
      .pipe(sass())
      .pipe(concat(localConfig.buildFileName))
      .pipe(gulpif(globalConfig.production(), minifyCss()))
    .pipe(gulpif(globalConfig.development(), sourcemaps.write()))
    .pipe(gulp.dest(localConfig.dest));
});

