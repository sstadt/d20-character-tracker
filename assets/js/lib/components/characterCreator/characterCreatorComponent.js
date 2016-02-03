
/**
 * 
 * character-creator
 * ----------------------------
 *
 * Builds a wizard for character creation from steps.
 *
 * To add a new step
 * 
 *   1) add a child component with the 'Editor' suffix:
 *     grunt component --name=newEditor --parent=characterCreator/steps
 *   2) import the component bootstrapper
 *     ...
 *     './steps/newEditor/newEditor',
 *     ...
 *   3) add the component name to ./steps/stepList.js
 *     steps = [
 *       ...
 *       'new',
 *       ...
 *     ];
 *   4) add the child component to characterCreator
 *     components: {
 *       ...
 *       new: generateStepComponent(stepList.new, { prev: 'persona', next: 'career' }),
 *       ...
 *     },
 * 
 */

define([
  'constants',
  'lodash',
  'vue',
  'class/Character',
  'text!./characterCreatorTemplate.html',
  './steps/stepList',
  './steps/personaEditor/personaEditor',
  './steps/raceEditor/raceEditor',
  './steps/careerEditor/careerEditor'
], function (constants, _, Vue, Character, characterCreatorTemplate, stepList) {
  'use strict';

  var characterCreatorEvents = {},
    firstStep = 'persona';

  function ChangeStep(newStep) {
    this.currentStep = newStep;
  }

  function CloseCharacterCreator(reset) {
    this.currentStep = firstStep;
    this.show = false;
    return true; // allow event propagation to continue
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

  characterCreatorEvents[constants.events.characterCreator.changeTab] = ChangeStep;
  characterCreatorEvents[constants.events.characterCreator.addCharacter] = CloseCharacterCreator;

  return {
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
        show: false,
        currentStep: firstStep
      };
    },
    components: {
      persona: generateStepComponent(stepList.persona, { next: 'race' }),
      race: generateStepComponent(stepList.race, { prev: 'persona', next: 'career' }),
      career: generateStepComponent(stepList.career, { prev: 'race', last: true })
    },
    methods: {
      changeStep: ChangeStep,
      startCharacterCreator: function (reset) {
        if (reset && reset === true) this.character = new Character();
        this.show = true;
      }
    },
    created: function () {
      if (_.isUndefined(this.character)) {
        this.character = new Character();
      }
    }
  };

});
