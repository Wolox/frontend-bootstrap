angular.module('app-bootstrap').controller('Component1Controller', [
  'localStorageService',
  function (localStorageService) {

    this.component1Phrase = 'This is component 1';

    localStorageService.set('randomNumber', Math.random());
  }
]);
