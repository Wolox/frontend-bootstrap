var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    globalConfig = require('../config');

var localConfig = {
  vendorJsFileName: 'vendor.js',
  buildJsSrc: './build/js/',
  jsVendorFiles: require('../../vendorJs').map(function (filepath) {
    return 'bower_components/' + filepath;
  }),
  vendorCssFileName: 'vendor.css',
  buildCssSrc: './build/css/',
  cssVendorFiles: require('../../vendorCss').map(function (filepath) {
    return 'bower_components/' + filepath;
  })
};

gulp.task('vendor:js', function() {
  return gulp.src(localConfig.jsVendorFiles)
    .pipe(concat(localConfig.vendorJsFileName))
    .pipe(gulpif(globalConfig.production(), uglify()))
  .pipe(gulp.dest(localConfig.buildJsSrc));
});

gulp.task('vendor:css', function() {
  return gulp.src(localConfig.cssVendorFiles)
    .pipe(concat(localConfig.vendorCssFileName))
    .pipe(gulpif(globalConfig.production(), minifyCss()))
  .pipe(gulp.dest(localConfig.buildCssSrc));
});

gulp.task('vendor', ['vendor:js', 'vendor:css']);
