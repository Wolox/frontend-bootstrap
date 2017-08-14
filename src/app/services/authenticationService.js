angular.module('app-bootstrap').service('authenticationService', [
  'httpService', '$http', 'localStorageService', '$state', '$rootScope',
  function (httpService, $http, localStorageService, $state, $rootScope) {

    const saveSession = (user) => {
      localStorageService.set('session_token', user.session_token);
      $http.defaults.headers.common.AUTHORIZATION = user.session_token;
      localStorageService.set('current_user', user);
      $rootScope.currentUser = user;
    };

    const removeCurrentSession = () => {
      localStorageService.remove('session_token');
      delete $http.defaults.headers.common.AUTHORIZATION;
      localStorageService.remove('current_user');
      delete $rootScope.currentUser;
    };

    this.login = (params) => {
      const defaultSuccessCb = (response) => {
        saveSession(response.data.user);
        return response;
      };
      return httpService.post('login', params).then(defaultSuccessCb);
    };

    this.logout = () => {
      const successLogoutCb = () => {
        removeCurrentSession();
        $state.go('auth.login');
      };
      return httpService.post('logout').then(successLogoutCb);
    };

    this.isLoggedIn = () => {
      return !!localStorageService.get('session_token');
    };

    this.currentUser = () => {
      if (!$rootScope.currentUser) {
        $rootScope.currentUser = localStorageService.get('current_user');
      }
      return $rootScope.currentUser;
    };

  }
]);
