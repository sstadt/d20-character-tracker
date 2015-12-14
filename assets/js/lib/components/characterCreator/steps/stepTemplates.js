
/**
 * 
 * stepTemplate
 * ----------------------------
 * 
 * A listing of the various templates used for the
 * character creator steps
 * 
 */

define([
  'text!./persona.html',
  'text!./attributes.html',
  'text!./class.html',
], function (personaTemplate, attributesTemplate, classTemplate) {
  'use strict'

  return [
    personaTemplate,
    attributesTemplate,
    classTemplate
  ];
});
