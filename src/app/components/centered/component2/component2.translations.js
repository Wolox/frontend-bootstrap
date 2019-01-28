const angular = require('angular');

angular.module('app-bootstrap').config([
  '$translateProvider',
  function ($translateProvider) {

    $translateProvider.translations('es', {
      COMPO2: {
        TITLE: 'Title 2'
      }
    });
  }
]);
