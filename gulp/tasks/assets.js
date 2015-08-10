var gulp = require('gulp'),
    del = require('del');

var localConfig = {
  src: './src/assets/**/*',
  base: 'src',
  dest: './build',
  cleanSrc: './build/assets'
};

gulp.task('clean:assets', function (cb) {
  del([localConfig.cleanSrc], cb);
});

gulp.task('assets', ['clean:assets'], function() {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(gulp.dest(localConfig.dest));
});
