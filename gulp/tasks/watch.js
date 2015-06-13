var gulp = require('gulp');

var localConfig = {
  scssWatchedFiles: 'src/scss/*.scss',
  jsWatchedFiles: 'src/js/*.js',
  jadeWatchedFiles: 'src/**/*.jade',
  assetsWatchedFiles: 'src/assets/**/*',
  vendorJsFile: 'vendorJs.js',
  vendorCssFile: 'vendorCss.js',
};

gulp.task('watch:scss', function () {
  gulp.watch(localConfig.scssWatchedFiles, ['sass']);
});

gulp.task('watch:js', function () {
  gulp.watch(localConfig.jsWatchedFiles, ['scripts']);
});

gulp.task('watch:jade', function () {
  gulp.watch(localConfig.jadeWatchedFiles, ['jade']);
});

gulp.task('watch:vendor:js', function () {
  gulp.watch(localConfig.vendorJsFile, ['vendor:js']);
});

gulp.task('watch:vendor:css', function () {
  gulp.watch(localConfig.vendorCssFile, ['vendor:css']);
});

gulp.task('watch:assets', function () {
  gulp.watch(localConfig.assetsWatchedFiles, ['assets']);
});

gulp.task('watch', ['watch:jade', 'watch:js', 'watch:scss', 'watch:vendor:js',
                    'watch:vendor:css', 'watch:assets']);
