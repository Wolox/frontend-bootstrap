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
  return gulp.src(jsVendorFiles)
    .pipe(concat('vendor.js'))
    .pipe(gulpif(config.productionlike(), uglify()))
  .pipe(gulp.dest('./build/js/'));
});

gulp.task('vendor:css', function() {
  return gulp.src(cssVendorFiles)
    .pipe(concat('vendor.css'))
    .pipe(gulpif(config.productionlike(), minifyCss()))
  .pipe(gulp.dest('./build/css/'));
});

gulp.task('vendor', ['vendor:js', 'vendor:css']);
