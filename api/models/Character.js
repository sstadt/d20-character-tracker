/**
 * Character.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    owner: {
      type: 'string',
      required: true
    },
    game: {
      type: 'string',
      defaultsTo: null
    },
    name: {
      type: 'string',
      defaultsTo: 'New Character'
    },
    imageUrl: {
      type: 'string',
      defaultsTo: '/images/avatar_ph.jpg'
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
    equipment: {
      type: 'array',
      defaultsTo: []
    },
    description: {
      type: 'string',
      defaultsTo: ''
    },
    notes: {
      type: 'string',
      defaultsTo: ''
    }
  }
};
