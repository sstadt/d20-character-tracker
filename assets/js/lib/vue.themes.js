
/**
 * Default Theme
 */
Vue.material.registerTheme('default', {
  primary: {
    color: 'indigo',
    hue: 900
  },
  accent: 'deep-orange',
  warn: 'red'
});

/**
 * StarWars Theme
 *
 * Used when accent elements shoud have the yellow
 * Star Wars color.
 */
Vue.material.registerTheme('starwars', {
  primary: 'light-blue',
  accent: 'yellow'
});
