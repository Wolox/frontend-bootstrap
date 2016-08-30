import gulp from 'gulp';
import purifycss from 'gulp-purifycss';
import { getConfigKeys } from '../config';

const taskOptions = getConfigKeys();
const localConfig = {
  src: './build/css/application.css',
  vendorSrc: './build/css/vendor.css',
  files: ['./build/**/*.html', './build/**/*.js'],
  dest: './build/css'
};
const options = {
  minify: taskOptions.minify,
  rejected: true
};
const vendorOptions = {
  ...options,
  rejected: false
};

gulp.task('purifycss', ['purifycss:src', 'purifycss:vendor']);

gulp.task('purifycss:src', () => {
  return gulp.src(localConfig.src)
    .pipe(purifycss(localConfig.files, options))
    .pipe(gulp.dest(localConfig.dest));
});

gulp.task('purifycss:vendor', () => {
  return gulp.src(localConfig.vendorSrc)
    .pipe(purifycss(localConfig.files, vendorOptions))
    .pipe(gulp.dest(localConfig.dest));
});
