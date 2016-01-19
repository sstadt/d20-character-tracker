/*jslint browser: true*/

require([
  'constants',
  'vue',
  'class/Character',
  'component/characterList/init',
  'component/characterCreator/characterCreator',
  'lib/global',
], function (constants, Vue, Character) {
  'use strict';

  var characterListEvents = {};

  Vue.config.debug = true;

  var characters = [
    { name: 'Luke Skywalker' },
    { name: 'Han Solo' },
    { name: 'Chewbacca' },
    { name: 'General Organa' },
    { name: 'Poe Dameron' },
    { name: 'Rae' },
    { name: 'Finn' }
  ].map(function (character) {
    return new Character(character);
  });

  characterListEvents[constants.events.characterCreator.addCharacter] = function () {
    this.characters.push(this.newCharacter);
    this.newCharacter = new Character();
  };

  new Vue({
    el: '#characterList',
    data: {
      newCharacter: new Character(),
      characters: characters
    },
    events: characterListEvents
  });

});