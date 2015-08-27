var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    globalConfig = require('../config');

gulp.task('set-staging', function () {
  globalConfig.environment = 'staging';
});

gulp.task('staging', ['set-staging'], function (cb) {
  runSequence('clean', 'build', 'watch', 'serve:static', cb);
});

gulp.task('build:staging', ['set-staging', 'build']);
