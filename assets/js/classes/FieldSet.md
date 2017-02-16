
# FieldSet

Used to store values and validation information for a
set of form fields.

## Constructor Params

Param | Type | Required | Description
----- | ---- | -------- | -----------
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

var component = {
  data() {
    return {
      myForm: new FieldSet(rules)
    };
  }
};
```

### Possible validation rules

Rule | Type | Required | Default | Description
---- | ---- | -------- | ------- | -----------
required | Boolean | false | false | Value indicating if the value must not be empty.
pattern | String | false | undefined | A regular expression or pre-existing validation pattern. When passing a regular expression, you may include a `message` attribute on the same rule to override the default error message. The current preset pattern list includes: `email`, `url`, and `number`.
matches | String | false | undefined | A string value that matches the attribute name of another rule. i.e. `password: { ... }, confirm: { matches: 'password' }`
minlength | Integer | false | undefined | Field must be at least this long.
maxlength | Integer | false | undefined | Field cannot be longer than this.

Using the constructor with the above rules will return the following object:

```javascript
{
  rules: {
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

Where ... is the list of prototype methods listed below. This allows you to easily use the provided error attributes for triggering inline input error messages:

```html
<md-input-container :class="{'md-input-invalid': myForm.fields.email.hasErrors}">
  <label>Email Address</label>
  <md-input type="email" v-model="myForm.fields.email.value"></md-input>
  <span class="md-error" v-show="myForm.fields.email.hasErrors">{{ myForm.fields.email.errors[0] }}</span>
</md-input-container>
```

## Methods

### FieldSet.init(vm, form)

Call this function in a component's created() method to initialize the FieldSet properties as observables. This allows the children of `FieldSet.fields` to be used with VueMaterial inputs to display errors and validate forms.

Param | Type | Required | Description
----- | ---- | -------- | -----------
vm | ViewModel | true | The component ViewModel containing the FieldSet
form | String | true | The FieldSet to initialize as observables

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

### FieldSet.validate(rule)

Manually trigger validation for the provided field.

Param | Type | Required | Description
----- | ---- | -------- | -----------
rule | String | true | The field to validate

```javascript
this.myForm.validate('email');
```

### FieldSet.isValid()

Trigger validation on all fields. Returns true if valid, false if not.

```javascript
if (this.myForm.isValid()) {
  // do something
}
```

### FieldSet.clearErrors()

Reset all validation on the form. Sets hasErrors to false and errors to an empty array.

```javascript
this.myForm.clearErrors();
```

### FieldSet.export()

Returns an object with key/value pairs for all current field values.

```javascript
var vals = this.myForm.export();

/*
  {
    email: 'bob@bob.com',
    password: '12345'
  }
*/
```

### FieldSet.reset()

Clears all errors as well as resetting all field values.

```javascript
this.myForm.reset();
```

## FieldSet.addError(rule, error)

Manually add an error to the given field.

Param | Type | Required | Description
----- | ---- | -------- | -----------
rule | String | true | The field to add the error to
error | String | true | The error message to add

```javascript
this.myForm.addError('email', 'That email address is already in use');
```
