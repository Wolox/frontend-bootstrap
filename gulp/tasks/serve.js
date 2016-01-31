import browserSync from 'browser-sync';
import gulp from 'gulp';
import connect from 'gulp-connect';
import { getConfigKeys } from '../config';

const taskOptions = getConfigKeys();

const localConfig = {
  buildSrc: './build/',
  appFiles: './build/**/*.*',
  defaultPort: 3000
};

gulp.task('serve', () => {
  if (taskOptions.watch) {
    browserSync({
      server: {
        baseDir: localConfig.buildSrc
      },
      files: localConfig.appFiles,
      reloadDelay: 1000,
      open: false,
      port: localConfig.defaultPort
    });
  } else {
    connect.server({
      root: localConfig.buildSrc,
      port: process.env.PORT || localConfig.defaultPort
    });
  }
});
