
/**
 * 
 * character-creator
 * ----------------------------
 *
 * Builds a wizard for character creation from steps.
 *
 * To add a step:
 *
 *  1) Add a template to ./steps/stepTemplates.js
 *  2) Add a child componet to characterCreator
 * 
 */

define([
  'constants',
  'vue',
  'text!./characterCreator.html',
  './steps/stepTemplates'
], function (constants, Vue, characterCreatorTemplate, stepTemplates) {
  'use strict';

  var characterCreatorEvents = {};

  function changeStep(newStep) {
    this.currentStep = newStep;
  }

  function generateStepComponent(template, data) {
    return {
      template: template,
      props: {
        character: {
          type: Object,
          required: true,
          twoWay: true
        }
      },
      data: function () { return data; },
      methods: {
        changeStep: function (step) {
          this.$dispatch(constants.events.characterCreator.changeTab, step);
        },
        addCharacter: function () {
          this.$dispatch(constants.events.characterCreator.addCharacter);
        }
      }
    };
  }

  characterCreatorEvents[constants.events.characterCreator.changeTab] = changeStep;

  Vue.component('characterCreator', {
    template: characterCreatorTemplate,
    events: characterCreatorEvents,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    },
    data: function () {
      return {
        currentStep: 'persona'
      };
    },
    components: {
      persona: generateStepComponent(stepTemplates.persona, { next: 'attributes' }),
      attributes: generateStepComponent(stepTemplates.attributes, { next: 'class', prev: 'persona' }),
      class: generateStepComponent(stepTemplates.class, { prev: 'attributes', last: true })
    },
    methods: {
      changeStep: changeStep
    }
  });

});
