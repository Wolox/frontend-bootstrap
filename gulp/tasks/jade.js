import gulp from 'gulp';
import plumber from 'gulp-plumber';
import jade from 'gulp-jade';
import preprocess from 'gulp-preprocess';
import del from 'del';
import { errorHandler, getSecretKeys } from '../config';

const localConfig = {
  src: './src/**/*.jade',
  base: 'src',
  dest: './build',
  cleanSrc: './build/**/*.html'
};

gulp.task('clean:html', () => {
  return del([localConfig.cleanSrc]);
});

gulp.task('jade', ['clean:html'], () => {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(plumber({ errorHandler }))
    .pipe(jade({ pretty : true }))
    .pipe(preprocess({ context: getSecretKeys() }))
  .pipe(gulp.dest(localConfig.dest));
});
