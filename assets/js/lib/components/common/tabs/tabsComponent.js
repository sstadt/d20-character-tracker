
define([
  'text!./tabsTemplate.html'
], function (tabsTemplate) {

  return {
    template: tabsTemplate,
    data: function () {
      return {
        greeting: 'tabs component',
      };
    },
    methods: {
      sayHi: function () {
        console.log('hi!');
      }
    }
  };

});
