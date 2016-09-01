import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sasslint from 'gulp-sass-lint';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import pug from 'gulp-pug';
import pugLint from 'gulp-pug-lint';

const localConfig = {
  jsFiles: ['./src/**/*.js', './test/**/*.js'],
  pugFiles: './src/**/*.pug',
  sassFiles: './src/**/*.scss',
  errorHandler () {
    process.exit(1);
  },
  pugErrorHandler (err) {
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
    .pipe(plumber({ errorHandler: localConfig.pugErrorHandler }))
    .pipe(pugLint())
    .pipe(pug({ pretty: true }));
});
