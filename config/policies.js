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
    '*'       : true,
    'destroy' : 'socketSessionAuth'
  },

  UserController: {
    '*'           : ['flash', true],
    'search'      : false,
    'destroy'     : false,
    'create'      : true,
    'show'        : 'sessionAuth',
    'self'        : 'socketSessionAuth',
    'setHandle'   : 'socketSessionAuth',
    'uploadPhoto' : 'socketSessionAuth'
  },

  DevController: {
    '*' : 'dev'
  },

  GameController: {
    '*'               : false,
    'browser'         : ['sessionAuth'],
    'show'            : ['sessionAuth',       'gamePlayer'],

    'playing'         : ['socketSessionAuth'],
    'search'          : ['socketSessionAuth'],
    'create'          : ['socketSessionAuth'],
    'join'            : ['socketSessionAuth'],

    'updateConfig'    : ['socketSessionAuth', 'gameMaster'],
    'addCrawl'        : ['socketSessionAuth', 'gameMaster'],
    'approvePlayer'   : ['socketSessionAuth', 'gameMaster'],
    'declinePlayer'   : ['socketSessionAuth', 'gameMaster'],
    'removePlayer'    : ['socketSessionAuth', 'gameMaster'],
    'rollDestinyPool' : ['socketSessionAuth', 'gameMaster'],

    'get'             : ['socketSessionAuth', 'gamePlayer']
  },

  GameLogController: {
    '*'               : false, // Game controller is responsible for creation/deletion
    'addCrawl'        : ['socketSessionAuth', 'gameMaster'],

    'get'             : ['socketSessionAuth', 'gamePlayer'],
    'addMessage'      : ['socketSessionAuth', 'gamePlayer'],
    'addRoll'         : ['socketSessionAuth', 'gamePlayer'],
    'useDestinyToken' : ['socketSessionAuth', 'gamePlayer']
  },

  CrawlController: {
    '*'       : false,
    'update'  : ['socketSessionAuth', 'gameMaster'],
    'destroy' : ['socketSessionAuth', 'gameMaster']
  },

  MapController: {
    '*'           : false,
    'create'      : ['socketSessionAuth', 'gameMaster'],
    'update'      : ['socketSessionAuth', 'gameMaster'],
    'destroy'     : ['socketSessionAuth', 'gameMaster'],

    'get'         : ['socketSessionAuth', 'gamePlayer'],
    'addToken'    : ['socketSessionAuth', 'gamePlayer'],
    'moveToken'   : ['socketSessionAuth', 'moveMapToken'],
    'removeToken' : ['socketSessionAuth', 'removeMapToken']
  },

  EncounterController: {
    '*'               : false,
    'get'             : ['socketSessionAuth', 'gamePlayer'],
    'addCombatant'    : ['socketSessionAuth', 'gameMaster'],
    'removeCombatant' : ['socketSessionAuth', 'gameMaster'],
    'updatecombatant' : ['socketSessionAuth', 'gameMaster'],
    'clearEncounter'  : ['socketSessionAuth', 'gameMaster']
  },

  CharacterController: {
    '*'        : false,
    'get'      : ['socketSessionAuth'],
    'getParty' : ['socketSessionAuth', 'gamePlayer'],
    'create'   : ['socketSessionAuth'],
    'update'   : ['socketSessionAuth', 'characterOwner'],
    'destroy'  : ['socketSessionAuth', 'characterOwner']
  },

  ApiController: {
    '*'     : false,
    'index' : true,
    'show'  : true
  }
};
