'use strict';

describe('Component 2', function () {

  var component2Controller;

  beforeEach(function () {
    module('app-bootstrap');
  });

  beforeEach(inject(function ($controller) {
    component2Controller = $controller('Component2Controller', {});
  }));

  it('gets components phrase', function () {
    expect(component2Controller.component2Phrase).not.toBeNull();
    expect(component2Controller.component2Phrase).toEqual('This is component 2');
  });

});
