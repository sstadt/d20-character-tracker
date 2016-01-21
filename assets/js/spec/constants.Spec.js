define(['constants'], function (constants) {
  describe('constants', function () {
    it('should be an object', function () {
      expect(constants).toEqual(jasmine.any(Object));
    });

    describe('events', function () {
      it('should be an object', function () {
        expect(constants.events).toEqual(jasmine.any(Object));
      });

      describe('characterCreator', function () {
        it('should be an object', function () {
          expect(constants.events.characterCreator).toEqual(jasmine.any(Object));
        });

        it('should have a changeTab event', function () {
          expect(constants.events.characterCreator.changeTab).toEqual(jasmine.any(String));
        });

        it('should have a newCharacter event', function () {
          expect(constants.events.characterCreator.newCharacter).toEqual(jasmine.any(String));
        });

        it('should have an addCharacter event ', function () {
          expect(constants.events.characterCreator.addCharacter).toEqual(jasmine.any(String));
        });
      });
    });
  });
});