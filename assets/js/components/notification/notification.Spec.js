
var notificationComponent = require('./notificationComponent.js');

Vue.config.silent = true;

describe('The notification component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(notificationComponent);
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

    describe('#close', function () {
      it('should clear all messages', function () {
        componentInstance.messages = ['foo'];
        componentInstance.close();
        expect(componentInstance.messages).toEqual([]);
      });
    });

    describe('#addMessage', function () {
      var timeout = 0;

      beforeEach(function () {
        componentInstance.addMessage('', 'foo', timeout);
      });

      it('should add a message to messages', function () {
        expect(componentInstance.messages.length).toEqual(1);
      });

      it('should clear the errors after the timeout', function () {
        setTimeout(function () {
          expect(componentInstance.messages.length).toEqual(0);
        }, timeout);
      });
    });

    describe('#message', function () {
      var timeout = 0;

      beforeEach(function () {
        spyOn(componentInstance, 'addMessage');
      });

      it('should call the addMessage function with the provided params and an empty type', function () {
        componentInstance.message('foo', timeout);
        expect(componentInstance.addMessage).toHaveBeenCalledWith('', 'foo', timeout);
      });

      it('should call the addMessage function with the provided params and an success type', function () {
        componentInstance.success('foo', timeout);
        expect(componentInstance.addMessage).toHaveBeenCalledWith('success', 'foo', timeout);
      });

      it('should call the addMessage function with the provided params and an warning type', function () {
        componentInstance.warning('foo', timeout);
        expect(componentInstance.addMessage).toHaveBeenCalledWith('warning', 'foo', timeout);
      });

      it('should call the addMessage function with the provided params and an alert type', function () {
        componentInstance.alert('foo', timeout);
        expect(componentInstance.addMessage).toHaveBeenCalledWith('alert', 'foo', timeout);
      });
    });
  });

});
