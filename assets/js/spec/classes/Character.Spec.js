
define(['class/Character'], function (Character) {

  describe('the Character class', function () {
    it('should be an object', function () {
      var character = new Character();
      expect(character).toEqual(jasmine.any(Object));
    });
  });

});
