
define([
  'text!./<%- name %>Template.html'
], function (<%- name %>Template) {

  return {
    template: <%- name %>Template,
    data: function () {
      return {
        greeting: '<%- name %> component',
      };
    }
  };

});
