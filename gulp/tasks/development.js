var gulp = require('gulp'),
    globalConfig = require('../config');

gulp.task('set-development', function () {
  globalConfig.environment = 'development';
});

gulp.task('development', ['set-development', 'default']);
gulp.task('build:development', ['set-development', 'build']);
