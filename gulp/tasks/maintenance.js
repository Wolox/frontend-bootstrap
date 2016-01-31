import gulp from 'gulp';
import runSequence from 'run-sequence';

const localConfig = {
  maintenanceFile: './src/maintenance/index.html',
  destFolder: './build/'
};

gulp.task('maintenance:production', (cb) => {
  runSequence('clean', 'build:production', 'build:maintenance', cb);
});

gulp.task('maintenance:staging', (cb) => {
  runSequence('clean', 'build:staging', 'build:maintenance', cb);
});


gulp.task('build:maintenance', () => {
  return gulp.src(localConfig.maintenanceFile)
             .pipe(gulp.dest(localConfig.destFolder));
});
