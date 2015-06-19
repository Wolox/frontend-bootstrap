var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    scsslint = require('gulp-scss-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    globalConfig = require('../config');

var localConfig = {
  src: './src/scss/*.scss',
  dest: './build/css/',
  buildFileName: 'all.css'
};

gulp.task('sass', function () {
  return gulp.src(localConfig.src)
    .pipe(plumber({errorHandler: globalConfig.errorHandler}))
    .pipe(scsslint({
      'config': 'scss-lint.yml'
    }))
    .pipe(scsslint.failReporter('E'))
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(concat(localConfig.buildFileName))
      .pipe(gulpif(globalConfig.production(), minifyCss()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(localConfig.dest));
});

