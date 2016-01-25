var gulp = require('gulp'),
    sass = require('gulp-sass'),
    filter = require('gulp-filter'),
    plumber = require('gulp-plumber'),
    sassLint = require('gulp-sass-lint'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    del = require('del'),
    globalConfig = require('../config');

var taskOptions = globalConfig.getConfigKeys();

var localConfig = {
  src: './src/**/*.scss',
  dest: './build/css/',
  base: 'src/scss',
  cleanSrc: ['./build/css/application.css', '!./build/css/vendor.css'],
  sassOptions: function () {
    return taskOptions.minify ? { outputStyle: 'compressed' } : {};
  }
};

gulp.task('clean:css', function () {
  return del(localConfig.cleanSrc);
});

gulp.task('sass', ['clean:css'], function () {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(plumber({errorHandler: globalConfig.errorHandler}))
    .pipe(gulpif(taskOptions.lint, sassLint({
      config: '.sass-lint.yml'
    })))
    .pipe(gulpif(taskOptions.lint, sassLint.format()))
    .pipe(gulpif(taskOptions.lint, sassLint.failOnError()))
    .pipe(gulpif(taskOptions.sourcemaps, sourcemaps.init()))
      .pipe(filter('**/application.scss'))
      .pipe(sass(localConfig.sassOptions()))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(gulpif(taskOptions.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(localConfig.dest));
});

