# FaD Game Table

a [Sails](http://sailsjs.org) application

### DevOps to do:

 - make a kitchen sink page for css/js components
 - set up grunt-autoprefixer https://github.com/nDmitry/grunt-autoprefixer
 - Set up symlink script and store pre-commit hook in the repo: http://stackoverflow.com/questions/3462955/putting-git-hooks-into-repository/3464399#3464399

### Dev to do:

 - sockets...
 - ... game chat message
 - ... on player join game
 - ... on player invited - feature on hold
 - ... on player accepted - feature on hold
 - ... player online - feature on hold
 - ... player offline - feature on hold
 - validate crawl url on back end
 - Cache bust production app javascript
 - set up TTL for tokens: https://www.npmjs.com/package/sails-hook-ttl
 - set up CSRF globally: https://github.com/balderdashy/sails.io.js/blob/master/README.md#set-global-headers-to-be-used-with-each-socket-request

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
