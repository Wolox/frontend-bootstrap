var vendorJs = require('../../vendorJs');
vendorJs = vendorJs.map(function (vendor) {
  // as we only need the filename we split the string to get that value
  var filename = vendor.split('/');
  filename = filename[filename.length - 1];
  return '../../build/js/vendor/' + filename;
});

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: vendorJs.concat([
      '../../node_modules/angular-mocks/angular-mocks.js',
      '../../build/js/**/*.js',
      './specs/**/*.js',
      '../../build/app/**/*.html'
    ]),

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../../**/*.html': ['ng-html2js'],
      '../../build/**/*.js': ['coverage']
    },

    // https://github.com/karma-runner/karma-ng-html2js-preprocessor
    ngHtml2JsPreprocessor: {
      cacheIdFromPath: function(filepath) {
        // remove the absolute path
        return '..' + filepath.substring(filepath.indexOf('/app/'));
      },
      moduleName: 'mock.templates'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'junit'],

    // coverage reporter options
    coverageReporter: {
      type: 'cobertura',
      subdir: '.'
    },

    // junit reporter options
    junitReporter: {
      outputFile: 'test-results.xml',
      useBrowserName: false
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || .LOG_ERROR || .LOG_WARN || .LOG_INFO || .LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // If, during test execution, Karma does not receive any message from a browser within
    // browserNoActivityTimeout (ms), it will disconnect from the browser.
    browserNoActivityTimeout: 60000,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    failOnEmptyTestSuite: false,

    plugins: [
      'karma-coverage',
      'karma-junit-reporter',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
