var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', function (cb) {
  runSequence('clean', 'build', 'watch', 'serve', cb);
});
