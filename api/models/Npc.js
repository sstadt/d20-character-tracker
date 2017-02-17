/**
 * Npc.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 /*
 ---------------------

 NPCs need:

 abilities - default everything to 2
 soak value
 wound threshold
 strain threshold
 melee/ranged defense
 skills
 talents
 abilities
 equipment

 ---------------------
 */

module.exports = {

  attributes: {
    owner: {
      type: 'string',
      required: true
    },
    game: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      enum: ['minion', 'rival', 'nemesis'],
      required: true
    },
    imageUrl: {
      type: 'string',
      required: true
    },
    brawn: {
      type: 'integer',
      defaultsTo: 2
    },
    agility: {
      type: 'integer',
      defaultsTo: 2
    },
    intellect: {
      type: 'integer',
      defaultsTo: 2
    },
    cunning: {
      type: 'integer',
      defaultsTo: 2
    },
    willpower: {
      type: 'integer',
      defaultsTo: 2
    },
    presence: {
      type: 'integer',
      defaultsTo: 2
    },
    soak: {
      type: 'integer',
      defaultsTo: 0
    },
    woundThreshold: {
      type: 'integer',
      defaultsTo: 10
    },
    strainThreshold: {
      type: 'integer',
      defaultsTo: 0
    },
    defenseMelee: {
      type: 'integer',
      defaultsTo: 0
    },
    defenseRanged: {
      type: 'integer',
      defaultsTo: 0
    },
    skills: {
      type: 'array',
      defaultsTo: []
    },
    talents: {
      type: 'array',
      defaultsTo: []
    },
    abilities: {
      type: 'array',
      defaultsTo: []
    },
    equipment: {
      type: 'array',
      defaultsTo: []
    }
  }
};
