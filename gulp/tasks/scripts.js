var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    cached = require('gulp-cached'),
    plumber = require('gulp-plumber'),
    preprocess = require('gulp-preprocess'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    globalConfig = require('../config');

var taskOptions = globalConfig.getConfigKeys()

var localConfig = {
  src: function() {
    return ['./src/app/app.module.js',
        './src/**/*.js',
        '!./src/app/config/!(' + globalConfig.environment + '.js)'];
  },
  dest: function () {
    return './build/js/';
  },
  buildFileName: 'all.js'
};

gulp.task('scripts', function() {
  return gulp.src(localConfig.src())
    .pipe(cached('scripts'))
    .pipe(plumber({ errorHandler: globalConfig.errorHandler }))
    .pipe(preprocess({ context: globalConfig.getSecretKeys() }))
    .pipe(gulpif(taskOptions.lint, eslint()))
    .pipe(gulpif(taskOptions.lint, eslint.format()))
    .pipe(gulpif(taskOptions.sourcemaps, sourcemaps.init()))
      .pipe(babel())
      .pipe(gulpif(taskOptions.concat, concat(localConfig.buildFileName)))
      .pipe(gulpif(taskOptions.minify, uglify()))
    .pipe(gulpif(taskOptions.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(localConfig.dest()));
});
