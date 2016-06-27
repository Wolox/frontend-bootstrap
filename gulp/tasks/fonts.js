import gulp from 'gulp';
import del from 'del';

const localConfig = {
  src: './src/fonts/**/*',
  base: 'src',
  dest: './build/fonts',
  cleanSrc: './build/fonts'
};

gulp.task('clean:fonts', (cb) => del([localConfig.cleanSrc], cb));

gulp.task('fonts', ['clean:fonts'], () => {
  return gulp.src(localConfig.src)
    .pipe(gulp.dest(localConfig.dest));
});
