
define(['class/Character'], function (Character) {

  describe('the Character class', function () {

    it('should be an object', function () {
      var character = new Character();
      expect(character).toEqual(jasmine.any(Object));
    });

    describe('with default options', function () {
      var defaultChar;

      beforeEach(function () {
        defaultChar = new Character();
      });

      it('should set a default name', function () {
        expect(defaultChar.name).toEqual('Bob');
      });

      it('should set a default class', function () {
        expect(defaultChar.class).toEqual('Noob');
      });

      it('should set a default strength', function () {
        expect(defaultChar.strength).toEqual(12);
      });

      it('should set a default dexterity', function () {
        expect(defaultChar.dexterity).toEqual(12);
      });

      it('should set a default constitution', function () {
        expect(defaultChar.constitution).toEqual(12);
      });

      it('should set a default intelligence', function () {
        expect(defaultChar.intelligence).toEqual(12);
      });

      it('should set a default wisdom', function () {
        expect(defaultChar.wisdom).toEqual(12);
      });

      it('should set a default charisma', function () {
        expect(defaultChar.charisma).toEqual(12);
      });
    });

    describe('with passed in values', function () {
      var existingChar;

      beforeEach(function () {
        existingChar = new Character({
          name: 'Oobie',
          class: 'Shaman',
          strength: 10,
          dexterity: 13,
          constitution: 15,
          intelligence: 14,
          wisdom: 18,
          charisma: 16
        });
      });

      it('should set the passed in name', function () {
        expect(existingChar.name).toEqual('Oobie');
      });

      it('should set the passed in class', function () {
        expect(existingChar.class).toEqual('Shaman');
      });

      it('should set the passed in strength', function () {
        expect(existingChar.strength).toEqual(10);
      });

      it('should set the passed in dexterity', function () {
        expect(existingChar.dexterity).toEqual(13);
      });

      it('should set the passed in constitution', function () {
        expect(existingChar.constitution).toEqual(15);
      });

      it('should set the passed in intelligence', function () {
        expect(existingChar.intelligence).toEqual(14);
      });

      it('should set the passed in wisdom', function () {
        expect(existingChar.wisdom).toEqual(18);
      });

      it('should set the passed in charisma', function () {
        expect(existingChar.charisma).toEqual(16);
      });
    });

  });

});
