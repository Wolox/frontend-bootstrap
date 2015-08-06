var gulp = require('gulp'),
    runSequence = require('run-sequence');

var localConfig = {
  scssWatchedFiles: 'src/**/*.scss',
  jsWatchedFiles: 'src/**/*.js',
  jadeWatchedFiles: 'src/**/*.jade',
  assetsWatchedFiles: 'src/assets/**/*',
  vendorJsFile: 'vendorJs.js',
  vendorCssFile: 'vendorCss.js',
};

gulp.task('watch:scss', function () {
  gulp.watch(localConfig.scssWatchedFiles, ['sass']);
});

gulp.task('watch:js', function () {
  gulp.watch(localConfig.jsWatchedFiles, function () {
    runSequence('scripts', 'inject');
  });
});

gulp.task('watch:jade', function () {
  gulp.watch(localConfig.jadeWatchedFiles, function () {
    runSequence('jade', 'inject');
  });
});

gulp.task('watch:vendor:js', function () {
  gulp.watch(localConfig.vendorJsFile, function () {
    runSequence('vendor:js', 'inject');
  });
});

gulp.task('watch:vendor:css', function () {
  gulp.watch(localConfig.vendorCssFile, ['vendor:css']);
});

gulp.task('watch:assets', function () {
  gulp.watch(localConfig.assetsWatchedFiles, ['assets']);
});

gulp.task('watch', ['watch:jade', 'watch:js', 'watch:scss', 'watch:vendor:js',
                    'watch:vendor:css', 'watch:assets']);
