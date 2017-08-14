angular.module('app-bootstrap').controller('AuthController', [
  'authenticationService', '$state', 'localStorageService',
  function (authenticationService, $state, localStorageService) { // eslint-disable-line


    this.login = () => {
      authenticationService.login(this.loginData).then(() => {
        $state.go('centered.requiredLogin');
      });
    };

    this.logout = () => {
      authenticationService.logout();
    };

    this.isLoggedIn = () => {
      return authenticationService.isLoggedIn();
    };

    this.currentUser = () => {
      return authenticationService.currentUser();
    };

  }
]);
