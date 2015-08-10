var gulp = require('gulp'),
    del = require('del');

var localConfig = {
  buildSrc: './build'
};

gulp.task('clean', function (cb) {
  del([localConfig.buildSrc], cb);
});
