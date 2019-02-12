const angular = require('angular');
require('angular-route');
require('angular-local-storage');
require('angular-translate');

angular.module(
  'app-bootstrap', [
    'ngRoute',
    'LocalStorageModule',
    'pascalprecht.translate'
  ]
);
