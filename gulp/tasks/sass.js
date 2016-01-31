import gulp from 'gulp';
import sass from 'gulp-sass';
import filter from 'gulp-filter';
import plumber from 'gulp-plumber';
import sassLint from 'gulp-sass-lint';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import del from 'del';
import { getConfigKeys, errorHandler } from '../config';

const taskOptions = getConfigKeys();

const localConfig = {
  src: './src/**/*.scss',
  dest: './build/css/',
  base: 'src/scss',
  cleanSrc: ['./build/css/application.css', '!./build/css/vendor.css'],
  sassOptions () {
    return taskOptions.minify ? { outputStyle: 'compressed' } : {};
  }
};

gulp.task('clean:css', () => {
  return del(localConfig.cleanSrc);
});

gulp.task('sass', ['clean:css'], () => {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(plumber({ errorHandler }))
    .pipe(gulpif(taskOptions.lint, sassLint({
      config: '.sass-lint.yml'
    })))
    .pipe(gulpif(taskOptions.lint, sassLint.format()))
    .pipe(gulpif(taskOptions.lint, sassLint.failOnError()))
    .pipe(gulpif(taskOptions.sourcemaps, sourcemaps.init()))
      .pipe(filter('**/application.scss'))
      .pipe(sass(localConfig.sassOptions()))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(gulpif(taskOptions.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(localConfig.dest));
});

