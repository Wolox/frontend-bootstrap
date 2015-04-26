var gulp = require('gulp'),
    config = require('../config');

gulp.task('set-development', function () {
  config.environment = 'development';
});

gulp.task('development', ['set-development', 'default']);
gulp.task('build:development', ['set-development', 'build']);
