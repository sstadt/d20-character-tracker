define([
  'lodash',
  'component/characterCreator/steps/attributesEditor/rollMethodBestOfFour/rollMethodBestOfFourComponent'
], function (_, rollMethodBestOfFourComponent) {

  describe('The rollMethodBestOfFour component', function () {
    var component;

    beforeEach(function () {
      component = _.clone(rollMethodBestOfFourComponent);
    });

    it('should exist', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    describe('character property', function () {
      it('should exist', function () {
        expect(rollMethodBestOfFourComponent.props.character).toEqual(jasmine.any(Object));
      });

      it('should be an object', function () {
        expect(rollMethodBestOfFourComponent.props.character.type).toEqual(Object);
      });

      it('should be required', function () {
        expect(rollMethodBestOfFourComponent.props.character.required).toEqual(true);
      });

      it('should be a two way binding', function () {
        expect(rollMethodBestOfFourComponent.props.character.twoWay).toEqual(true);
      });
    });
  });

});