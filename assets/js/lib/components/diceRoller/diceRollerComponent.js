
define([
  'text!./diceRollerTemplate.html'
], function (diceRollerTemplate) {

  return {
    template: diceRollerTemplate,
    data: function () {
      return {
        greeting: 'diceRoller component',
      };
    },
    methods: {
      sayHi: function () {
        console.log('hi!');
      }
    }
  };

});
