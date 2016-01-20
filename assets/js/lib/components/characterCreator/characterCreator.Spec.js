
define([
  'constants',
  'vue',
  'lodash',
  'component/characterCreator/characterCreatorComponent'
], function (constants, Vue, _, component) {

  describe('The character creator component', function () {
    it('to be an object', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    describe('events', function () {
      it('should exist', function () {
        expect(component.events).toEqual(jasmine.any(Object));
      });

      describe('*changeTab', function () {
        it('should exist', function () {
          expect(typeof component.events[constants.events.characterCreator.changeTab]).toBe('function');
        });

        // it('should set the current step', function () {
        //   var componentInstance, standaloneComponent;

        //   standaloneComponent = _.clone(component);
        //   standaloneComponent.el = '#test'; // creating compile errors
        //   componentInstance = new Vue(standaloneComponent);

        //   componentInstance.$emit(constants.events.characterCreator.changeTab, 'bazinga');
        //   expect(componentInstance.data.currentStep).toEqual('bazinga');
        // });
      });
    });

    describe('character property', function () {
      it('should exist', function () {
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
      it('should exist', function () {
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
        it('should exist', function () {
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
  });

});
