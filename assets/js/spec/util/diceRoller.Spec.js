
define([
  'lodash',
  'util/diceRoller'
], function (_, diceRoller) {
  describe('The dice roller', function () {
    describe('#roll', function () {
      var roll;

      beforeEach(function () {
        roll = diceRoller.roll(10, 6);
      });

      it('should return an array of rolls', function () {
        expect(roll).toEqual(jasmine.any(Array));
      });

      it('should return an array of length equal to the number of dice passed in', function () {
        expect(roll.length).toEqual(10);
      });

      it('should be an array composed of numbers from 1 to the number of sides passed in', function () {
        for (var i = 0, j = roll.length; i < j; i++) {
          expect(roll[i]).toBeGreaterThan(0);
          expect(roll[i]).toBeLessThan(7);
        }
      });

      it('should return a list of integers', function () {
        for (var i = 0, j = roll.length; i < j; i++) {
          expect(_.isInteger(roll[i])).toEqual(true);
        } 
      });
    });

    describe('#rollSimple', function () {
      var roll;

      beforeEach(function () {
        roll = diceRoller.rollSimple(3, 6);
      });

      it('should return an integer', function () {
        expect(_.isInteger(roll)).toEqual(true);
      });

      it('should return a number between 1 and the number of dice times the sides of the die', function () {
        for (var i = 0; i < 30; i++) {
          expect(diceRoller.rollSimple(2, 6)).toBeGreaterThan(0);
          expect(diceRoller.rollSimple(2, 6)).toBeLessThan(13);
        }
      });
    });
  });
});
