
define([
  'q',
  'constants',
  'service/rollService',
  'text!./diceRollerTemplate.html',
  './rollChannels/rollChannels',
  './rollLog/rollLog',
  'component/dicePool/dicePool',
  'component/dieCounter/dieCounter'
], function (q, constants, rollService, diceRollerTemplate) {

  return {
    template: diceRollerTemplate,
    props: {
      chatHandle: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
        description: '',
        ability: 0,
        proficiency: 0,
        difficulty: 0,
        challenge: 0,
        boost: 0,
        setback: 0,
        force: 0,
        channel: { label: 'Roll Channel' },
        localRolls: [],
        channelRolls: []
      };
    },
    methods: {
      roll: function () {
        var self = this,
          deferred = q.defer(),
          dicePool = {
            description: self.description,
            ability: self.ability,
            proficiency: self.proficiency,
            difficulty: self.difficulty,
            challenge: self.challenge,
            boost: self.boost,
            setback: self.setback,
            force: self.force
          };

        if (self.channel.id) {
          dicePool.channel = self.channel.id;
        }

        rollService.roll(dicePool)
          .then(function success(result) {
            self.localRolls.unshift(result);
          }, function error(reason) {
            console.error(reason);
          })
          .done(function () {
            // resolve for unit testing
            deferred.resolve();
          });

        return deferred.promise;
      }
    }
  };

});
