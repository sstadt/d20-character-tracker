
/**
 *
 * Rolled Dice Template
 * -----------------------------------
 *
 * A list of die icons to indicate what dice were rolled to
 * generate a roll result.
 *
 * This is pretty obnoxious, but because these die icons
 * need to be inline, the best option for readability is to
 * generate the template with underscore to avoid extra
 * padding imposed by line breaks.
 *
 */

var dieTypes = _.extend(require('../../../config/constants.js').dieTypes);

var _rolledDiceTemplate = '<span v-if="item.message.results.<%= type %>"><icon v-for="n in item.message.results.<%= type %>.length" name="die-<%= type %>"></icon></span>',
  rolledDiceTemplate = _.template(_rolledDiceTemplate),
  rolledDice = dieTypes.map(function (type) {
    return rolledDiceTemplate({ type: type });
  }).join('');

module.exports = rolledDice;
