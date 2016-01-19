
define([
  'lodash',
  'component/characterCreator/characterCreatorComponent'
], function (_, component) {

  describe('The character creator component', function () {
    it('to be an object', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
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

      
    });
  });

});
