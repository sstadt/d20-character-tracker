define([
  'lodash',
  'component/characterCreator/steps/careerEditor/careerEditorComponent'
], function (_, careerEditorComponent) {

  describe('The careerEditor component', function () {
    var component;

    beforeEach(function () {
      component = _.clone(careerEditorComponent);
    });

    it('should exist', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    describe('character property', function () {
      it('should exist', function () {
        expect(careerEditorComponent.props.character).toEqual(jasmine.any(Object));
      });

      it('should be an object', function () {
        expect(careerEditorComponent.props.character.type).toEqual(Object);
      });

      it('should be required', function () {
        expect(careerEditorComponent.props.character.required).toEqual(true);
      });

      it('should be a two way binding', function () {
        expect(careerEditorComponent.props.character.twoWay).toEqual(true);
      });
    });
  });

});