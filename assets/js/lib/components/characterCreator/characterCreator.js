define([
  'jquery',
  'lodash',
  'vue',
  './steps/stepTemplates',
  'text!./steps/_step.html',
  'text!./characterCreator.html',
], function ($, _, Vue, steps, stepTemplateBase, characterCreatorTemplateBase) {
  'use strict';

  var stepTemplate = _.template(stepTemplateBase),
    characterCreatorTemplate = _.template(characterCreatorTemplateBase),
    stepListTemplate = '';

  _.each(steps, function (step, index) {
    console.log(steps.length, index);
    stepListTemplate += stepTemplate({
      index: index + 1,
      first: index === 0,
      last: index + 1 >= steps.length,
      step: step
    });
  });

  Vue.component('characterCreator', {
    template: characterCreatorTemplate({ steps: stepListTemplate }),
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    },
    ready: function () {
      $(document).foundation('orbit', 'reflow');
    }
  });

});