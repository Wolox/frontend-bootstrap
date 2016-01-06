var gulp = require('gulp'),
    cached = require('gulp-cached'),
    del = require('del');

var localConfig = {
  buildSrc: './build'
};

gulp.task('clean', function () {
  cached.caches = {};
  return del([localConfig.buildSrc]);
});
