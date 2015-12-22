var gulp = require('gulp');

var localConfig = {
  maintananceFile: './src/maintanance/index.html',
  destFolder: './build/'
};

gulp.task('build:maintanance', ['clean'], function () {
  return gulp.src(localConfig.maintananceFile)
             .pipe(gulp.dest(localConfig.destFolder));
});
