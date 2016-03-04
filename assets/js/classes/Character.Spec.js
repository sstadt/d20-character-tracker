
var Character = require('./Character.js');

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

    it('should set a default background', function () {
      expect(defaultChar.background).toEqual('');
    });

    it('should set a default career', function () {
      expect(defaultChar.career).toEqual('Jedi');
    });

    it('should set an empty specialization list', function () {
      expect(defaultChar.specializations).toEqual([]);
    });

    it('should set a default brawn', function () {
      expect(defaultChar.brawn).toEqual(2);
    });

    it('should set a default agility', function () {
      expect(defaultChar.agility).toEqual(2);
    });

    it('should set a default intellect', function () {
      expect(defaultChar.intellect).toEqual(2);
    });

    it('should set a default cunning', function () {
      expect(defaultChar.cunning).toEqual(2);
    });

    it('should set a default willpower', function () {
      expect(defaultChar.willpower).toEqual(2);
    });

    it('should set a default presence', function () {
      expect(defaultChar.presence).toEqual(2);
    });

    it('should set a default earned experience', function () {
      expect(defaultChar.experience.earned).toEqual(0);
    });

    it('should set a default spent experience', function () {
      expect(defaultChar.experience.spent).toEqual(0);
    });

    it('should set a default amount of credits', function () {
      expect(defaultChar.wallet.credits).toEqual(500);
    });

    it('should set an ampty pool of skill points to spend', function () {
      expect(defaultChar.wallet.skills).toEqual([]);
    });

    it('should set a default skills object', function () {
      expect(defaultChar.skills).toEqual(jasmine.any(Object));
    });

    it('should set a default powers object', function () {
      expect(defaultChar.powers).toEqual(jasmine.any(Object));
    });
  });

  describe('with passed in values', function () {
    var existingChar;

    beforeEach(function () {
      existingChar = new Character({
        name: 'Oobie',
        career: 'Consular',
        brawn: 1,
        agility: 3,
        intellect: 4,
        cunning: 5,
        willpower: 3,
        presence: 1
      });
    });

    it('should set the passed in name', function () {
      expect(existingChar.name).toEqual('Oobie');
    });

    it('should set the passed in career', function () {
      expect(existingChar.career).toEqual('Consular');
    });

    it('should set the passed in brawn', function () {
      expect(existingChar.brawn).toEqual(1);
    });

    it('should set the passed in agility', function () {
      expect(existingChar.agility).toEqual(3);
    });

    it('should set the passed in intellect', function () {
      expect(existingChar.intellect).toEqual(4);
    });

    it('should set the passed in cunning', function () {
      expect(existingChar.cunning).toEqual(5);
    });

    it('should set the passed in willpower', function () {
      expect(existingChar.willpower).toEqual(3);
    });

    it('should set the passed in presence', function () {
      expect(existingChar.presence).toEqual(1);
    });
  });

});
