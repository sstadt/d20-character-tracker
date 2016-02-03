
define([
  'component/characterCreator/steps/raceEditor/raceEditorComponent'
], function (component) {

  describe('The raceEditor component', function () {
    it('to be an object', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });
  });

});
