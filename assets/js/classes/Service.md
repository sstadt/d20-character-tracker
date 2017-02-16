
# Service

The Service class wraps io.socket requests in an effort to standardize and streamline calls to the back end. This is done, because component logic can become unmanageable with increased complexity, especially for components with complex functionality or for components at the top of the inheritance chain, who typically manage all data back-end updates for child components.

Using a standardized service helps keep code readable, manageable, assists with testing, and centralizes resource configuration.

for unit testing purposes, it is best to attach a service as a data property. If you need to add `staticData` from component props, use the component's `created()` function to initialize the service with the needed prop data.

## Constructor Params

The constructor function takes an options object to set up the service endpoints and additional configuration. These are the available options:

Name | Type | Required | Description
---- | ---- | -------- | -----------
schema | Object | true | The list of endpoints to create service methods for in key value pairs, where the key is the name of the generated function, and the value is the enpoint the service method should make a request to, when called.
staticData | Object | false | A list of data in key value pairs to pass along with every API call for this service. For example, the game component attaches a gameId to the service's static data, so this data does not need to be passed to every service call, but wil still be sent along with any additional data to the API endpoint.
debug | Boolean | false | If set to true, will console log requests and responses to API endpoints.

```javascript
module.exports = {
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      gameService: undefined
    };
  },
  created() {
    this.gameService = new Service({
      schema: config.endpoints.game,
      staticData: {
        gameId: this.gameId
      }
    });
  }
};
```

## Methods

When the constructor is called, the Service class will attach a function for each key in the passed in schema that makes a socket call to the endpoint at the given key. Consider the following list of endpoints:

```javascript
{
  oneEndpoint: '/one/endpoint'
  twoEndpoint: '/two/endpoint'
  redEndpoint: '/red/endpoint'
  blueEndpoint: '/blue/endpoint'
}
```

Passing this object as the schema would create four functions on the service:

```javascript
service.oneEndpoint();
service.twoEndpoint();
service.redEndpoint();
service.blueEndpoint();
```

Each function will send a post or get request to the provided endpoint from the schema and return a deferred. Success and fail functions for the deferred will return the server response indiscriminately.

If an object was provided to `staticData` on the constructor, the passed in data will be merged with the `staticData` and passed to the API endpoint as a single set of data. Data passed to the service function will get priority over `staticData`, allowing you to easily set defaults and override them later. If no data is being passed from either `staticData`, or passed in data, the Service will make a get request. If there is data present from either `staticData` or passed in data, the Service will make a post request.

## Examples

Given the following service:

```javascript
var service = new Service({
  schema: {
    myEndpoint: '/example/endpoint'
  },
  staticData: {
    foo: 'bar'
  }
});
```

### Send a request with only staticData

```javascript
service.myEndpoint() // { foo: 'bar' }
  .then(function success() {
    // success!
  }, function error(reason) {
    // do something with reason.err
  });
```

### Send a request with additional data

```javascript
service.myEndpoint({ bar: 'baz' }) // { foo: 'bar', bar: 'baz' }
  .then(function success() {
    // success!
  }, function error(reason) {
    // do something with reason.err
  });
```

### Send a request with overridden default

```javascript
service.myEndpoint({ foo: 'baz' }) // { foo: 'baz' }
  .then(function success() {
    // success!
  }, function error(reason) {
    // do something with reason.err
  });
```
