const angular = require('angular');

angular.module('app-bootstrap').config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider
    .when('/', {
      template: require('./components/centered/centered.pug')
    })
    .when('/banana', {
      template: '<h1>Banana</h1><p>Bananas contain around 75% water.</p>'
    })
    .when('/tomato', {
      template: '<h1>Tomato</h1><p>Tomatoes contain around 95% water.</p>'
    });
  }
]);
