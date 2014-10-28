'use strict';

describe('Service: KodemonFactory', function () {

  // load the service's module
  beforeEach(module('kodemonViewApp'));

  // instantiate service
  var KodemonFactory;
  beforeEach(inject(function (_KodemonFactory_) {
    KodemonFactory = _KodemonFactory_;
  }));

  it('should do something', function () {
    expect(!!KodemonFactory).toBe(true);
  });

});
