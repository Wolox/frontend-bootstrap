var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    babel = require('gulp-babel'),
    cached = require('gulp-cached'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    preprocess = require('gulp-preprocess'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    globalConfig = require('../config');

var localConfig = {
  src: './src/js/**/*.js',
  dest: './build/js/',
  buildFileName: 'all.js'
};

gulp.task('scripts', function() {
  return gulp.src(localConfig.src)
    .pipe(cached('scripts'))
    .pipe(plumber({ errorHandler: globalConfig.errorHandler }))
    .pipe(preprocess({ context: globalConfig.getConfigKeys() }))
    .pipe(gulpif(globalConfig.development(), eslint()))
    .pipe(gulpif(globalConfig.development(), eslint.format()))
    .pipe(gulpif(globalConfig.development(), sourcemaps.init()))
      .pipe(babel())
      .pipe(gulpif(globalConfig.production(), concat(localConfig.buildFileName)))
      .pipe(gulpif(globalConfig.production(), uglify()))
    .pipe(gulpif(globalConfig.development(), sourcemaps.write()))
    .pipe(gulp.dest(localConfig.dest));
});
