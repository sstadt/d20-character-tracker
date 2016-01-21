define([
  'lodash',
  'vue',
  'text!./attributesEditorTemplate.html',
  './rollMethodBasic/rollMethodBasicComponent',
  './rollMethodBestOfFour/rollMethodBestOfFourComponent'
], function (_, Vue, attributesEditorTemplate, rollMethodBasic, rollMethodBestOfFour) {

  var rollMethods = [{
      value: 'basic',
      title: 'Basic',
      description: 'Roll 3d6'
    }, {
      value: 'bestOfFour',
      title: 'Best of 4',
      description: 'Roll 4d6, drop lowest'
    }];

  return {
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
    },
    components: {
      basic: rollMethodBasic,
      bestOfFour: rollMethodBestOfFour
    },
    filters: {
      rollMethodDescription: function (rollValue) {
        var method = _.find(rollMethods, function (rollMethod) {
          return rollMethod.value === rollValue;
        });

        return method.description;
      }
    }
  };

});