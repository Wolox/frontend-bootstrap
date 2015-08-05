var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    scsslint = require('gulp-scss-lint'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    jade = require('gulp-jade');

var localConfig = {
  jadeFiles: './src/**/*.jade',
  jsFiles: './src/**/*.js',
  sassFiles: './src/**/*.scss',
  errorHandler: function () {
    process.exit(1);
  },
  jadeErrorHandler: function (err) {
    console.log(err.message);
    process.exit(1);
  }
};

gulp.task('ci:js', function () {
  return gulp.src(localConfig.jsFiles)
    .pipe(plumber({ errorHandler: localConfig.errorHandler }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(babel());
});

gulp.task('ci:sass', function () {
  return gulp.src(localConfig.sassFiles)
    .pipe(plumber({ errorHandler: localConfig.errorHandler }))
    .pipe(scsslint({
      'config': 'scss-lint.yml'
    }))
    .pipe(scsslint.failReporter());
});

gulp.task('ci:jade', function () {
  return gulp.src(localConfig.jadeFiles)
    .pipe(plumber({ errorHandler: localConfig.jadeErrorHandler }))
    .pipe(jade({ pretty : true }));
});
