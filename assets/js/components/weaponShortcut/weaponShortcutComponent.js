
module.exports = {
  template: require('./weaponShortcutTemplate.html'),
  props: {
    weapon: {
      type: Object,
      required: true
    }
  },
  computed: {
    icon() {
      var icon = 'blaster';

      switch (this.weapon.skill) {
        case 'Brawl':
          icon = 'fist';
          break;
        case 'Melee':
        case 'Lightsaber':
          icon = 'lightsabers';
          break;
        case 'Ranged: Light':
          icon = 'blaster';
          break;
        case 'Ranged: Heavy':
          icon = 'heavy-blaster';
          break;
        case 'Gunnery':
          icon = 'gunnery';
          break;

      }

      return icon;
    }
  }
};
