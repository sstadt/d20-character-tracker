
define([
  'lodash',
  'vue.min',
  'component/characterCreator/steps/speciesEditor/speciesEditorComponent',
  'class/Character'
], function (_, Vue, speciesEditorComponent, Character) {

  describe('The speciesEditor component', function () {
    var component;

    beforeEach(function () {
      component = _.clone(speciesEditorComponent);
    });

    it('to be an object', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    describe('character property', function () {
      it('should be an object', function () {
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

    describe('data', function () {
      var data;

      beforeEach(function () {
        data = component.data();
      });

      it('should have a speciesList property', function () {
        expect(data.speciesList).toEqual(jasmine.any(Array));
      });

      it('should have a selectedSpecies', function () {
        expect(data.selectedSpecies).toEqual(jasmine.any(Object));
      });

      it('should set the current species to the first index of speciesList', function () {
          //expect(_.isEqual(data.selectedSpecies, data.speciesList[0])).toEqual(true);
      });
    });

    describe('methods', function () {
      var componentInstance;

      beforeEach(function () {
        componentInstance = new Vue(component);
        componentInstance.character = new Character({
          brawn: 1,
          agility: 1,
          cunning: 1,
          intellect: 1,
          willpower: 1,
          presence: 1
        });
      });

      describe('#updateCharacterAbilities', function () {
        it('should be a function', function () {
          expect(typeof componentInstance.updateCharacterAbilities).toBe('function');
        });

        it('should set the character attributes to the current species settings', function () {
          componentInstance.updateCharacterAbilities();
          // expect(componentInstance.character.brawn).toEqual(2);
          // expect(componentInstance.character.agility).toEqual(2);
          // expect(componentInstance.character.cunning).toEqual(2);
          // expect(componentInstance.character.intellect).toEqual(2);
          // expect(componentInstance.character.willpower).toEqual(2);
          // expect(componentInstance.character.presence).toEqual(2);
        });
      });
    });
  });

});
