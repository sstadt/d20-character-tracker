
var testGames = [{
  title: 'Twilight of the Republic',
  description: 'lorem ipsum dolor sit amet'
}, {
  title: 'Rise of the Empire',
  description: 'lorem ipsum dolor sit amet'
}, {
  title: 'Rebellion',
  description: 'lorem ipsum dolor sit amet'
}, {
  title: 'The Force Awakens',
  description: 'lorem ipsum dolor sit amet'
}];

module.exports = {
  template: require('./gameBrowserTemplate.html'),
  data: function () {
    return {
      myGames: testGames,
      filteredGames: []
    };
  }
};
