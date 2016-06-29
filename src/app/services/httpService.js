angular.module('app-bootstrap').service('httpService',
  ['$http', 'configuration',
  function ($http, configuration, urlPrefix = '') { // eslint-disable-line angular/di

    const methods = ['put', 'post', 'get', 'delete'];

    methods.forEach((method) => {
      this[method] = function (url = '') {
        return $http[method].call(this, `${configuration.apiUrl}${urlPrefix}${url}`, ..._.tail(arguments));
      }
    });

    this.for = (prefix) => new this.constructor($http, configuration, `${urlPrefix}${prefix}/`);
  }
]);
