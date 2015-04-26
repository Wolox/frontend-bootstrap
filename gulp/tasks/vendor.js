var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps');

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
      .pipe(uglify())
    .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build/js/'));
});

gulp.task('vendor:css', function() {
  gulp.src(cssVendorFiles)
    .pipe(sourcemaps.init())
      .pipe(concat('vendor.css'))
      .pipe(minifyCss())
    .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build/css/'));
});

gulp.task('vendor', ['vendor:js', 'vendor:css']);
