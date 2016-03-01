
define([
  'vue.min',
  'component/dicePool/dicePoolComponent'
], function (Vue, dicePoolComponent) {

  describe('The dicePool component', function () {
    var component;

    beforeEach(function () {
      component = _.clone(dicePoolComponent);
    });

    it('to be an object', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    describe('props', function () {
      describe('ability', function () {
        it('should exist', function () {
          expect(component.props.ability).toEqual(jasmine.any(Object));
        });

        it('should be an object', function () {
          expect(component.props.ability.type).toEqual(Number);
        });

        it('should be a two way binding', function () {
          expect(component.props.ability.twoWay).toEqual(true);
        });

        it('should be required', function () {
          expect(component.props.ability.required).toEqual(true);
        });
      });

      describe('proficiency', function () {
        it('should exist', function () {
          expect(component.props.proficiency).toEqual(jasmine.any(Object));
        });

        it('should be an object', function () {
          expect(component.props.proficiency.type).toEqual(Number);
        });

        it('should be a two way binding', function () {
          expect(component.props.proficiency.twoWay).toEqual(true);
        });

        it('should be required', function () {
          expect(component.props.proficiency.required).toEqual(true);
        });
      });

      describe('difficulty', function () {
        it('should exist', function () {
          expect(component.props.difficulty).toEqual(jasmine.any(Object));
        });

        it('should be an object', function () {
          expect(component.props.difficulty.type).toEqual(Number);
        });

        it('should be a two way binding', function () {
          expect(component.props.difficulty.twoWay).toEqual(true);
        });

        it('should be required', function () {
          expect(component.props.difficulty.required).toEqual(true);
        });
      });

      describe('challenge', function () {
        it('should exist', function () {
          expect(component.props.challenge).toEqual(jasmine.any(Object));
        });

        it('should be an object', function () {
          expect(component.props.challenge.type).toEqual(Number);
        });

        it('should be a two way binding', function () {
          expect(component.props.challenge.twoWay).toEqual(true);
        });

        it('should be required', function () {
          expect(component.props.challenge.required).toEqual(true);
        });
      });

      describe('boost', function () {
        it('should exist', function () {
          expect(component.props.boost).toEqual(jasmine.any(Object));
        });

        it('should be an object', function () {
          expect(component.props.boost.type).toEqual(Number);
        });

        it('should be a two way binding', function () {
          expect(component.props.boost.twoWay).toEqual(true);
        });

        it('should be required', function () {
          expect(component.props.boost.required).toEqual(true);
        });
      });

      describe('setback', function () {
        it('should exist', function () {
          expect(component.props.setback).toEqual(jasmine.any(Object));
        });

        it('should be an object', function () {
          expect(component.props.setback.type).toEqual(Number);
        });

        it('should be a two way binding', function () {
          expect(component.props.setback.twoWay).toEqual(true);
        });

        it('should be required', function () {
          expect(component.props.setback.required).toEqual(true);
        });
      });

      describe('force', function () {
        it('should exist', function () {
          expect(component.props.force).toEqual(jasmine.any(Object));
        });

        it('should be an object', function () {
          expect(component.props.force.type).toEqual(Number);
        });

        it('should be a two way binding', function () {
          expect(component.props.force.twoWay).toEqual(true);
        });

        it('should be required', function () {
          expect(component.props.force.required).toEqual(true);
        });
      });
    });

  });

});
