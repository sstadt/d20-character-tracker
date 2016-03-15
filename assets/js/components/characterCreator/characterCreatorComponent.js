
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
 *   5) Add a test for the new step to characterCreator.Spec.js
 *
 */

var constants = require('../../config/constants.js');
var Character = require('../../classes/Character.js');
var characterCreatorTemplate = require('./characterCreatorTemplate.html');
var stepList = require('./steps/stepList');

require('./steps/personaEditor/personaEditor.js');
require('./steps/speciesEditor/speciesEditor.js');
require('./steps/careerEditor/careerEditor.js');

var characterCreatorEvents = {};
var firstStep = 'persona';

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

module.exports = {
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
    persona: generateStepComponent(stepList.persona, { next: 'species' }),
    species: generateStepComponent(stepList.species, { prev: 'persona', next: 'career' }),
    career: generateStepComponent(stepList.career, { prev: 'species', last: true })
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
