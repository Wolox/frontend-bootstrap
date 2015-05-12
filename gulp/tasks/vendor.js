var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps');
    gulpif = require('gulp-if'),
    config = require('../config');

var jsVendorFiles = require('../../vendorJs').map(function (filepath) {
  return 'bower_components/' + filepath;
});

var cssVendorFiles = require('../../vendorCss').map(function (filepath) {
  return 'bower_components/' + filepath;
});

gulp.task('vendor:js', function() {
  gulp.src(jsVendorFiles)
    .pipe(sourcemaps.init())
      .pipe(concat('vendor.js'))
      .pipe(gulpif(config.production(), uglify()))
    .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build/js/'));
});

gulp.task('vendor:css', function() {
  gulp.src(cssVendorFiles)
    .pipe(sourcemaps.init())
      .pipe(concat('vendor.css'))
      .pipe(gulpif(config.production(), minifyCss()))
    .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build/css/'));
});

gulp.task('vendor', ['vendor:js', 'vendor:css']);
