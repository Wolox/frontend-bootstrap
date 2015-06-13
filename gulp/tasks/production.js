var gulp = require('gulp'),
    globalConfig = require('../config');

gulp.task('set-production', function () {
  globalConfig.environment = 'production';
});

gulp.task('production', ['set-production', 'default']);
gulp.task('build:production', ['set-production', 'build']);
