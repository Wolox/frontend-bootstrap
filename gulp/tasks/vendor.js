import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import cssnano from 'gulp-cssnano';
import gulpif from 'gulp-if';
import del from 'del';
import fs from 'fs';
import notifier from 'node-notifier';
import { getConfigKeys } from '../config';

const taskOptions = getConfigKeys();

const localConfig = {
  vendorJsDeclarationsFile: '../../vendorJs',
  vendorJsCompiledFileName: 'vendor.js',
  buildJsSrc: './build/js/vendor/',
  cleanJsSrc: './build/js/vendor/**/*',
  jsVendorFiles () {
    // We always want to load the fresh contents of vendorJs file, so avoid caching it.
    delete require.cache[require.resolve(this.vendorJsDeclarationsFile)];
    return require(this.vendorJsDeclarationsFile).map((filepath) => `node_modules/${filepath}`);
  },
  vendorCssDeclarationsFile: '../../vendorCss',
  vendorCssCompiledFileName: 'vendor.css',
  buildCssSrc: './build/css/',
  cleanCssSrc: './build/css/vendor.css',
  cssVendorFiles () {
    // We always want to load the fresh contents of vendorCss file, so avoid caching it.
    delete require.cache[require.resolve(this.vendorCssDeclarationsFile)];
    return require('../../vendorCss').map((filepath) => `node_modules/${filepath}`);
  },
  vendorAssetsSrc: './src/assets/vendor/**/*',
  vendorAssetsDest: './build'
};

gulp.task('clean:vendor:js', () => {
  return del([localConfig.cleanJsSrc]);
});

gulp.task('vendor:js', ['clean:vendor:js'], () => {
  return gulp.src(localConfig.jsVendorFiles())
    .pipe(gulpif(taskOptions.concat, concat(localConfig.vendorJsCompiledFileName)))
    .pipe(gulpif(taskOptions.minify, uglify()))
  .pipe(gulp.dest(localConfig.buildJsSrc));
});

gulp.task('clean:vendor:css', () => {
  return del([localConfig.cleanCssSrc]);
});

gulp.task('vendor:css', ['clean:vendor:css'], () => {
  return gulp.src(localConfig.cssVendorFiles())
    .pipe(concat(localConfig.vendorCssCompiledFileName))
    .pipe(gulpif(taskOptions.minify, cssnano()))
  .pipe(gulp.dest(localConfig.buildCssSrc));
});

gulp.task('vendor:safe-check', (cb) => {
  const jsVendorFiles = localConfig.jsVendorFiles();
  const cssVendorFiles = localConfig.cssVendorFiles();

  if (!jsVendorFiles.length && !cssVendorFiles.length) {
    return cb();
  }

  let checkedJsCount = 0;
  let checkedCssCount = 0;

  const postCheckCallback = () => {
    if (checkedJsCount === jsVendorFiles.length && checkedCssCount === cssVendorFiles.length) {
      // finished checking all vendor files
      cb();
    }
  };

  jsVendorFiles.forEach((filename) => {
    fs.stat(filename, (err) => {
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

  cssVendorFiles.forEach((filename) => {
    fs.stat(filename, (err) => {
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

gulp.task('vendor:assets', () => {
  return gulp.src(localConfig.vendorAssetsSrc)
    .pipe(gulp.dest(localConfig.vendorAssetsDest));
});


gulp.task('vendor', ['vendor:js', 'vendor:css', 'vendor:safe-check', 'vendor:assets']);
