
# Pipe

The Pipe class acts as the single pipe through which sails.js socket updates flow. This allows the ViewModels to make application updates to the component tree without cluttering `created()` with unnecessary or complex sets of calls to `io.socket.on`.

In order for the Pipe to work properly all socket messages are expected to include a type with the data payload. This type is what a component will subscribe to for updates.

An example of a message sent from the sails.js back end:

```javascript
Game.message(game.id, {
  type: 'playerRequestedJoin',
  data: { player: req.session.User }
});
```

In this example, a component would subscribe to the `playerRequestedJoin` type to receive updates.

## Constructor Params

Name | Type | Required | Description
---- | ---- | -------- | -----------
model | String | true | The model this pipe will receive updates for. If you wish to listen for updates on multiple models, create a new pipe for each model.

```javascript
var GamePipe = new Pipe('game');
```

## Methods

### Pipe.on(type)

Register a callback function to be called on socket updates of a certain type. Passes the data parameter of the socket message to the callback function.

Param | Type | Required | Description
----- | ---- | -------- | -----------
type | String | true | The event type to register your callback function to

```javascript
GamePipe.on('playerRequestedJoin', this.handleJoinRequest);
```

If your callback function depends on data being present which is loaded asynchronously, it is best to register your callback once the data has been loaded as you _may_ receive socket updates before your data is loaded.
