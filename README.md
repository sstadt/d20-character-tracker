# FaD Game Table

Documentation: https://github.com/sstadt/sw-game-table-wiki

### Dev to do:

#### as able

 - handle draggable cursor better for dice pool, destiny tokens, and maps - should be a move/grab icon while dragging - hold off until canvas rebuild for mapViewer component
 - set up csrf with all socket calls

#### testing todos

 - userProfile
 - game
 - gameBrowser
 - mapViewer
 - starWarsCrawl

#### devops todo

 - only build assets on initial lift in production to get application back online faster if an error occurs

### Need more research

 - waterline isn't behaving as expected when querying against dates
 - ... need to figure out a TTL solution that will not infringe upon registration while expiring reset tokens after 24 hours
 - set up grunt-autoprefixer

### Setup

#### Install Docker

https://www.docker.com/community-edition

You will need to add the `/data/db` folder to docker's shared folders via Preferences -> File Sharing.

#### Build the container

```bash
cd /path/to/repo
docker-compose build
```

#### Install local modules and generate local.js

```bash
npm install && grunt localjs
```

In order to register a new account on the app locally, you will need to set up an app password with a gmail account and plug the credentials into `local.js`. Alternatively, you could browse the documents locally after

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

### Roadmap

#### 0.1 - Ready for Play

 - manual Characters and NPCs
 - freeform game data
 - encounters
 - maps
 - crawls
 - dice roll shortcuts, chat

#### 0.2 - Game Data API

 - integrated Character and NPCs - temporary (xp only) export for existing characters
 - curated game data - option for freeform
 - game data API app
 - game data API integration
 - character and NPC wizards
 - variable sized NPC map tokens (large creatures, etc.)

#### 0.3 - Game Data Stores

 - game info panel - precursor to journal
 - integrated XP and credit spending
 - GM xp awards (group or individual)
 - gear storefronts with configurable player access
 - add loot caches to encounters

#### 0.4 - Maps !!!

 - mapViewer canvas rebuild

#### 0.x - TBD

 - game journal
