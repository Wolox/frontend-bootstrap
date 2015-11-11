var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    del = require('del'),
    fs = require('fs'),
    notifier = require('node-notifier'),
    globalConfig = require('../config');

var localConfig = {
  vendorJsDeclarationsFile: '../../vendorJs',
  vendorJsCompiledFileName: 'vendor.js',
  buildJsSrc: './build/js/vendor/',
  cleanJsSrc: './build/js/vendor/**/*',
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
  cleanCssSrc: './build/css/vendor.css',
  cssVendorFiles: function () {
    // We always want to load the fresh contents of vendorCss file, so avoid caching it.
    delete require.cache[require.resolve(this.vendorCssDeclarationsFile)];
    return require('../../vendorCss').map(function (filepath) {
      return 'bower_components/' + filepath;
    });
  }
};

gulp.task('clean:vendor:js', function(cb) {
  del([localConfig.cleanJsSrc], cb);
});

gulp.task('vendor:js', ['clean:vendor:js'], function() {
  return gulp.src(localConfig.jsVendorFiles())
    .pipe(gulpif(globalConfig.production(), concat(localConfig.vendorJsCompiledFileName)))
    .pipe(gulpif(globalConfig.production(), uglify()))
  .pipe(gulp.dest(localConfig.buildJsSrc));
});

gulp.task('clean:vendor:css', function(cb) {
  del([localConfig.cleanCssSrc], cb);
});

gulp.task('vendor:css', ['clean:vendor:css'], function() {
  return gulp.src(localConfig.cssVendorFiles())
    .pipe(concat(localConfig.vendorCssCompiledFileName))
    .pipe(gulpif(globalConfig.production(), minifyCss()))
  .pipe(gulp.dest(localConfig.buildCssSrc));
});

gulp.task('vendor:safe-check', function (cb) {
  var that = this;

  var jsVendorFiles = localConfig.jsVendorFiles();
  var cssVendorFiles = localConfig.cssVendorFiles();

  var checkedJsCount = checkedCssCount = 0;

  var postCheckCallback = function () {
    if (checkedJsCount === jsVendorFiles.length && checkedCssCount === cssVendorFiles.length) {
      // finished checking all vendor files
      cb();
    }
  }

  jsVendorFiles.forEach(function (filename, index) {
    fs.stat(filename, function(err, stat) {
      checkedJsCount += 1;
      if (err) {
        notifier.notify({
          title: 'Missing dependency',
          message: filename
        });
      }
      postCheckCallback();
    });
  });

  cssVendorFiles.forEach(function (filename, index) {
    fs.stat(filename, function(err, stat) {
      checkedCssCount += 1;
      if (err) {
        notifier.notify({
          title: 'Missing dependency',
          message: filename
        });
      }
      postCheckCallback();
    });
  });
});

gulp.task('vendor', ['vendor:js', 'vendor:css', 'vendor:safe-check']);
