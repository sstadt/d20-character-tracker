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

 - set up localjs task for production

### Need more research

 - waterline isn't behaving as expected when querying against dates
 - ... need to figure out a TTL solution that will not infringe upon registration while expiring reset tokens after 24 hours
 - set up grunt-autoprefixer

### Setup

Install docker: https://www.docker.com/community-edition

Build the container

```bash
cd /path/to/repo
docker-compose build
```

Install local modules and generate local.js

```bash
npm install && grunt localjs
```

In order to register a new account on the app locally, you will need to set up an app password with a gmail account and plug the credentials into local.js.

### Development

The container can be started and stopped per docker-compose: `docker-compose --help`. Be sure to run `grunt localjs` before starting the container, of sails will error out.

While running the container, forever will reload app.js when api or config changes are mad eto the application. You may reload the application in the browser manually, though in most cases this is not necessary as the websocket will reconnect itself without a browser refresh.

Asset compilation is separated from the node process in development, so you will need to use grunt to test and compile front end assets.

#### Compile and watch assets

```bash
grunt dev
```

#### Compile assets and run tests

```bash
grunt karma
```

#### Run tests without compiling assets

```bash
grunt test
```
