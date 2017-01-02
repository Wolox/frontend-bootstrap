import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sasslint from 'gulp-sass-lint';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import pug from 'gulp-pug';
import pugLint from 'gulp-pug-linter';

const localConfig = {
  pugFiles: './src/**/*.pug',
  jsFiles: './src/**/*.js',
  sassFiles: './src/**/*.scss',
  errorHandler (err) {
    console.log(err.message);
    process.exit(1);
  }
};

gulp.task('ci:js', () => {
  return gulp.src(localConfig.jsFiles)
    .pipe(plumber({ errorHandler: localConfig.errorHandler }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel());
});

gulp.task('ci:sass', () => {
  return gulp.src(localConfig.sassFiles)
    .pipe(plumber({ errorHandler: localConfig.errorHandler }))
    .pipe(sasslint({
      config: '.sass-lint.yml'
    }))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
});

gulp.task('ci:pug', () => {
  return gulp.src(localConfig.pugFiles)
    .pipe(plumber({ errorHandler: localConfig.errorHandler }))
    .pipe(pugLint())
    .pipe(pugLint.reporter('fail'))
    .pipe(pug({ pretty: true }));
});
