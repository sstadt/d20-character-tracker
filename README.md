# FaD Character Tracker

a [Sails](http://sailsjs.org) application

### DevOps to do:

 - Set up symlink script and store pre-commit hook in the repo: http://stackoverflow.com/questions/3462955/putting-git-hooks-into-repository/3464399#3464399

### Dev to do:

 - move all socket calls to service files so the components can be better isolated for unit testing

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

run the following fromt he console


```bash
npm install -g sails
cd /path/to/repo
npm install && bower install
sails lift
```

### Custom Tasks

#### Component Scaffold

```bash
grunt component --name=myComponent --parent=common
```

This command will create a new Vue.js component in /assets/js/lib/components/common with all the necessary files for a component to work, including a testing spec scaffold.

The parent attribute is optional, and tells the generator where in the components folder to place the new component.
