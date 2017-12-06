import gulp from 'gulp';
import rev from 'gulp-rev';
import revdel from 'gulp-rev-delete-original';
import filter from 'gulp-filter';
import revReplace from 'gulp-rev-replace';

const localConfig = {
  src: 'build/**/*',
  base: 'build',
  dest: 'build'
};

var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true });
var robotsTxtFilter = filter(['**/*', '!**/robots.txt'], { restore: true });

gulp.task('revisioning', [], () => {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(indexHtmlFilter)
    .pipe(robotsTxtFilter)
    .pipe(rev())
    .pipe(revdel())
    .pipe(indexHtmlFilter.restore)
    .pipe(robotsTxtFilter.restore)
    .pipe(revReplace())
    .pipe(gulp.dest(localConfig.dest))
    .pipe(rev.manifest())
    .pipe(gulp.dest(localConfig.dest));
});
