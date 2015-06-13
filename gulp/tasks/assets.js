var gulp = require('gulp');

var localConfig = {
  src: './src/assets/**/*',
  base: 'src',
  dest: './build'
};

gulp.task('assets', ['clean:assets'], function() {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(gulp.dest(localConfig.dest));
});
