/**
 * Map.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    game: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    imageUrl: {
      type: 'string',
      required: true
    },
    baseGrid: {
      type: 'float',
      defaultsTo: 1
    },
    shared: {
      type: 'boolean',
      defaultsTo: false
    },
    tokens: {
      type: 'array',
      defaultsTo: []
    }
  },

  // beforeValidate: function (map, done) {
  //   map.baseGrid = parseFloat(map.baseGrid);
  //   done();
  // },
  //
  // afterValidate: function (map, done) {
  //   map.baseGrid = String(map.baseGrid);
  //   done();
  // }
};

//   {
//     type: 'player', // player or npc
//     image: 'https://ssdcgametable.s3.amazonaws.com/profile_pictures/587bf3938ff6608e26252d2favatar_ph.jpg',
//     x: 0,
//     y: 0
//   }

// {
//   id: '1',
//   name: 'Galaxy',
//   image: 'https://s3.amazonaws.com/ssdcgametable/site_structure/sw_galaxymap.jpg',
//   baseGrid: 1,
//   tokens: []
// }, {
//   id: '2',
//   name: 'Dungeon',
//   image: 'https://s-media-cache-ak0.pinimg.com/736x/78/3b/1d/783b1d5e2d22c3afcecaf0d3721e35c4.jpg',
//   baseGrid: 1,
//   tokens: [{
//     type: 'player',
//     id: '1',
//     image: 'https://ssdcgametable.s3.amazonaws.com/profile_pictures/587bf3938ff6608e26252d2favatar_ph.jpg',
//     x: 0,
//     y: 0
//   }, {
//     type: 'npc',
//     id: '2',
//     image: 'https://www.sideshowtoy.com/photo_902536_thumb.jpg',
//     x: 0,
//     y: 0
//   }, {
//     type: 'npc',
//     id: '3',
//     image: 'https://www.sideshowtoy.com/photo_902536_thumb.jpg',
//     x: 0,
//     y: 0
//   }, {
//     type: 'npc',
//     id: '4',
//     image: 'https://www.sideshowtoy.com/photo_902536_thumb.jpg',
//     x: 0,
//     y: 0
//   }]
// }