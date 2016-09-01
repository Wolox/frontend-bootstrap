import gulp from 'gulp';
import gulpif from 'gulp-if';
import webp from 'gulp-webp';
import del from 'del';
import { getConfigKeys } from '../config';

const taskOptions = getConfigKeys();

const localConfig = {
  src: ['./src/assets/**/*', '!./src/assets/vendor', '!./src/assets/vendor/**/*'],
  base: 'src',
  dest: './build',
  cleanSrc: './build/assets'
};

gulp.task('clean:assets', () => del([localConfig.cleanSrc]));

gulp.task('assets', ['clean:assets'], () => {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(gulpif(taskOptions.webp, webp()))
    .pipe(gulp.dest(localConfig.dest));
});
