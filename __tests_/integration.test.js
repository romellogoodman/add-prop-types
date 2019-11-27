const PropTypes = require('prop-types');
const React = require('react');
const {Component} = require('react');

const {getTypes} = require('../index');

class Message extends Component {
  render() {
    return null;
  }
}

const propInfo = {
  optionalArray: 'array',
  optionalBool: 'bool',
  optionalFunc: 'func',
  optionalNumber: 'number',
  optionalObject: 'object',
  optionalString: 'string',
  optionalSymbol: 'symbol',
  optionalNode: 'node',
  optionalElement: 'element',
  optionalElementType: 'elementType',
  optionalMessage: {
    type: 'instanceOf',
    typeValue: Message
  },
  optionalEnum: {
    type: 'oneOf',
    typeValue: ['News', 'Photos']
  },
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
  optionalArrayOf: {
    type: 'arrayOf',
    typeValue: ['number']
  },
  optionalObjectOf: {
    type: 'objectOf',
    typeValue: ['number']
  },
  optionalObjectWithShape: {
    type: 'shape',
    typeValue: {
      color: 'string',
      fontSize: 'number'
    }
  },
  optionalObjectWithStrictShape: {
    type: 'exact',
    typeValue: {
      name: 'string',
      quantity: 'number'
    }
  },
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
};

const propResults = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
  optionalNode: PropTypes.node,
  optionalElement: PropTypes.element,
  optionalElementType: PropTypes.elementType,
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
  }
};

describe('integration', () => {
  it('should test full specification', () => {
    const propTypes = getTypes(propInfo);
    const keys = Object.keys(propTypes);

    keys.forEach(key => {
      const expected = JSON.stringify(propTypes[key]);
      const actual = JSON.stringify(propResults[key]);

      expect(expected).toEqual(actual);
    });
  });
});
