var gulp = require('gulp'),
    series = require('stream-series'),
    inject = require('gulp-inject'),
    globalConfig = require('../config');

var localConfig = {
  indexHtmlFile: 'index.html',
  buildFolder: './build/',
  jsFilesRegex: '**/*.js',
  jsVendorFilesPath: 'js/vendor/',
  vendorJsDeclarationsFile: '../../vendorJs',
  jsVendorFiles: function () {
    // We always want to load the fresh contents of vendorJs file, so avoid caching it.
    delete require.cache[require.resolve(this.vendorJsDeclarationsFile)];
    return require(this.vendorJsDeclarationsFile).map(function (filepath) {
      var fileName = filepath.split('/').pop();
      return localConfig.buildFolder + localConfig.jsVendorFilesPath + fileName;
    });
  },
};

gulp.task('inject', function () {
  var vendorFileNames = localConfig.jsVendorFiles();

  var jsVendorPath = localConfig.buildFolder + localConfig.jsVendorFilesPath + '*';
  var jsVendorSources = globalConfig.development() ?
                          gulp.src(vendorFileNames, { read: false }) :
                          gulp.src(jsVendorPath, { read: false });
  var jsSources = gulp.src([localConfig.buildFolder + localConfig.jsFilesRegex,
                           '!' + jsVendorPath], { read: false });

  return gulp.src(localConfig.buildFolder + localConfig.indexHtmlFile)
    .pipe(inject(series(jsVendorSources, jsSources), {
      transform: function (filepath, file, i, length) {
        if (globalConfig.development()) {
          var vendorFileIndex = vendorFileNames.indexOf(filepath.split('/').pop());
          if (vendorFileIndex !== -1) {
            i = vendorFileIndex;
          }
        }
        return inject.transform.call(inject.transform, filepath.substring(6), file, i, length);
      }
    }))
  .pipe(gulp.dest(localConfig.buildFolder));
});
