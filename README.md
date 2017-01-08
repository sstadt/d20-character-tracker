# FaD Game Table

### Dev to do:

 - logging off is crashing the app
 - add ajax spinner to all auth component async operations
 - stylize email templates
 - spruce up the landing page
 - switch off of gmail for back end emails

### DevOps to do:

 - look into node reloader during dev: https://github.com/sgress454/sails-hook-autoreload
 - set up SSL for all apps w/nginx and let's encrypt https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04
 - make a kitchen sink page for css/js components

### Need more research

 - waterline isn't behaving as expected when querying against dates
 - ... need to figure out a TTL solution that will not infringe upon registration while expiring reset tokens after 24 hours
 - set up grunt-autoprefixer http://grunt-tasks.com/autoprefixer/
 - ... grunt peer dependency conflicts with multiple sails.js packages

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

#### Unit Testing

 - `grunt test` compiles vendor.js and runs unit tests
 - `grunt karma` runs unit tests without compiling vendor.js; quicker than `grunt test`, but will fail if vendor.js has changed since the last lift

### Custom Policies

#### dev

Reads sails.config.environment and shows a 404 page if the app is currently running in production mode via `sails lift --prod`

#### socketSessionAuth

The same access level as session auth, but returns an error object if not logged in; useful for showing error messages when async requests require a login.

```javascript
{
  err: 'You must be logged in to perform this action'
}
```

#### gameMaster

Queries the Game model and allows access if the current logged in user is the game master. Expects the `gameId` param to be passed to the request.

#### gamePlayer

Queries the Game model and allows access if the current logged in user is a game player or the game master. Expects the `gameId` param to be passed to the request.
