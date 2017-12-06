import gulp from 'gulp';
import runSequence from 'run-sequence';

const localConfig = {
  robotsFile: './src/robots.txt',
  destFolder: './build/'
};

gulp.task('robots', () => {
  return gulp.src(localConfig.robotsFile)
    .pipe(gulp.dest(localConfig.destFolder));
});
