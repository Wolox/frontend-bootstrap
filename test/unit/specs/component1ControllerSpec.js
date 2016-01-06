'use strict';

describe('Component 1', function () {

  var component1Controller;

  beforeEach(function () {
    module('app-bootstrap');
  });

  beforeEach(inject(function ($controller) {
    component1Controller = $controller('Component1Controller', {});
  }));

  it('gets components phrase', function () {
    expect(component1Controller.component1Phrase).not.toBeNull();
    expect(component1Controller.component1Phrase).toEqual('This is component 1');
  });

});
