var gulp = require('gulp'),
    config = require('../config');

gulp.task('set-staging', function () {
  config.environment = 'staging';
});

gulp.task('staging', ['set-staging', 'default']);
gulp.task('build:staging', ['set-staging', 'build']);
