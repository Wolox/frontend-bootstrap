'use strict';
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var jasmineReporters = require('jasmine-reporters');
var ReporterProcessor = require('./ReporterProcessor');

exports.config = {
  allScriptsTimeout: 11000,

  capabilities: {
    browserName: 'chrome'
  },

  baseUrl: 'http://BASE_URL_SAMPLE.com',

  onPrepare: function () {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // increase jasmine default timeout from 5 to 30 secs

    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      filePrefix: 'protractor-results'
    }));

    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'all',     // display stacktrace for each failed assertion
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
      customProcessors: [ReporterProcessor]
    }));

    browser.get(browser.baseUrl);
    browser.driver.manage().window().maximize();
    beforeAll(function () {
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
