var gulp = require('gulp'),
    cached = require('gulp-cached'),
    del = require('del');

var localConfig = {
  buildSrc: './build'
};

gulp.task('clean', function (cb) {
  cached.caches = {};
  del([localConfig.buildSrc], cb);
});
