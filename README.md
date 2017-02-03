# FaD Game Table

### Dev to do:

#### as able

 - handle draggable cursor better for dice pool, destiny tokens, and maps
 - update 404 and 500 pages to use the new components
 - switch game browser alerts of to the notifications component
 - add ajax spinner to all auth component async operations
 - stylize email templates
 - move Vue themes and filters to js/lib in their own files
 - add a method to the ErrorService that parses s3 error messages
 - closing the browser does not send an offline event in the game

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

### Custom Tasks

#### Component Scaffold

```bash
grunt component --name=myComponent --parent=common
```

This command will create a new Vue.js component in /assets/js/components/common with all the necessary files for a component to work, including a testing spec scaffold.

The parent attribute is optional, and tells the generator where in the components folder to place the new component. For example, the above command will place the `myComponent` folder inside `components/common`.

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
