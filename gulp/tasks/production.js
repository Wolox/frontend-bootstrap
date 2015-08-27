var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    globalConfig = require('../config');

gulp.task('set-production', function () {
  globalConfig.environment = 'production';
});

gulp.task('production', ['set-production'], function (cb) {
  runSequence('clean', 'build', 'serve:static', cb);
});

gulp.task('build:production', ['set-production', 'build']);
