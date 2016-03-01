
define([
  'component/characterList/characterListComponent'
], function (component) {

  describe('The character list component', function () {
    it('to be an object', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    describe('characters property', function () {
      it('should exist', function () {
        expect(component.props.characters).toEqual(jasmine.any(Object));
      });

      it('should have a type of Array', function () {
        expect(component.props.characters.type).toEqual(Array);
      });

      it('should be required', function () {
        expect(component.props.characters.required).toEqual(true);
      });

      it('should be a two-way binding', function () {
        expect(component.props.characters.twoWay).toEqual(true);
      });
    });
  });

});
