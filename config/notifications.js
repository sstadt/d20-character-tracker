
/**
 * Notification Settings
 * ---------------------
 *
 * Server rendered notification copy
 *
 * Error msg convention
 *
 * x00  : invalid request
 * x01  : access denied
 * x02  : operation forbidden
 * x04  : not found
 * x10+ : custom
 *
 */

var passwordConfig = require('./passwords.js').passwords;

module.exports.notifications = {

  // 100
  General: {
    error: {
      databaseError: {
        code: 105,
        message: 'Database Error'
      },
      cannotUploadFile: {
        code: 110,
        message: 'Unable to upload file.'
      }
    }
  },

  // 200
  Session: {
    error: {
      logoutError: {
        code: 210,
        message: 'There was an error logging you out'
      },
      missingPassword: {
        code: 211,
        message: 'You must enter both a username and password'
      },
      mustBeLoggedIn: {
        code: 211,
        message: 'You must be logged in to perform this action'
      }
    }
  },

  // 300
  Password: {
    complexity: {
      error: {
        noLowercase: {
          code: 310,
          message: 'Password must contain at least one lowercase letter'
        },
        noUppercase: {
          code: 311,
          message: 'Password must contain at least one uppercase letter'
        },
        noNumber: {
          code: 312,
          message: 'Password must contain at least one number'
        },
        noSpecial: {
          code: 313,
          message: 'Password must contain at least one special character'
        },
      }
    },
    security: {
      error: {
        misMatch: {
          code: 314,
          message: 'Passwords do not match'
        },
        notMinLength: {
          code: 315,
          message: 'Password must contain at least ' + passwordConfig.minLength + ' characters'
        },
        notMaxLength: {
          code: 316,
          message: 'Password may not contain more than ' + passwordConfig.maxLength + ' characters'
        }
      }
    },
    validation: {
      error: {
        serverError: {
          code: 317,
          message: 'There was an error logging you in'
        },
        invalidPassword: {
          code: 318,
          message: 'Invalid username and password combination'
        }
      }
    }
  },

  // 400
  Token: {
    error: {
      cannotResendValidation: {
        code: 410,
        message: 'Error creating validation key.'
      },
      notFound: {
        code: 411,
        message: 'Error retrieving key'
      }
    }
  },

  // 500
  User: {
    success: {
      passwordReset: 'Your password was successfully reset!',
      passwordResetSent: 'Success! Check your email for instruction to reset your password',
      verificationSent: 'Check your email to verify your account',
      verified: 'Account verified, you may now log in!'
    },
    error: {
      notFound: {
        code: 504,
        message: 'User not found'
      },
      cannotCreateUser: {
        code: 510,
        message: 'We could not sign you up at this time, please try again later'
      },
      cannotResetPassword: {
        code: 511,
        message: 'Unable to reset your password at this time'
      },
      cannotRegister: {
        code: 512,
        message: 'Registration could not be completed at this time'
      },
      cannotVerify: {
        code: 513,
        message: 'Could not activate your account at this time'
      },
      duplicateEmail: {
        code: 514,
        message: 'That email address is already in use'
      },
      duplicateChatHandle: {
        code: 515,
        message: 'That chat handle is already in use'
      },
      notVerified: {
        code: 516,
        message: 'You must verify your account before logging in.'
      }
    }
  },

  // 600
  Game: {
    general: {
      error: {
        accessDenied: {
          code: 601,
          message: 'You do not have permission to access this game'
        },
        editDenied: {
          code: 602,
          message: 'You do not have permission to edit this game'
        },
        gameNotFound: {
          code: 604,
          message: 'Game not found'
        },
        errorFindingGame: {
          code: 610,
          message: 'Error retrieving game'
        },
        playerNotFound: {
          code: 611,
          message: 'Player not found'
        },
        logNotFound: {
          code: 612,
          message: 'Game log not found'
        }
      }
    },
    dice: {
      error: {
        invalidPool: {
          code: 630,
          message: 'Invalid dice pool'
        },
        invalidDestinyToken: {
          code: 631,
          message: 'Invalid destiny token type'
        },
        noPlayersForDestinyPool: {
          code: 632,
          message: 'Cannot roll destiny pool without players'
        }
      }
    },
    crawl: {
      error: {
        invalidCrawl: {
          code: 640,
          message: 'Invalid Crawl'
        }
      }
    },
    map: {
      error: {
        notFound: {
          code: 650,
          message: 'Map not found'
        },
        listNotFound: {
          code: 651,
          message: 'Maps not found'
        },
        cannotCreate: {
          code: 652,
          message: 'Error creating map'
        },
        cannotUpdate: {
          code: 653,
          message: 'Error updating map'
        },
        cannotDelete: {
          code: 654,
          message: 'Error deleting map'
        },
        tokenExists: {
          code: 655,
          message: 'Token is already on the map'
        },
        cannotAddToken: {
          code: 656,
          message: 'Error adding token to map'
        },
        cannotRemoveToken: {
          code: 657,
          message: 'Error removing token'
        },
        cannotMoveToken: {
          code: 658,
          message: 'Error moving token'
        },
        invalidCoordinates: {
          code: 659,
          message: 'Error moving token'
        }
      }
    }
  }

};
