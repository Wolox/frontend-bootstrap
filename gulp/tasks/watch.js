var gulp = require('gulp');

gulp.task('watch:scss', function () {
  gulp.watch("src/scss/*.scss", ['sass']);
});

gulp.task('watch:js', function () {
  gulp.watch("src/js/*.js", ['scripts']);
});

gulp.task('watch:jade', function () {
  gulp.watch("src/**/*.jade", ['jade']);
});

gulp.task('watch:vendor:js', function () {
  gulp.watch(["vendorJs.js"], ['vendor:js']);
});

gulp.task('watch:vendor:css', function () {
  gulp.watch(["vendorCss.js"], ['vendor:css']);
});

gulp.task('watch', ['watch:jade', 'watch:js', 'watch:scss', 'watch:vendor:js', 'watch:vendor:css']);
