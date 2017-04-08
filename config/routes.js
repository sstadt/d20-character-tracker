/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  '/': {
    view: 'public/index'
  },

  /*
    Session
   */
  '/login': {
    controller: 'session',
    action: 'new'
  },
  '/logout': {
    controller: 'session',
    action: 'destroy'
  },

  /*
    User
   */
  '/profile': {
    controller: 'user',
    action: 'show'
  },
  '/register': {
    controller: 'user',
    action: 'new'
  },
  '/verify': {
    controller: 'user',
    action: 'verify'
  },
  '/self': {
    controller: 'user',
    action: 'self'
  },
  '/requestreset': {
    controller: 'user',
    action: 'sendResetEmail'
  },
  '/resetpassword': {
    controller: 'user',
    action: 'resetPassword'
  },

  /*
    Game
   */
  '/home': {
    controller: 'game',
    action: 'browser'
  },
  '/game/search': {
    controller: 'game',
    action: 'search'
  },
  '/play/:gameId': {
    controller: 'game',
    action: 'show'
  },
  '/game/get': {
    controller: 'game',
    action: 'get'
  },
  '/game/updateConfig': {
    controller: 'game',
    action: 'updateconfig'
  },
  '/game/join': {
    controller: 'game',
    action: 'join'
  },
  '/game/approvePlayer': {
    controller: 'game',
    action: 'approvePlayer'
  },

  /*
    Game Log
   */
  '/game/getLog': {
    controller: 'gameLog',
    action: 'get'
  },
  '/game/sendMessage': {
    controller: 'gameLog',
    action: 'addMessage'
  },
  '/game/sendCrawl': {
    controller: 'gameLog',
    action: 'addCrawl'
  },
  '/game/sendRoll': {
    controller: 'gameLog',
    action: 'addRoll'
  },
  '/game/useDestinyToken': {
    controller: 'gameLog',
    action: 'useDestinyToken'
  },

  /*
    Encounters
   */
  '/game/getEncounter': {
    controller: 'encounter',
    action: 'get'
  },
  '/game/updateEncounter': {
    controller: 'encounter',
    action: 'update'
  },
  '/game/addEncounterCombatant': {
    controller: 'encounter',
    action: 'addCombatant'
  },
  '/game/removeEncounterCombatant': {
    controller: 'encounter',
    action: 'removeCombatant'
  },
  '/game/updateEncounterCombatant': {
    controller: 'encounter',
    action: 'updateCombatant'
  },
  '/game/clearEncounter': {
    controller: 'encounter',
    action: 'clearEncounter'
  },

  /*
    FaD API
   */
  '/api/:model': {
    controller: 'api',
    action: 'index'
  },
  '/api/:model/:id': {
    controller: 'api',
    action: 'show'
  },

  /*
    Dev
   */
  '/dev/sandbox': {
    controller: 'dev',
    action: 'sandbox'
  },
  '/dev/icons': {
    controller: 'dev',
    action: 'icons'
  },

};
