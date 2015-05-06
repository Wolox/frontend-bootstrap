var gulp = require('gulp');

gulp.task('assets', ['clean:assets'], function() {
  gulp.src('./src/assets/**/*', { base: 'src' })
    .pipe(gulp.dest('./build'));
});
