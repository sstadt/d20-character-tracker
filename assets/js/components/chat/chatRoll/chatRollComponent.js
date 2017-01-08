
module.exports = {
  template: require('./chatRollTemplate.html'),
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
  computed: {
    rollDescription() {
      return (this.message.description.length > 0) ? this.message.description : 'rolled a dice pool';
    },
    isFailure() {
      return this.successes <= this.failures && this.failures > 0;
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
    }
  }
};
