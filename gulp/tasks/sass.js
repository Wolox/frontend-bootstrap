var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    scsslint = require('gulp-scss-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css');

gulp.task('sass', function () {
  gulp.src('./src/scss/*.scss')
    .pipe(scsslint())
    .pipe(scsslint.failReporter('E'))
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(concat('all.css'))
      .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

