
var config = require('../../lib/config.js');

var storageService = require('../../services/storageService.js');

var CombatantToken = require('../../classes/CombatantToken.js');
var Service = require('../../classes/Service.js');

module.exports = {
  template: require('./encounterTemplate.html'),
  props: {
    game: {
      type: String,
      required: true
    },
    encounter: {
      type: Object,
      required: true
    },
    perRow: {
      type: Number,
      default: 5
    },
    npcs: {
      type: Array,
      default: []
    },
    avatarSize: {
      type: Number,
      default: 60
    },
    isGm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hovering: false,
      favorites: storageService.getLocal(config.localStorageKeys.npcFavorites, { defaultsTo: [], onUpdate: this.favoritesUpdated }),
      combatants: this.encounter.npcs,
      gameService: undefined
    };
  },
  computed: {
    encounterWidthPx() {
      var width = (this.avatarSize + 40) * this.perRow;
      return `${width}px`;
    },
    showMenu() {
      return this.encounter.npcs.length === 0 || this.hovering;
    }
  },
  created() {
    var self = this;

    self.gameService = new Service({
      schema: config.endpoints.game,
      staticData: {
        gameId: self.game
      }
    });
  },
  watch: {
    'encounter.npcs'(newCombatants) {
      this.combatants = newCombatants;
    }
  },
  methods: {
    enter() {
      this.hovering = true;
    },
    leave() {
      this.hovering = false;
    },
    favoritesUpdated(favorites) {
      this.favorites = favorites;
    },
    addCombatant(npc) {
      var self = this,
        encounterId = self.encounter.id,
        combatant = new CombatantToken(npc),
        deferred = q.defer();

      self.gameService.addCombatant({ encounterId, combatant })
        .fail(function (reason) {
          self.$emit('error', reason.err);
        }).done(() => deferred.resolve());

      return deferred.promise;
    },
    clearCombatants() {
      this.$refs.clearEncounterConfirm.open();
    },
    confirmClear(type) {
      var self = this,
        encounterId = self.encounter.id,
        deferred = q.defer();

      if (type === 'ok') {
        self.gameService.clearEncounter({ encounterId })
          .fail(function (reason) {
            self.$emit('error', reason.err);
          }).done(() => deferred.resolve());
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    }
  }
};
