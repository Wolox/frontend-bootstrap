angular.module('app-bootstrap').controller('Component2Controller', [
  'localStorageService',
  function (localStorageService) {
    this.component2Phrase = 'This is component 2';

    this.randomNumber = localStorageService.get('randomNumber');
  }
]);
