define([
  'vue',
  'text!./attributesEditor.html'
], function (Vue, attributesEditorTemplate) {

  var rollMethods = [
      {
        value: '3d6',
        description: 'Roll 3d6'
      },
      {
        value: '4d6',
        description: 'Roll 3d6, drop lowest'
      },
      {
        value: 'manual',
        description: 'Manually increase/decrease statistics from a pool of points'
      }
    ];

  Vue.component('attributesEditor', {
    template: attributesEditorTemplate,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    },
    data: function () {
      return {
        currentRollMethod: rollMethods[0].value,
        rollMethods: rollMethods
      };
    }
  });

});