var gulp = require('gulp'),
    runSequence = require('run-sequence');

var localConfig = {
  maintenanceFile: './src/maintenance/index.html',
  destFolder: './build/'
};

gulp.task('maintenance:production', function (cb) {
  runSequence('clean', 'build:production', 'build:maintenance', cb);
});

gulp.task('maintenance:staging', function (cb) {
  runSequence('clean', 'build:staging', 'build:maintenance', cb);
});


gulp.task('build:maintenance', function () {
  return gulp.src(localConfig.maintenanceFile)
             .pipe(gulp.dest(localConfig.destFolder));
});
