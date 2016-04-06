# FaD Game Table

a [Sails](http://sailsjs.org) application

### DevOps to do:

 - set up SSL for all apps w/nginx and let's encrypt
 - make a kitchen sink page for css/js components
 - set up grunt-autoprefixer https://github.com/nDmitry/grunt-autoprefixer
 - Set up symlink script and store pre-commit hook in the repo: http://stackoverflow.com/questions/3462955/putting-git-hooks-into-repository/3464399#3464399

### Dev to do:

 - set up chat message service and config to consistently parse out appropriately structured chat messages
 - set up a GameLog Model to store game chat - load in deferred after other game data loads to prevent front loading the same controller request
 - sockets...
 - ... crawl added/published !!!
 - ... game chat message
 - validate crawl url on back end
 - Cache bust production app javascript
 - set up TTL for tokens: https://www.npmjs.com/package/sails-hook-ttl

### Post Launch

 - Show player online indicator on game page
 - sockets...
 - ... on player join game
 - abstract more heavy controller functionality to services

### Setup

Copy the following to config/local.js and fill in values:

```javascript
module.exports = {
  email: {
    noreply: {
      address: 'gmail email address',
      password: 'gmail app password'
    }
  },

  hash: 'unique hash',

  fadApi: {
    url: 'http://localhost:1338/',
    key: 'your api key here'
  },
};
```

run the following from the console


```bash
npm install -g sails
cd /path/to/repo
npm install && sails lift
```

### Custom Tasks

#### Component Scaffold

```bash
grunt component --name=myComponent --parent=common
```

This command will create a new Vue.js component in /assets/js/components/common with all the necessary files for a component to work, including a testing spec scaffold.

The parent attribute is optional, and tells the generator where in the components folder to place the new component.
