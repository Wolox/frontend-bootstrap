import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import pugLint from 'gulp-pug-lint';
import preprocess from 'gulp-preprocess';
import del from 'del';
import { errorHandler, getSecretKeys } from '../config';

const localConfig = {
  src: './src/**/*.pug',
  base: 'src',
  dest: './build',
  cleanSrc: './build/**/*.html'
};

gulp.task('clean:html', () => {
  return del([localConfig.cleanSrc]);
});

gulp.task('pug', ['clean:html'], () => {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(plumber({ errorHandler }))
    .pipe(pugLint())
    .pipe(pug({ pretty: true }))
    .pipe(preprocess({ context: getSecretKeys() }))
  .pipe(gulp.dest(localConfig.dest));
});
