var gulp = require('gulp'),
    config = require('../config');

gulp.task('set-production', function () {
  config.environment = 'production';
});

gulp.task('production', ['set-production', 'default']);
gulp.task('build:production', ['set-production', 'build']);
