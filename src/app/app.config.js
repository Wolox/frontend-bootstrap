angular.module('app-bootstrap').config([
  'localStorageServiceProvider',
  function (localStorageServiceProvider) {

    // Local Storage Setup
    localStorageServiceProvider.setPrefix(window.btoa('app-bootstrap-/* @echo environment */'));
  }
]);
