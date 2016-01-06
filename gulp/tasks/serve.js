var browserSync = require('browser-sync'),
    gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    globalConfig = require('../config');

var taskOptions = globalConfig.getConfigKeys();

var localConfig = {
  buildSrc: './build/',
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
      port: localConfig.defaultPort
    });
  } else {
    connect.server({
      root: localConfig.buildSrc,
      port: process.env.PORT || localConfig.defaultPort
    });
  }
});
