angular.module('app-bootstrap').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // For any unmatched urls
    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go('centered.state1');
    });

    // Now set up the states
    $stateProvider
      .state('centered', {
        abstract: true,
        views: {
          main: {
            templateUrl: '../app/components/centered/centered.html'
          }
        }
      })
      .state('centered.state1', {
        url: '/state1',
        views: {
          content: {
            templateUrl: '../app/components/centered/component1/component1.html',
            controller: 'Component1Controller',
            controllerAs: 'comp1Ctrl'
          }
        }
      })
      .state('centered.state2', {
        url: '/state2',
        views: {
          content: {
            templateUrl: '../app/components/centered/component2/component2.html',
            controller: 'Component2Controller',
            controllerAs: 'comp2Ctrl'
          }
        }
      })
      .state('centered.requiredLogin', {
        url: '/required_login',
        views: {
          content: {
            templateUrl: '../app/components/centered/requiredLoginComponent/requiredLoginComponent.html'
          }
        },
        data: {
          requireLogin: true
        }
      })
      .state('auth', {
        abstract: true,
        views: {
          main: {
            templateUrl: '../app/components/auth/auth.html'
          }
        }
      })
      .state('auth.login', {
        url: '/login',
        views: {
          content: {
            templateUrl: '../app/components/auth/login.html',
            controller: 'AuthController',
            controllerAs: 'authCtrl'
          }
        },
        data: {
          requireLogin: false
        }
      });

    $locationProvider.html5Mode(true);
  }
]);
