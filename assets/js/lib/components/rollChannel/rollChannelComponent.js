
define([
  'text!./rollChannelTemplate.html'
], function (rollChannelTemplate) {

  return {
    template: rollChannelTemplate,
    data: function () {
      return {
        greeting: 'rollChannel component',
      };
    },
    methods: {
      sayHi: function () {
        console.log('hi!');
      }
    }
  };

});
