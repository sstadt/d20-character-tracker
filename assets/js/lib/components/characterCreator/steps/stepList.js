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
  'text!./stepTemplate.html'
], function (_, _stepTemplate) {
  'use strict';

  var stepTemplate = _.template(_stepTemplate),
    returnTemplates = {},
    steps = [
      'persona',
      'class'
    ];

  for (var i = 0, j = steps.length; i < j; i++) {
    returnTemplates[steps[i]] = stepTemplate({ step: steps[i] });
  }

  return returnTemplates;
});