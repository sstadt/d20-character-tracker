/**
 *
 * Steps
 * ----------------------------
 *
 * Returns an object of step templates
 *
 */

var _stepTemplate = require('./stepTemplate.html');

var stepTemplate = _.template(_stepTemplate),
  returnTemplates = {},
  steps = [
    'persona',
    'species',
    'career'
  ];

for (var i = 0, j = steps.length; i < j; i++) {
  returnTemplates[steps[i]] = stepTemplate({ step: steps[i] });
}

module.exports = returnTemplates;
