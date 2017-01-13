
module.exports = {
  template: require('./taskRollTemplate.html'),
  props: {
    chatHandle: {
      type: String,
      required: true
    },
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // this is solely for the purpose of controlling
      // die result ordering
      dieTypes: [
        'ability',
        'proficiency',
        'difficulty',
        'challenge',
        'boost',
        'setback',
        'force'
      ]
    };
  },
  computed: {
    rollDescription() {
      return (this.message.description.length > 0) ? this.message.description : 'rolled a dice pool';
    },
    isFailure() {
      return this.successes <= this.failures && this.failures > 0;
    },
    isSuccess() {
      return this.failures <= this.successes && this.successes > 0;
    },
    successes() {
      return this.message.overallResults.success + this.message.overallResults.triumph;
    },
    failures() {
      return this.message.overallResults.failure + this.message.overallResults.despair;
    },
    numSuccessIcons() {
      var successes = this.message.overallResults.success - this.message.overallResults.failure;
      return Math.max(successes, 0);
    },
    numFailureIcons() {
      var failures = this.message.overallResults.failure - this.message.overallResults.success;
      return Math.max(failures, 0);
    },
    showSuccessIcons() {
      return this.numSuccessIcons > 0 || this.message.overallResults.advantage > 0;
    },
    showFailIcons() {
      return this.numFailureIcons > 0 || this.message.overallResults.threat > 0;
    }
  },
  components: {
    taskDieResult: require('./taskDieResult/taskDieResultComponent.js')
  }
};
