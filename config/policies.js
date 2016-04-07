/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': 'sessionAuth',

  '/': true,

  SessionController: {
    '*'       : ['flash', true],
    'destroy' : 'sessionAuth'
  },

  UserController: {
    '*'         : ['flash', true],
    'create'    : true,
    'show'      : 'sessionAuth',
    'search'    : false,
    'self'      : 'sessionAuth',
    'setHandle' : 'sessionAuth',
    'sandbox'   : 'dev',
    'destroy'   : false
  },

  // TODO remove this and associated controller/model once functionality is integrated into game
  RollController: {
    '*'       : 'socketSessionAuth',
    'index'   : 'dev',
    'destroy' : false,
    'update'  : false
  },

  ChannelController: {
    '*'     : false,
    'join'  : 'socketSessionAuth',
    'leave' : 'socketSessionAuth'
  },

  GameController: {
    '*'             : false,
    'browser'       : ['sessionAuth'],
    'show'          : ['sessionAuth',       'gamePlayer'],
    'get'           : ['socketSessionAuth', 'gamePlayer'],
    'playing'       : ['socketSessionAuth'],
    'search'        : ['socketSessionAuth'],
    'create'        : ['socketSessionAuth'],
    'updateConfig'  : ['socketSessionAuth', 'gameMaster'],
    'addCrawl'      : ['socketSessionAuth', 'gameMaster'],
    'join'          : ['socketSessionAuth'],
    'approvePlayer' : ['socketSessionAuth', 'gameMaster'],
    'declinePlayer' : ['socketSessionAuth', 'gameMaster'],
    'removePlayer'  : ['socketSessionAuth', 'gameMaster']
  },

  GameLogController: {
    '*'          : false, // Game controller is responsible for creation/deletion
    'get'        : ['socketSessionAuth', 'gamePlayer'],
    'addMessage' : ['socketSessionAuth', 'gamePlayer'],
    'addRoll'    : ['socketSessionAuth', 'gamePlayer']
  },

  CrawlController: {
    '*'       : false,
    'update'  : ['socketSessionAuth', 'gameMaster'],
    'destroy' : ['socketSessionAuth', 'gameMaster']
  },

  ApiController: {
    '*'     : false,
    'index' : true,
    'show'  : true
  }
};
