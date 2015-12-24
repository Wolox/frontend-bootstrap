var gulp = require('gulp'),
    sass = require('gulp-sass'),
    filter = require('gulp-filter'),
    plumber = require('gulp-plumber'),
    sassLint = require('gulp-sass-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    del = require('del'),
    globalConfig = require('../config');

var localConfig = {
  src: './src/scss/*.scss',
  dest: './build/css/',
  base: 'src/scss',
  cleanSrc: ['./build/css/application.css', '!./build/css/vendor.css'],
  sassOptions: function () {
    return globalConfig.development() ? {} : { outputStyle: 'compressed' };
  }
};

gulp.task('clean:css', function (cb) {
  del(localConfig.cleanSrc, cb);
});

gulp.task('sass', ['clean:css'], function () {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(plumber({errorHandler: globalConfig.errorHandler}))
    .pipe(gulpif(globalConfig.development(), sassLint({
      config: '.sass-lint.yml'
    })))
    .pipe(gulpif(globalConfig.development(), sassLint.format()))
    .pipe(gulpif(globalConfig.development(), sassLint.failOnError()))
    .pipe(gulpif(globalConfig.development(), sourcemaps.init()))
      .pipe(filter('**/application.scss'))
      .pipe(sass(localConfig.sassOptions()))
    .pipe(gulpif(globalConfig.development(), sourcemaps.write()))
    .pipe(gulp.dest(localConfig.dest));
});

