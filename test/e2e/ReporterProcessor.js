var DisplayProcessor = require('jasmine-spec-reporter').DisplayProcessor;

function TimeProcessor() {}

function loggerInfo(log) {
  var now = new Date();
  var nowStr = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  return nowStr + ' - ' + log;
}

TimeProcessor.prototype = new DisplayProcessor();

TimeProcessor.prototype.displaySuite = function (suite, log) {
  return loggerInfo(log);
};

TimeProcessor.prototype.displaySuccessfulSpec = function (spec, log) {
  return loggerInfo(log);
};

TimeProcessor.prototype.displayFailedSpec = function (spec, log) {
  return loggerInfo(log);
};

TimeProcessor.prototype.displayPendingSpec = function (spec, log) {
  return loggerInfo(log);
};

module.exports = TimeProcessor;
