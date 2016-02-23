'use strict';
var credentials = require(process.cwd() + '/test/e2e/testUserCredentials.example');

exports.config = {
  allScriptsTimeout: 11000,

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://BASE_URL_SAMPLE.com',

  onPrepare: function () {
    var jasmineReporters = require('jasmine-reporters');

    jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
      verbosity: 3,
      color: true,
      showStack: true
    }));

    browser.get(browser.baseUrl);
    browser.driver.manage().window().maximize();
    beforeEach(function () {
      browser.executeScript("window.onbeforeunload = function(){};");
    });
    beforeAll(function () {
      // Workaround to avoid logging in on every test
      /* browser.executeScript('window.localStorage.setItem(\'' + credentials.localStorageKey + '\', \'' +
                            credentials.localStorageValue + '\');');*/
      browser.get(browser.baseUrl);
    });
  },

  framework: 'jasmine2',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  specs: [
    './specs/**/*.js'
  ]
};
