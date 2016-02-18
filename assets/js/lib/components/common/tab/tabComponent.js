
define([
  'text!./tabTemplate.html'
], function (tabTemplate) {

  return {
    template: tabTemplate,
    data: function () {
      return {
        greeting: 'tab component',
      };
    },
    methods: {
      sayHi: function () {
        console.log('hi!');
      }
    }
  };

});
