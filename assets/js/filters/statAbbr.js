
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
