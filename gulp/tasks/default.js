var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', ['clean'], function () {
  runSequence('build', 'watch', 'serve');
});
