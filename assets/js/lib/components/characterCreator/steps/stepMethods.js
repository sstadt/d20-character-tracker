
/**
 * 
 * Steps
 * ----------------------------
 * 
 * Returns an object of step templates
 * 
 */

define([
  './templates/persona.js',
  './templates/attributes.js',
  './templates/class.js',
], function (personaMethods, attributesMethods, classMethods) {
  'use strict';

  return {
    persona: personaMethods,
    attributes: attributesMethods,
    class: classMethods
  };
});
