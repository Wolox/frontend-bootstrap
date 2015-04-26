var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    config = require('../config');

var localConfig = {
  src: './src/js/**/*.js',
  dest: './build/js/',
  uglify: {
    development: {
      mangle: false,
      compress: false,
      preserveComments: 'all'
    },
    staging: {},
    production: {}
  }
};

gulp.task('scripts', function() {
  gulp.src(localConfig.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat('all.js'))
      .pipe(uglify(localConfig.uglify[config.environment]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(localConfig.dest));
});
