
module.exports = {
  template: require('./diceControlsTemplate.html'),
  data() {
    return {
      dice: [
        'ability',
        'proficiency',
        'difficulty',
        'challenge',
        'boost',
        'setback',
        'force',
        'percent'
      ]
    };
  },
  components: {
    dieControl: require('./dieControl/dieControlComponent.js')
  },
  methods: {
    dieClick(type) {
      this.$emit('die-click', type);
    }
  }
};
