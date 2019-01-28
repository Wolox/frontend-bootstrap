const angular = require('angular');

angular.module('app-bootstrap').config([
  '$translateProvider',
  function ($translateProvider) {

    $translateProvider.translations('es', {
      COMPO1: {
        TITLE: 'Title 1'
      }
    });
  }
]);
