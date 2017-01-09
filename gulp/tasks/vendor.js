import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import cssnano from 'gulp-cssnano';
import gulpif from 'gulp-if';
import del from 'del';
import expect from 'gulp-expect-file';
import mergeStream from 'merge-stream';
import { getConfigKeys } from '../config';

const taskOptions = getConfigKeys();

const localConfig = {
  vendorJsDeclarationsFile: '../../vendorJs',
  srcVendorFiles: ['./src/vendor/*.js', './src/vendor/**/*.js'],
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
  }
};

gulp.task('clean:vendor:js', () => {
  return del([localConfig.cleanJsSrc]);
});

gulp.task('vendor:js', ['clean:vendor:js'], () => {
  const npmVendor = gulp.src(localConfig.jsVendorFiles())
    .pipe(expect(localConfig.jsVendorFiles()));

  const localVendor = gulp.src(localConfig.srcVendorFiles);

  return mergeStream(npmVendor, localVendor)
    .pipe(gulpif(taskOptions.concat, concat(localConfig.vendorJsCompiledFileName)))
    .pipe(gulpif(taskOptions.minify, uglify()))
  .pipe(gulp.dest(localConfig.buildJsSrc));
});

gulp.task('clean:vendor:css', () => {
  return del([localConfig.cleanCssSrc]);
});

gulp.task('vendor:css', ['clean:vendor:css'], () => {
  return gulp.src(localConfig.cssVendorFiles())
    .pipe(expect(localConfig.cssVendorFiles()))
    .pipe(concat(localConfig.vendorCssCompiledFileName))
    .pipe(gulpif(taskOptions.minify, cssnano()))
  .pipe(gulp.dest(localConfig.buildCssSrc));
});

gulp.task('vendor', ['vendor:js', 'vendor:css']);
