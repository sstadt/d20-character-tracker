define([
  'lodash',
  'component/characterCreator/steps/attributesEditor/rollMethodBasic/rollMethodBasicComponent'
], function (_, rollMethodBasicComponent) {

  describe('The rollMethodBasic component', function () {
    var component;

    beforeEach(function () {
      component = _.clone(rollMethodBasicComponent);
    });

    it('should exist', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    describe('character property', function () {
      it('should exist', function () {
        expect(rollMethodBasicComponent.props.character).toEqual(jasmine.any(Object));
      });

      it('should be an object', function () {
        expect(rollMethodBasicComponent.props.character.type).toEqual(Object);
      });

      it('should be required', function () {
        expect(rollMethodBasicComponent.props.character.required).toEqual(true);
      });

      it('should be a two way binding', function () {
        expect(rollMethodBasicComponent.props.character.twoWay).toEqual(true);
      });
    });
  });

});