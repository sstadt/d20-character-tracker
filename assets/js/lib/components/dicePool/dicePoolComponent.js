
define([
  'text!./dicePoolTemplate.html',
  'component/dieCounter/dieCounter'
], function (dicePoolTemplate) {

  return {
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

});
