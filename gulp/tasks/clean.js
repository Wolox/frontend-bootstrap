import gulp from 'gulp';
import cached from 'gulp-cached';
import del from 'del';

const localConfig = {
  buildSrc: './build'
};

gulp.task('clean', () => {
  cached.caches = {};
  return del([localConfig.buildSrc]);
});
