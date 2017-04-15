
var config = require('../../lib/config.js');

var storageService = require('../../services/storageService.js');

var CombatantToken = require('../../classes/CombatantToken.js');
var Service = require('../../classes/Service.js');

var util = require('../../lib/util.js');

module.exports = {
  template: require('./encounterTemplate.html'),
  props: {
    game: {
      type: String,
      required: true
    },
    map: {
      type: Object,
      default: {}
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
    },
    addMapTokens() {
      this.$emit('add-map-tokens', this.combatants);
    },
    healCombatant(type, id) {
      var self = this,
        index = util.getIndexById(self.combatants, id);

      if (type === 'strain') {
        if (self.combatants[index].currentStrain > 0) {
          self.combatants[index].currentStrain--;
          self.combatants[index].changed = true;
        }
      } else {
        if (self.combatants[index].currentWounds > 0) {
          self.combatants[index].currentWounds--;
          self.combatants[index].changed = true;
        }
      }
    },
    damageCombatant(type, id) {
      var self = this,
        index = util.getIndexById(self.combatants, id);

      if (type === 'strain') {
        if (self.combatants[index].strainThreshold > self.combatants[index].currentStrain) {
          self.combatants[index].currentStrain++;
          self.combatants[index].changed = true;
        }
      } else {
        if (self.combatants[index].woundThreshold > self.combatants[index].currentWounds) {
          self.combatants[index].currentWounds++;
          self.combatants[index].changed = true;
        }
      }
    },
    saveCombatant(combatantId) {
      var self = this,
        deferred = q.defer(),
        encounterId = self.encounter.id,
        index = util.getIndexById(self.combatants, combatantId),
        combatant = _.extend(self.combatants[index]);

      delete combatant.changed;

      self.gameService.updateCombatant({ encounterId, combatant })
        .fail(function (reason) {
          self.$emit('error', reason.err);
        })
        .done(() => deferred.resolve());

      return deferred.promise;
    }
  }
};
