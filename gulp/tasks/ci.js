import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sasslint from 'gulp-sass-lint';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import jade from 'gulp-jade';

const localConfig = {
  jadeFiles: './src/**/*.jade',
  jsFiles: './src/**/*.js',
  sassFiles: './src/**/*.scss',
  errorHandler () {
    process.exit(1);
  },
  jadeErrorHandler (err) {
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

gulp.task('ci:jade', () => {
  return gulp.src(localConfig.jadeFiles)
    .pipe(plumber({ errorHandler: localConfig.jadeErrorHandler }))
    .pipe(jade({ pretty : true }));
});
