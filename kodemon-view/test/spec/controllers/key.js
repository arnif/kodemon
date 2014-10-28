'use strict';

describe('Controller: KeyCtrl', function () {

  // load the controller's module
  beforeEach(module('kodemonViewApp'));

  var KeyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KeyCtrl = $controller('KeyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
