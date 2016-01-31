import gulp from 'gulp';
import series from 'stream-series';
import inject from 'gulp-inject';
import { getConfigKeys } from '../config';

const taskOptions = getConfigKeys();

const localConfig = {
  indexHtmlFile: 'index.html',
  buildFolder: './build/',
  jsFilesRegex: '**/*.js',
  jsVendorFilesPath: 'js/vendor/',
  vendorJsDeclarationsFile: '../../vendorJs',
  jsVendorFiles () {
    // We always want to load the fresh contents of vendorJs file, so avoid caching it.
    delete require.cache[require.resolve(this.vendorJsDeclarationsFile)];
    return require(this.vendorJsDeclarationsFile).map(function (filepath) {
      const fileName = filepath.split('/').pop();
      return localConfig.buildFolder + localConfig.jsVendorFilesPath + fileName;
    });
  }
};

gulp.task('inject', () => {
  const vendorFileNames = localConfig.jsVendorFiles();

  const jsVendorPath = `${localConfig.buildFolder}${localConfig.jsVendorFilesPath}*`;
  const jsVendorSources = taskOptions.concat ?
                          gulp.src(jsVendorPath, { read: false }) :
                          gulp.src(vendorFileNames, { read: false });
  const jsSources = gulp.src([`${localConfig.buildFolder}${localConfig.jsFilesRegex}`,
                           `!${jsVendorPath}`], { read: false });

  return gulp.src(localConfig.buildFolder + localConfig.indexHtmlFile)
    .pipe(inject(series(jsVendorSources, jsSources), {
      transform (filepath, file, i, length) {
        let index = i;
        if (!taskOptions.concat) {
          const vendorFileIndex = vendorFileNames.indexOf(filepath.split('/').pop());
          if (vendorFileIndex !== -1) {
            index = vendorFileIndex;
          }
        }
        return inject.transform.call(inject.transform, filepath.substring(6), file, index, length);
      }
    }))
  .pipe(gulp.dest(localConfig.buildFolder));
});
