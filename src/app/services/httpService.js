angular.module('app-bootstrap').service('httpService', [
  '$http', 'configuration', 'localStorageService', '$state',
  function ($http, configuration, localStorageService, $state,
    urlPrefix = '') {

    const methods = ['put', 'post', 'get', 'delete', 'patch'];

    methods.forEach((method) => {
      this[method] = function (url = '') {
        return $http[method].call(this, `${configuration.apiUrl}${urlPrefix}${url}`, ..._.tail(arguments))
          .catch((err) => {
            if (err.status === 401) {
              localStorageService.remove('session_token');
              delete $http.defaults.headers.common.AUTHORIZATION;
            }
            throw err;
          });
      };
    });

    this.for = (prefix) =>
      new this.constructor($http, configuration, localStorageService, $state, `${urlPrefix}${prefix}/`);
  }
]);
