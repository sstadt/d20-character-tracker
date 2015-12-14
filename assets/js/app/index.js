/*jslint browser: true*/

require([
  'vue',
  'class/Character',
  'component/characterList/characterList',
  'component/characterCreator/characterCreator',
  'lib/global',
], function (Vue, Character) {
  'use strict';

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

  new Vue({
    el: '#characterList',
    data: {
      newCharacter: new Character(),
      characters: characters
    },
    methods: {
      addCharacter: function () {
        this.characters.push(new Character({ name: this.newCharacter }));
        this.newCharacter = '';
      }
    }
  });

});