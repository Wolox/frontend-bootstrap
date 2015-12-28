angular.module('app-bootstrap').config([
  'RestangularProvider', 'configuration', 'localStorageServiceProvider',
  function (RestangularProvider, configuration, localStorageServiceProvider) {

    // Restangular Setup
    RestangularProvider.setBaseUrl(configuration.apiUrl);
    RestangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json' });

    // Local Storage Setup
    localStorageServiceProvider.setPrefix(window.btoa('app-/* @echo environment */'));
  }
]);
