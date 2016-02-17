
define([
  'text!./rollLogTemplate.html'
], function (rollLogTemplate) {

  return {
    template: rollLogTemplate,
    data: function () {
      return {
        greeting: 'rollLog component',
      };
    },
    methods: {
      sayHi: function () {
        console.log('hi!');
      }
    }
  };

});
