
var starWarsCrawlComponent = require('./starWarsCrawlComponent.js');

Vue.config.silent = true;

describe('The starWarsCrawl component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(starWarsCrawlComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#startCrawl', function () {
      it('should be a function', function () {
        expect(typeof componentInstance.startCrawl).toBe('function');
      });
    });

    describe('#endCrawl', function () {
      it('should be a function', function () {
        expect(typeof componentInstance.endCrawl).toBe('function');
      });
    });
  });

});
