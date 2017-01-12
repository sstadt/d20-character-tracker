
# JavaScript Classes


## Class FieldSet

Used to store values and validation information for a
set of form fields.

### Constructor Params

Name | Type | Required | Description
---- | ---- | -------- | -----------
rules | Object | true | The ruleset to initialize fields and check validation from

```javascript
var testRules = {
  email: {
    required: true,
    pattern: 'email' // or regular expression for custom validation
  },
  password: {
    required: true,
    minlength: 5
  }
};
```

#### Possible validation rules

Name | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
required | Boolean | false | false | Value indicating if the value must not be empty.
pattern | String | false | undefined | A regular expression or pre-existing validation pattern. See validation object below for list of pre-defined patterns.
matches | String | false | undefined | A string value that matches the attribute name of another rule. i.e. `password: { ... }, confirm: { matches: 'password' }`
minlength | Integer | false | undefined | Field must be at least this long.
maxlength | Integer | false | undefined | Field cannot be longer than this.

### Returns

Using the constructor with the above rules will return the following object:

```javascript
{
  rule: {
    email: { required: true, pattern: 'email' },
    password: { required: true, minlength: 5 }
  },
  fields: {
    email: {
      value: '',
      hasErrors: false,
      errors: []
    },
    password: {
      value: '',
      hasErrors: false,
      errors: []
    }
  },
  ...
}
```

Where ... is the list of prototype methods listed below.

### Methods

#### Function init()

Call this function in a component's created() method to initialize the FieldSet properties as observables. This allows the children of `FieldSet.fields` to be used with VueMaterial inputs to display errors and validate forms

##### Params

Name | Type | Required | Description
---- | ---- | -------- | -----------
vm | ViewModel | true | The component ViewModel containing the FieldSet
form | String | true | The FieldSet to initialize as observables

##### Example

```javascript
var component = {
  data() {
    return {
      myForm: new FieldSet(rules);
    };
  },
  created() {
    this.myForm.init(this, 'myForm');
  }
};
```

#### Function validate()

Manually trigger validation for the provided field.

##### Params

Name | Type | Required | Description
---- | ---- | -------- | -----------
rule | String | true | The field to validate

##### Example

```javascript
this.myForm.validate('email');
```

#### Function isValid()

Trigger validation on all fields. Returns true if valid, false if not.

##### Example

```javascript
if (this.myForm.isValid()) {
  // do something
}
```

#### Function clearErrors()

Reset all validation on the form. Sets hasErrors to false and errors to an empty array.

##### Example

```javascript
this.myForm.clearErrors();
```

#### Function export()

Returns an object with key/value pairs for all current field values.

##### Example

```javascript
var vals = this.myForm.export();

/*
  {
    email: 'bob@bob.com',
    password: '12345'
  }
*/
```

#### Function reset()

Clears all errors as well as resetting all field values.

##### Example

```javascript
this.myForm.reset();
```

### Function addError()

Manually add an error to the given field.

#### Params

Name | Type | Required | Description
---- | ---- | -------- | -----------
rule | String | true | The field to add the error to
error | String | true | The error message to add

##### Example

```javascript
this.myForm.addError('email', 'That email address is already in use');
```


## Class Pipe

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

### Constructor Params

Name | Type | Required | Description
---- | ---- | -------- | -----------
model | String | true | The model this pipe will receive updates for. If you wish to listen for updates on multiple models, create a new pipe for each model.

```javascript
var GamePipe = new Pipe('game');
```

### Methods

#### Function on()

Register a callback function to be called on socket updates of a certain type. Passes the data parameter of the socket message to the callback function.

##### Params

Name | Type | Required | Description
---- | ---- | -------- | -----------
type | String | true | The event type to register your callback function to

##### Example

```javascript
GamePipe.on('playerRequestedJoin', this.handleJoinRequest);
```

If your callback function depends on data being present which is loaded asynchronously, it is best to register your callback once the data has been loaded as you _may_ receive socket updates before your data is loaded.
