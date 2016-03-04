
var _ = require('lodash');
var personaEditorComponent = require('./personaEditorComponent.js');

describe('The personaEditor component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(personaEditorComponent);
  });

  it('should exist', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('character property', function () {
    it('should exist', function () {
      expect(personaEditorComponent.props.character).toEqual(jasmine.any(Object));
    });

    it('should be an object', function () {
      expect(personaEditorComponent.props.character.type).toEqual(Object);
    });

    it('should be required', function () {
      expect(personaEditorComponent.props.character.required).toEqual(true);
    });

    it('should be a two way binding', function () {
      expect(personaEditorComponent.props.character.twoWay).toEqual(true);
    });
  });
});
