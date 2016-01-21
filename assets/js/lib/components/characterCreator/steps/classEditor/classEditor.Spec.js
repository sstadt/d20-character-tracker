define([
  'lodash',
  'component/characterCreator/steps/classEditor/classEditorComponent'
], function (_, classEditorComponent) {

  describe('The classEditor component', function () {
    var component;

    beforeEach(function () {
      component = _.clone(classEditorComponent);
    });

    it('should exist', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    describe('character property', function () {
      it('should exist', function () {
        expect(classEditorComponent.props.character).toEqual(jasmine.any(Object));
      });

      it('should be an object', function () {
        expect(classEditorComponent.props.character.type).toEqual(Object);
      });

      it('should be required', function () {
        expect(classEditorComponent.props.character.required).toEqual(true);
      });

      it('should be a two way binding', function () {
        expect(classEditorComponent.props.character.twoWay).toEqual(true);
      });
    });
  });

});