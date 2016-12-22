
var dicePoolTemplate = require('./dicePoolTemplate.html');

require('../dieCounter/dieCounter.js');

module.exports = {
  template: dicePoolTemplate,
  props: {
    ability: {
      type: Number,
      required: true,
      twoWay: true
    },
    proficiency: {
      type: Number,
      required: true,
      twoWay: true
    },
    difficulty: {
      type: Number,
      required: true,
      twoWay: true
    },
    challenge: {
      type: Number,
      required: true,
      twoWay: true
    },
    boost: {
      type: Number,
      required: true,
      twoWay: true
    },
    setback: {
      type: Number,
      required: true,
      twoWay: true
    },
    force: {
      type: Number,
      required: true,
      twoWay: true
    }
  }
};
