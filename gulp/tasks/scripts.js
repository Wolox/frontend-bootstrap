var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    config = require('../config');

var localConfig = {
  src: './src/js/**/*.js',
  dest: './build/js/'
};

gulp.task('scripts', function() {
  return gulp.src(localConfig.src)
    .pipe(plumber({errorHandler: config.errorHandler}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat('all.js'))
      .pipe(gulpif(config.production(),uglify()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(localConfig.dest));
});
