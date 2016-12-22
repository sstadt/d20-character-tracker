
var constants = require('../../config/constants.js');
var Character = require('../../classes/Character.js');
var characterCreatorComponent = require('./characterCreatorComponent.js');
var stepList = require('./steps/stepList.js');

Vue.config.silent = true;

describe('The character creator component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(characterCreatorComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('character property', function () {
    it('should be an object', function () {
      expect(component.props.character).toEqual(jasmine.any(Object));
    });

    it('should have a type of Object', function () {
      expect(component.props.character.type).toEqual(Object);
    });

    it('should be required', function () {
      expect(component.props.character.required).toEqual(true);
    });

    it('should be a two-way binding', function () {
      expect(component.props.character.twoWay).toEqual(true);
    });
  });

  describe('child components', function () {
    it('should be an object', function () {
      expect(component.components).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      _.each(component.components, function (child) {
        expect(child.template).toEqual(jasmine.any(String));
      });
    });

    it('should have a #changeStep method', function () {
      _.each(component.components, function (child) {
        expect(typeof child.methods.changeStep).toEqual('function');
      });
    });

    it('should have a #addCharacter method', function () {
      _.each(component.components, function (child) {
        expect(typeof child.methods.addCharacter).toEqual('function');
      });
    });

    it('should have a data object', function () {
      _.each(component.components, function (child) {
        expect(child.data()).toEqual(jasmine.any(Object));
      });
    });

    describe('character property', function () {
      it('should be an object', function () {
        _.each(component.components, function (child) {
          expect(child.props.character).toEqual(jasmine.any(Object));
        });
      });

      it('should be an object', function () {
        _.each(component.components, function (child) {
          expect(child.props.character.type).toEqual(Object);
        });
      });

      it('should be required', function () {
        _.each(component.components, function (child) {
          expect(child.props.character.required).toEqual(true);
        });
      });

      it('should be a two way binding', function () {
        _.each(component.components, function (child) {
          expect(child.props.character.twoWay).toEqual(true);
        });
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#changeStep', function () {
      it('should be a function', function () {
        expect(typeof componentInstance.changeStep).toBe('function');
      });

      it('should set the current step', function () {
        componentInstance.changeStep('attributes');
        expect(componentInstance.currentStep).toEqual('attributes');
      });
    });

    describe('#startCharacterCreator', function () {
      it('should be a function', function () {
        expect(typeof componentInstance.startCharacterCreator).toEqual('function');
      });

      it('should show the character creator', function () {
        componentInstance.startCharacterCreator();
        expect(componentInstance.show).toEqual(true);
      });

      it('should reset the character if passed true as the first argument', function () {
        var newCharacter = new Character();
        componentInstance.character.name = 'Joe';
        componentInstance.startCharacterCreator(true);
        expect(_.isEqual(newCharacter, componentInstance.character)).toEqual(true);
      });
    });
  });

  describe('events', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    it('should be an object', function () {
      expect(component.events).toEqual(jasmine.any(Object));
    });

    describe('*changeTab', function () {
      it('should be a function', function () {
        expect(typeof component.events[constants.events.characterCreator.changeTab]).toBe('function');
      });

      it('should set the current step', function () {
        componentInstance.$emit(constants.events.characterCreator.changeTab, 'attributes');
        expect(componentInstance.currentStep).toEqual('attributes');
      });
    });

    describe('*addCharacter', function () {
      it('should be a function', function () {
        expect(typeof component.events[constants.events.characterCreator.changeTab]).toBe('function');
      });

      it('should reset the character creator to the first step', function () {
        componentInstance.$emit(constants.events.characterCreator.changeTab, 'attributes');
        componentInstance.$emit(constants.events.characterCreator.addCharacter);
        expect(componentInstance.currentStep).toEqual('persona');
      });

      it('should hide the character creator', function () {
        componentInstance.startCharacterCreator();
        componentInstance.$emit(constants.events.characterCreator.addCharacter);
        expect(componentInstance.show).toEqual(false);
      });
    });
  });

  describe('lifecycle methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#created', function () {
      it('should instantiate a new character', function () {
        var newCharacter = new Character();
        expect(_.isEqual(newCharacter, componentInstance.character)).toEqual(true);
      });
    });
  });

  describe('stepList', function () {
    it('should have a persona step', function () {
      expect(stepList.persona).toEqual(jasmine.any(String));
    });

    it('should have a species step', function () {
      expect(stepList.species).toEqual(jasmine.any(String));
    });

    it('should have a career step', function () {
      expect(stepList.career).toEqual(jasmine.any(String));
    });
  });

});
