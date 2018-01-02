
Vue.filter('skillAbbr', function (value) {
  var abbrVal,
    prefix;

  if (value.indexOf('Knowledge: ') > -1) {
    prefix = 'Kno.';
  }

  if (value.indexOf('Piloting: ') > -1) {
    prefix = 'Pil.';
  }

  if (!_.isUndefined(prefix)) {
    let name = value.substr(value.indexOf(' '));
    abbrVal = `${prefix} ${name}`;
  }

  return abbrVal || value;
});
