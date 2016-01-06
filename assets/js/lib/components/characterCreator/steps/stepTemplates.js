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
  'text!./_step.html'
], function (_, _stepTemplate) {
  'use strict';

  var stepTemplate = _.template(_stepTemplate),
    returnTemplates = {},
    steps = [
      'persona',
      'attributes',
      'class'
    ];

  for (var i = 0, j = steps.length; i < j; i++) {
    returnTemplates[steps[i]] = stepTemplate({ step: steps[i] });
  }

  return returnTemplates;
});