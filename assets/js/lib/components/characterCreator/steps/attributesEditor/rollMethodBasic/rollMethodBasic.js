define([
  'vue',
  'util/diceRoller',
  'text!./rollMethodBasic.html'
], function (Vue, diceRoller, rollMethodBasicTemplate) {

  return {
    template: rollMethodBasicTemplate,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    },
    methods: {
      rollStats: function () {
        console.log(diceRoller.roll(3, 6));
      }
    }
  };

});