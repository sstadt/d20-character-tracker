
define([
  'text!./swDiceRollerTemplate.html'
], function (swDiceRollerTemplate) {

  return {
    template: swDiceRollerTemplate,
    data: function () {
      return {
        open: false
      };
    },
    methods: {
      toggleOpen: function () {
        this.open = !this.open;
      }
    }
  };

});
