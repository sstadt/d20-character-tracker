
var user1 = {
    id: "1",
    chatHandle: "Scott"
  },
  user2 = {
    id: "2",
    chatHandle: "bob"
  },
  user3 = {
    id: "3",
    chatHandle: "Joe"
  };

module.exports = {
  user1: _.clone(user1),
  user2: _.clone(user2),
  user3: _.clone(user3),
  game: { // test game
    id: "1",
    title: "test game",
    gameMaster: _.clone(user1),
    players: [_.clone(user2)],
    requestingPlayers: [_.clone(user3)],
    crawls: [{
      id: "1",
      title: "Episode IV",
      subtitle: "Blue Harvest",
      crawl: "Something, something, something, DARK SIDE!!!\n\nSomething, something, something, COMPLETE!!!",
      imageUrl: "http://www.somelink.com/image.jpg",
      published: true,
      createdAt : "2016-04-12T13:53:53.767Z",
      game: "1"
    }, {
      id: "2",
      title: "Episode V",
      subtitle: "Another Title",
      crawl: "Something, something, something, DARK SIDE!!!\n\nSomething, something, something, COMPLETE!!!",
      imageUrl: "http://www.somelink.com/image.jpg",
      published: true,
      createdAt : "2063-04-05T13:53:53.767Z", // first contact day !!! - this should test as the selected crawl
      game: "1"
    }, {
      id: "3",
      title: "Episode IV",
      subtitle: "Blue Harvest",
      crawl: "Something, something, something, DARK SIDE!!!\n\nSomething, something, something, COMPLETE!!!",
      imageUrl: "http://www.somelink.com/image.jpg",
      published: false,
      createdAt : "2016-04-12T13:53:53.767Z",
      game: "1"
    }],
    config: {
      isPublic: true
    }
  },
  log: { // test game log
    id: "1",
    game: "1",
    log: [{
      type: "chat",
      chatHandle: "Scott",
      timeStamp: "2016-04-11T20:47:10.999Z",
      message: "hello there"
    }, {
      type: "roll",
      chatHandle: "Scott",
      timeStamp: "2016-04-12T13:52:38.054Z",
      message: {
        description: "test roll",
        overallResults: { success: 0, advantage: 1, triumph: 0, failure: 1, threat: 1, despair: 0, light: 0, dark: 0 },
        results: {
          ability: [{ advantage: 1 }, {}, {}],
          setback: [{ failure: 1 }, { threat: 1 }]
        }
      }
    }, {
      type: "crawl",
      chatHandle: "Scott",
      timeStamp: "2016-04-12T13:53:53.772Z",
      message: {
        id: "1",
        title: "Episode IV",
        subtitle: "Blue Harvest",
        crawl: "Something, something, something, DARK SIDE!!!\n\nSomething, something, something, COMPLETE!!!",
        imageUrl: "http://www.somelink.com/image.jpg",
        published: true,
        game: "1"
      }
    }]
  }
};
