var browserSync = require('browser-sync'),
    gulp        = require('gulp');

var localConfig = {
  buildSrc: './build/',
  appFiles: './build/**/*.*'
};

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: localConfig.buildSrc
        },
        files: localConfig.appFiles,
        open: false
    });
});
