
/**
 *
 * Constants
 * ----------------------------
 *
 */

var tempGameData = require('../../../config/tempGameData.js');

module.exports = {

  /*
   * Die Types - pulled from BE
   * ----------------------------
   */
  dieTypes: require('../../../config/taskDice.js').taskDice.dieTypes,

  /*
   * Skills - pulled from BE
   * ----------------------------
   */
  skills: tempGameData.gameData.skills,

  /*
   * Range Bands - pulled from BE
   * ----------------------------
   */
  rangeBands: tempGameData.gameData.rangeBands,

  /*
   * Endpoints
   * ----------------------------
   */
  endpoints: {
    auth: {
      login: '/session/create',
      logout: '/session/destroy',
      signup: '/user/create',
      verify: '/user/verify',
      resendValidation: '/user/resend',
      resetPassword: '/resetpassword',
      requestReset: '/requestreset'
    },
    user: {
      getSelf: '/self',
      setHandle: '/user/setHandle'
    },
    game: {
      getGame: '/game/get',
      getLog: '/game/getLog',
      search: '/game/search',
      getMyGames: '/game/playing',
      create: '/game/create',
      updateConfig: '/game/updateConfig',
      addCrawl: '/game/addCrawl',
      updateCrawl: '/crawl/update',
      deleteCrawl: '/crawl/destroy',
      join: '/game/join',
      approvePlayer: '/game/approvePlayer',
      declinePlayer: '/game/declinePlayer',
      removePlayer: '/game/removePlayer',
      sendMessage: '/game/sendMessage',
      sendCrawl: '/game/sendCrawl',
      sendRoll: '/game/sendRoll',
      rollDestinyPool: '/game/rollDestinyPool',
      useDestinyToken: '/game/useDestinyToken',
      getMaps: '/map/get',
      createMap: '/map/create',
      updateMap: '/map/update',
      deleteMap: '/map/destroy',
      addMapToken: '/map/addToken',
      removeMapToken: '/map/removeToken',
      deleteMapToken: '/map/removeToken',
      moveMapToken: '/map/moveToken',
      getNpcs: '/npc/get',
      createNpc: '/npc/create',
      updateNpc: '/npc/update',
      deleteNpc: '/npc/destroy',
    }
  }

};
