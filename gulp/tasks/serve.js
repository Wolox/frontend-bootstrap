var browserSync = require('browser-sync'),
    gulp        = require('gulp');

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        },
        files: "./build/**/*.*",
        open: false
    });
});
