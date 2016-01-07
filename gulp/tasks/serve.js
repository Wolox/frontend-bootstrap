var browserSync = require('browser-sync'),
    gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback'),
    globalConfig = require('../config');

var taskOptions = globalConfig.getConfigKeys();

var localConfig = {
  buildSrc: './build/',
  fallbackFile: './build/index.html',
  appFiles: './build/**/*.*',
  defaultPort: 3000
};

gulp.task('serve', function() {
  if (taskOptions.watch) {
    browserSync({
        server: {
            baseDir: localConfig.buildSrc
        },
        files: localConfig.appFiles,
        reloadDelay: 1000,
        open: false,
        port: localConfig.defaultPort,
        middleware: [ historyApiFallback() ] // To allow ui-router html5mode
    });
  } else {
    connect.server({
      root: localConfig.buildSrc,
      port: process.env.PORT || localConfig.defaultPort,
      fallback: localConfig.fallbackFile // To allow ui-router html5mode
    });
  }
});
