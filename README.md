# FaD Game Table

Code documentation can be found on deveo.com: https://app.deveo.com/scott-stadt/projects/star_wars_game_table/repositories/sw-game-table-wiki/tree/master

### Dev to do:

#### as able

 - handle draggable cursor better for dice pool, destiny tokens, and maps - should be a move/grab icon while dragging
 - set up csrf with all socket calls

#### testing todos

 - userProfile
 - game
 - gameBrowser
 - mapViewer
 - starWarsCrawl

### DevOps to do:

 - look into node reloader during dev: https://github.com/sgress454/sails-hook-autoreload

### Need more research

 - waterline isn't behaving as expected when querying against dates
 - ... need to figure out a TTL solution that will not infringe upon registration while expiring reset tokens after 24 hours
 - set up grunt-autoprefixer

### Setup

Copy the following to config/local.js and fill in values:

```javascript
module.exports = {
  email: {
    gmail: {
      address: 'your gmail testing address',
      password: 'app password for gmail testing address'
    },
    mailGunKey: 'mailgun API key' // production only
  },

  hash: 'unique hash', // https://www.grc.com/passwords.htm

  swApi: {
    url: 'http://localhost:1338/', //address/port API is being run on
    key: 'key from API interface'
  },
};
```

Install and start `mongod`: https://docs.mongodb.com/manual/installation/

In a separate terminal, run the following commands:

```bash
npm install -g sails
cd /path/to/project
npm install && sails lift
```
