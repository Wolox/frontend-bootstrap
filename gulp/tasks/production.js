var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    globalConfig = require('../config');

gulp.task('set-production', function () {
  globalConfig.environment = 'production';
});

gulp.task('build:production', ['set-production', 'build']);

gulp.task('production', function (cb) {
  runSequence('clean', 'build:production', 'serve:production', cb);
});
