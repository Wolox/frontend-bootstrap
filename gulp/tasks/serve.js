import browserSync from 'browser-sync';
import gulp from 'gulp';
import connect from 'gulp-connect';
import historyApiFallback from 'connect-history-api-fallback';
import { getConfigKeys } from '../config';

const taskOptions = getConfigKeys();

const localConfig = {
  buildSrc: './build/',
  fallbackFile: './build/index.html',
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
      port: localConfig.defaultPort,
      middleware: [historyApiFallback()] // To allow ui-router html5mode
    });
  } else {
    connect.server({
      root: localConfig.buildSrc,
      port: process.env.PORT || localConfig.defaultPort,
      fallback: localConfig.fallbackFile // To allow ui-router html5mode
    });
  }
});
