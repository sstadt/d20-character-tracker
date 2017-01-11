# FaD Game Table

### Dev to do:

 - game player policy should redirect to /home
 - socket updates for player modal are causing reflow issues
 - make non-success, non-failure dice rolls (i.e. pure force, or standard dice) the default blue color instead of the green success color
 - when a roll has no success/failure results, don't show that block
 - show a generic roll message when there are no icons to show for dice rolls
 - add ajax spinner to all auth component async operations
 - stylize email templates
 - spruce up the landing page
 - add chat messages on user join
 - switch off of gmail for back end emails

##### logging off is crashing the app

When logging off from the game, res.session.User is unset, causing GameService to throw an error on line 71:

```javascript
game.online.splice(game.online.indexOf(session.User.id), 1);
```

Need to find a way to unsubscribe the user for offline updates or pass in userId (with session.Uer.Id as a default ???) to get around this.

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
