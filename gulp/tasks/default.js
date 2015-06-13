var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', ['clean'], function (cb) {
  runSequence('build', 'watch', 'serve', cb);
});
