
/**
 *
 * Constants
 * ----------------------------
 *
 */

module.exports = {

  /*
   * Die Types - pulled from BE
   * ----------------------------
   */
  dieTypes: require('../../../config/taskDice.js').taskDice.dieTypes,

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
      resendVerification: '/user/resend',
      resetPassword: '/resetpassword',
      requestReset: '/requestreset'
    },
    dice: {
      roll: '/roll'
    },
    channel: {
      join: '/channel/join',
      leave: '/channel/leave'
    },
    user: {
      getSelf: '/self',
      setHandle: '/user/setHandle'
    },
    game: {
      get: '/game/get',
      getLog: '/game/getLog',
      search: '/game/search',
      playing: '/game/playing',
      create: '/game/create',
      updateConfig: '/game/updateConfig',
      addCrawl: '/game/addCrawl',
      updateCrawl: '/crawl/update',
      removeCrawl: '/crawl/destroy',
      join: '/game/join',
      approvePlayer: '/game/approvePlayer',
      declinePlayer: '/game/declinePlayer',
      removePlayer: '/game/removePlayer',
      sendMessage: '/game/sendMessage',
      sendCrawl: '/game/sendCrawl',
      sendRoll: '/game/sendRoll',
      rollDestinyPool: '/game/rollDestinyPool',
      useDestinyToken: '/game/useDestinyToken'
    }
  }

};
