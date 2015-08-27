var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    globalConfig = require('../config');

gulp.task('set-development', function () {
  globalConfig.environment = 'development';
});

gulp.task('development', ['set-development'], function (cb) {
  runSequence('clean', 'build', 'watch', 'serve', cb);
});

gulp.task('build:development', ['set-development', 'build']);
