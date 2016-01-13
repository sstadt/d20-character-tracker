
define(['class/Character'], function (Character) {

  describe('the Character class', function () {
    it('should be an object', function () {
      var character = new Character();
      expect(character).toEqual(jasmine.any(Object));
    });

    it('should commit', function () {
      expect(1).toEqual(1);
    });
  });

});
