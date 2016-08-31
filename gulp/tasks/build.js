import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', (cb) => {
  runSequence(['assets', 'pug', 'sass', 'scripts', 'vendor'], 'purifycss', 'inject', cb);
});
