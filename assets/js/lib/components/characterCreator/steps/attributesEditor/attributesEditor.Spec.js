define([
  'lodash',
  'component/characterCreator/steps/attributesEditor/attributesEditorComponent'
], function (_, attributesEditorComponent) {

  describe('The attributesEditor component', function () {
    var component;

    beforeEach(function () {
      component = _.clone(attributesEditorComponent);
    });

    it('should exist', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    describe('character property', function () {
      it('should exist', function () {
        expect(attributesEditorComponent.props.character).toEqual(jasmine.any(Object));
      });

      it('should be an object', function () {
        expect(attributesEditorComponent.props.character.type).toEqual(Object);
      });

      it('should be required', function () {
        expect(attributesEditorComponent.props.character.required).toEqual(true);
      });

      it('should be a two way binding', function () {
        expect(attributesEditorComponent.props.character.twoWay).toEqual(true);
      });
    });
  });

});