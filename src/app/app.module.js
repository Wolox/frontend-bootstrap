const angular = require('angular');
require('angular-ui-router');
require('angular-local-storage');
require('angular-translate');

angular.module(
  'app-bootstrap', [
    'ui.router',
    'LocalStorageModule',
    'pascalprecht.translate'
  ]
);
