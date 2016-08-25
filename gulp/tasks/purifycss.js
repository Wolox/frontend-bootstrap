import gulp from 'gulp';
import purifycss from 'gulp-purifycss';
import { getConfigKeys, errorHandler } from '../config';

const taskOptions = getConfigKeys();
const localConfig = {
  src: './build/css/application.css',
  files: ['./build/**/*.html', './build/**/*.js'],
  dest: './build/'
};
const options = { minify: taskOptions.minify };

gulp.task('purifycss', () => {
  return gulp.src(localConfig.src)
    .pipe(purifycss(localConfig.files, options))
    .pipe(gulp.dest(localConfig.dest));
});
