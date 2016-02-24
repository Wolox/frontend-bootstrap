'use strict';
var credentials = require(process.cwd() + '/test/e2e/testUserCredentials');
var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://BASE_URL_SAMPLE.com',

  onPrepare: function () {

    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'all',     // display stacktrace for each failed assertion, values: (all|specs|summary|none)
      displayFailuresSummary: true, // display summary of all failures after execution
      displayPendingSummary: true,  // display summary of all pending specs after execution
      displaySuccessfulSpec: true,  // display each successful spec
      displayFailedSpec: true,      // display each failed spec
      displayPendingSpec: false,    // display each pending spec
      displaySpecDuration: false,   // display each spec duration
      displaySuiteNumber: false,    // display each suite number (hierarchical)
      colors: {
        success: 'green',
        failure: 'red',
        pending: 'yellow'
      },
      prefixes: {
        success: '✓ ',
        failure: '✗ ',
        pending: '* '
      },
      customProcessors: []
    }));

    browser.get(browser.baseUrl);
    browser.driver.manage().window().maximize();
    beforeEach(function () {
      browser.executeScript("window.onbeforeunload = function(){};");
    });
    beforeAll(function () {
      // Workaround to avoid logging in on every test
      // browser.executeScript('window.localStorage.setItem(\'' + credentials.localStorageKey + '\', \'' +
      //                       credentials.localStorageValue + '\');');
      browser.get(browser.baseUrl);
    });
  },

  framework: 'jasmine2',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    print: function() {}
  },

  specs: [
    './specs/**/*.js'
  ]
};
