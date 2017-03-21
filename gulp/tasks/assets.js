import gulp from 'gulp';
import del from 'del';

const localConfig = {
  src: ['./src/assets/**/*'],
  base: 'src',
  dest: './build',
  cleanSrc: './build/assets'
};

gulp.task('clean:assets', () => del([localConfig.cleanSrc]));

gulp.task('assets', ['clean:assets'], () => {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(gulp.dest(localConfig.dest));
});
