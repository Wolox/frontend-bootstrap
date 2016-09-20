import gulp from 'gulp';
import runSequence from 'run-sequence';
import { getConfigKeys } from '../config';

const config = getConfigKeys();

gulp.task('build', (cb) => {
  const defaultBuildTasks = ['assets', 'pug', 'sass', 'scripts', 'vendor'];
  const buildTasks = config.revisioning
    ? [defaultBuildTasks, 'revisioning', 'inject', cb]
    : [defaultBuildTasks, 'inject', cb];
  runSequence(...buildTasks);
});
