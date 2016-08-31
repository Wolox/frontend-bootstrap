import gulp from 'gulp';
import runSequence from 'run-sequence';

const localConfig = {
  scssWatchedFiles: 'src/**/*.scss',
  jsWatchedFiles: 'src/**/*.js',
  pugWatchedFiles: 'src/**/*.pug',
  assetsWatchedFiles: 'src/assets/**/*',
  vendorJsFile: 'vendorJs.js',
  vendorCssFile: 'vendorCss.js'
};

gulp.task('watch:scss', () => {
  gulp.watch(localConfig.scssWatchedFiles, () => {
    runSequence('sass', 'purifycss:src');
  });
});

gulp.task('watch:js', () => {
  gulp.watch(localConfig.jsWatchedFiles, () => {
    runSequence('scripts', 'inject', 'sass', 'purifycss');
  });
});

gulp.task('watch:pug', () => {
  gulp.watch(localConfig.pugWatchedFiles, () => {
    runSequence('pug', 'inject', 'sass', 'purifycss');
  });
});

gulp.task('watch:vendor:js', () => {
  gulp.watch(localConfig.vendorJsFile, () => {
    runSequence('vendor:js', 'inject', 'sass', 'purifycss:vendor');
  });
});

gulp.task('watch:vendor:css', () => {
  gulp.watch(localConfig.vendorCssFile, () => {
    runSequence('vendor:css', 'sass', 'purifycss:vendor');
  });
});

gulp.task('watch:assets', () => {
  gulp.watch(localConfig.assetsWatchedFiles, ['assets']);
});

gulp.task('watch', ['watch:pug', 'watch:js', 'watch:scss', 'watch:vendor:js',
                    'watch:vendor:css', 'watch:assets']);
