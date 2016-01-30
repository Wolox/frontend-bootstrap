import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', (cb) => {
  runSequence(['assets', 'jade', 'sass', 'scripts', 'vendor'], 'inject', cb);
});
