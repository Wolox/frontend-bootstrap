var gulp = require('gulp'),
    del = require('del');

gulp.task('clean', function (cb) {
  del(['./build'], cb);
});

gulp.task('clean:assets', function (cb) {
  del(['./build/assets'], cb);
});
