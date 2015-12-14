
/**
 * 
 * Steps
 * ----------------------------
 * 
 * Returns an object of step templates
 * 
 */

define([
  'lodash',
  'text!./_step.html',
  'text!./templates/persona.html',
  'text!./templates/attributes.html',
  'text!./templates/class.html',
], function (_, _stepTemplate, personaTemplate, attributesTemplate, classTemplate) {
  'use strict';

  var stepTemplate = _.template(_stepTemplate);

  return {
    persona: stepTemplate({ step: personaTemplate }),
    attributes: stepTemplate({ step: attributesTemplate }),
    class: stepTemplate({ step: classTemplate })
  };
});
