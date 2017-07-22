angular.module('app-bootstrap').factory('authenticationService', [
  'httpService', '$http', 'localStorageService', '$state',
  function (httpService, $http, localStorageService, $state) {

    return {
      login: (params) => {
        const defaultSuccessCb = (data) => {
          localStorageService.set('session_token', data.data.user.session_token);
          $http.defaults.headers.common.AUTHORIZATION = data.data.user.session_token;
          return data;
        };
        return httpService.post('login', params).then(defaultSuccessCb);
      },

      logout: () => {
        const successLogoutCb = () => {
          localStorageService.remove('session_token');
          delete $http.defaults.headers.common.AUTHORIZATION;
          $state.go('auth.login');
        };

        return httpService.post('logout').then(successLogoutCb);
      },

      isLoggedIn: () => {
        return !!localStorageService.get('session_token');
      }

    };
  }
]);
