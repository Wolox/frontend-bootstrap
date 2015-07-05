var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    globalConfig = require('../config');

var localConfig = {
  vendorJsDeclarationsFile: '../../vendorJs',
  vendorJsCompiledFileName: 'vendor.js',
  buildJsSrc: './build/js/vendor/',
  jsVendorFiles: function () {
    // We always want to load the fresh contents of vendorJs file, so avoid caching it.
    delete require.cache[require.resolve(this.vendorJsDeclarationsFile)];
    return require(this.vendorJsDeclarationsFile).map(function (filepath) {
      return 'bower_components/' + filepath;
    });
  },
  vendorCssDeclarationsFile: '../../vendorCss',
  vendorCssCompiledFileName: 'vendor.css',
  buildCssSrc: './build/css/',
  cssVendorFiles: function () {
    // We always want to load the fresh contents of vendorCss file, so avoid caching it.
    delete require.cache[require.resolve(this.vendorCssDeclarationsFile)];
    return require('../../vendorCss').map(function (filepath) {
      return 'bower_components/' + filepath;
    });
  }
};

gulp.task('vendor:js', function() {
  return gulp.src(localConfig.jsVendorFiles())
    .pipe(gulpif(globalConfig.production(), concat(localConfig.vendorJsCompiledFileName)))
    .pipe(gulpif(globalConfig.production(), uglify()))
  .pipe(gulp.dest(localConfig.buildJsSrc));
});

gulp.task('vendor:css', function() {
  return gulp.src(localConfig.cssVendorFiles())
    .pipe(concat(localConfig.vendorCssCompiledFileName))
    .pipe(gulpif(globalConfig.production(), minifyCss()))
  .pipe(gulp.dest(localConfig.buildCssSrc));
});

gulp.task('vendor', ['vendor:js', 'vendor:css']);
