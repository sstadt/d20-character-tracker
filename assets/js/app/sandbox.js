
var constants = require('../config/constants.js');
var Character = require('../classes/Character.js');

require('../components/characterList/characterList.js');
require('../components/characterCreator/characterCreator.js');
require('../components/starWarsCrawl/starWarsCrawl.js');

var characterListEvents = {};

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
  el: '#sandbox',
  data: {
    selected: '',
    options: [{
      label: '1',
      value: '1'
    }, {
      label: '2',
      value: '2'
    }, {
      label: '3',
      value: '3'
    }]
  },
  methods: {
    openPrompt: function () {
      this.$refs.testPrompt.ask({
        question: 'There has been an awakening, have you felt it?',
        yes: function (val) {
          console.log(val);
        }
      });
    }
  }
});

new Vue({
  el: '#characterList',
  data: {
    newCharacter: new Character(),
    characters: characters,
    show: false
  },
  events: characterListEvents
});
