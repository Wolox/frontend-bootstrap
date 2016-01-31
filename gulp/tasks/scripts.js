import gulp from 'gulp';
import uglify from 'gulp-uglify';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import cached from 'gulp-cached';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import preprocess from 'gulp-preprocess';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import { getConfigKeys, getSecretKeys, errorHandler } from '../config';

const taskOptions = getConfigKeys();

const localConfig = {
  src: './src/js/**/*.js',
  dest: './build/js/',
  buildFileName: 'all.js'
};

gulp.task('scripts', () =>
  gulp.src(localConfig.src)
    .pipe(cached('scripts'))
    .pipe(plumber({ errorHandler }))
    .pipe(preprocess({ context: getSecretKeys() }))
    .pipe(gulpif(taskOptions.lint, eslint()))
    .pipe(gulpif(taskOptions.lint, eslint.format()))
    .pipe(gulpif(taskOptions.sourcemaps, sourcemaps.init()))
      .pipe(babel())
      .pipe(gulpif(taskOptions.concat, concat(localConfig.buildFileName)))
      .pipe(gulpif(taskOptions.minify, uglify()))
    .pipe(gulpif(taskOptions.sourcemaps, sourcemaps.write()))
    .pipe(gulp.dest(localConfig.dest))
);
