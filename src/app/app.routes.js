app.config([
  '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  // For any unmatched urls
  $urlRouterProvider.otherwise( ($injector) => {
    $injector.get('$state').go('state1.index');
  });

  // Now set up the states
  $stateProvider
    .state('state1', {
      abstract: true,
      template: '<ui-view/>',
      views: {
        main: {
          templateUrl: '../app/layouts/state1/main.html'
        }
      }
    })
    .state('state1.index', {
      url: '/state1',
      views: {
        innerComponent: {
          templateUrl: '../app/components/component1/component1.html'
        }
      }
    })
    .state('state2', {
      abstract: true,
      template: '<ui-view/>',
      views: {
        main: {
          templateUrl: '../app/layouts/state2/main.html'
        }
      }
    })
    .state('state2.index', {
      url: '/state2',
      views: {
        innerComponent: {
          templateUrl: '../app/components/component2/component2.html'
        }
      }
    });
}]);
