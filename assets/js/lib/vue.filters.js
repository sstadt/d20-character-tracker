
/**
 * Chat Timestamp
 *
 * Use this filter to add a timestamp to chat messages
 */
Vue.filter('chatTimestamp', function (value) {
  var date = moment(value);
  return date.isValid() ? date.format('MMM Do, YYYY - h:mm A') : 'Invalid Date';
});

/**
 * Stat Abbreviation
 *
 * Use this filter to abbreviate statistics.
 * Unknown statistics will return '???'
 */
Vue.filter('statAbbr', function (value) {
  var abbr = '???';

  switch (value.toLowerCase()) {
    case 'brawn':
      abbr = 'br';
      break;
    case 'agility':
      abbr = 'agi';
      break;
    case 'intellect':
      abbr = 'int';
      break;
    case 'cunning':
      abbr = 'cun';
      break;
    case 'willpower':
      abbr = 'will';
      break;
    case 'presence':
      abbr = 'pr';
      break;
  }

  return abbr;
});
