const angular = require('angular');

angular.module('app-bootstrap').config([
  'localStorageServiceProvider',
  function () {

    // Local Storage Setup
    // localStorageServiceProvider.setPrefix(window.btoa('app-bootstrap-/* @echo environment */'));
  }
]);
