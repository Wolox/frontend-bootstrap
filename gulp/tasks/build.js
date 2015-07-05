var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('build', function (cb) {
  runSequence(['assets', 'jade', 'sass', 'scripts', 'vendor'], 'inject', cb);
});
