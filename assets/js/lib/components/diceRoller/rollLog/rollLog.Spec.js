
define([
  'vue.min',
  'component/diceRoller/rollLog/rollLogComponent'
], function (Vue, rollLogComponent) {

  describe('The rollLog component', function () {
    var component;

    beforeEach(function () {
      component = _.clone(rollLogComponent);
    });

    it('to be an object', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    describe('props', function () {
      describe('rolls', function () {
        it('should exist', function () {
          expect(component.props.rolls).toEqual(jasmine.any(Object));
        });

        it('should be an Array type', function () {
          expect(component.props.rolls.type).toEqual(Array);
        });

        it('should be required', function () {
          expect(component.props.rolls.required).toEqual(true);
        });
      });
    });
  });

});
