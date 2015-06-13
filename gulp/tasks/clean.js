var gulp = require('gulp'),
    del = require('del');

var localConfig = {
  buildSrc: './build',
  assetsSrc: './build/assets'
};

gulp.task('clean', function (cb) {
  del([localConfig.buildSrc], cb);
});

gulp.task('clean:assets', function (cb) {
  del([localConfig.assetsSrc], cb);
});
