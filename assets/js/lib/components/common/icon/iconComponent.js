
define([
  'text!./iconTemplate.html'
], function (iconTemplate) {

  return {
    template: iconTemplate,
    props: ['name']
  };

});
