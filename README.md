# add-prop-types

[![npm version](https://badge.fury.io/js/add-prop-types.svg)](https://badge.fury.io/js/add-prop-types)

Making [prop-types](https://reactjs.org/docs/typechecking-with-proptypes.html) easy to work with.

```
// Tired

Component.propTypes = {
  installPackage: PropTypes.func,
  name: PropTypes.string,
  version: PropTypes.number.isRequired
};

Component.defaultProps = {
  name: 1
};

// Wired

addPropTypes(Component, {
  installPackage: 'func',
  name: 'string',
  version: {
    type: 'number',
    default: 1,
    isRequired: true
  },
});
```

### General Usage

A string shorthand argument is supported by most types. See below in complete usage for supported and unsupported types.

```
addPropTypes(Component, {
firstName: 'string',
lastName: 'string',
});
```

The object argument is supported by all types and allows for the setting of default and required props. Some types require the object argument, refer to complete usage for the list.

```
addPropTypes(Component, {
  firstName: {
    type: 'string',
    default: 'first name',
    isRequired: true
  },
  lastName: {
    type: 'string',
    default: 'last name'
  },
  nicknames: {
    type: 'arrayOf',
    typeValue: 'string'
  }
});
```

### Complete Usage

```
addPropTypes(Component, {
  // PropTypes.array
  optionalArray: 'array',

  // PropTypes.bool
  optionalBool: 'bool',

  // PropTypes.func
  optionalFunc: 'func',

  // PropTypes.number
  optionalNumber: 'number',

  // PropTypes.object
  optionalObject: 'object',

  // PropTypes.string
  optionalString: 'string',

  // PropTypes.symbol
  optionalSymbol: 'symbol',

  // PropTypes.node
  optionalNode: 'node',

  // PropTypes.element
  optionalElement: 'element',

  // PropTypes.elementType
  optionalElementType: 'elementType',

  // ---- Types requiring the object argument

  // PropTypes.instanceOf
  optionalMessage: {
    type: 'instanceOf',
    typeValue: Message
  },

  // PropTypes.oneOf
  optionalEnum: {
    type: 'oneOf',
    typeValue: ['News', 'Photos']
  },

  // PropTypes.oneOfType
  optionalUnion: {
    type: 'oneOfType',
    typeValue: [
      'string',
      'number',
      {
        type: 'instanceOf',
        typeValue: Message
      }
    ]
  },

  // PropTypes.arrayOf
  optionalArrayOf: {
    type: 'arrayOf',
    typeValue: ['number']
  },

  // PropTypes.objectOf
  optionalObjectOf: {
    type: 'objectOf',
    typeValue: ['number']
  },

  // PropTypes.shape
  optionalObjectWithShape: {
    type: 'shape',
    typeValue: {
      color: 'string',
      fontSize: 'number'
    }
  },

  // PropTypes.exact
  optionalObjectWithStrictShape: {
    type: 'exact',
    typeValue: {
      name: 'string',
      quantity: 'number'
    }
  },

  // ---- Custom Types

  // Custom prop
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.'
      );
    }
  },

  // Custom PropTypes.arrayOf
  customArrayProp: {
    type: 'arrayOf',
    typeValue: function(propValue, key, componentName, location, propFullName) {
      if (!/matchme/.test(propValue[key])) {
        return new Error(
          'Invalid prop `' +
            propFullName +
            '` supplied to' +
            ' `' +
            componentName +
            '`. Validation failed.'
        );
      }
    }
  }
});
```
