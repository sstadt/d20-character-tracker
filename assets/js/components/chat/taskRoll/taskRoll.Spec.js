
var chatRollComponent = require('./taskRollComponent.js');

Vue.config.silent = true;

describe('The chatRoll component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(chatRollComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    it('should be an object', function () {
      expect(component.props).toEqual(jasmine.any(Object));
    });

    describe('chatHandle', function () {
      it('should be a string', function () {
        expect(component.props.chatHandle.type).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.chatHandle.required).toEqual(true);
      });
    });

    describe('message', function () {
      it('should be an object', function () {
        expect(component.props.message.type).toEqual(Object);
      });

      it('should be required', function () {
        expect(component.props.message.required).toEqual(true);
      });
    });
  });

  describe('components', function () {
    it('should have a taskDieResult component', function () {
      expect(component.components.taskDieResult).toEqual(jasmine.any(Object));
    });
  });

});
