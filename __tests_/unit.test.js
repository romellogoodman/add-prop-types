const PropTypes = require('prop-types');
const React = require('react');
const TestRenderer = require('react-test-renderer');

const addPropTypes = require('../index');
const {getPropInfo, getDefaults, getTypes} = require('../index');

describe('getPropInfo', () => {
  const propInfo = {
    installPackage: 'func',
    isCool: 'bool',
    name: 'string',
    version: {
      type: 'number',
      default: 1,
      isRequired: true
    }
  };

  it('should pass a simple usecase', () => {
    const {defaultProps, propTypes} = getPropInfo(propInfo);
    const resultDefault = {
      version: 1
    };
    const resultTypes = {
      installPackage: PropTypes.func,
      isCool: PropTypes.bool,
      name: PropTypes.string,
      version: PropTypes.number.isRequired
    };

    expect(defaultProps).toEqual(resultDefault);
    expect(propTypes).toEqual(resultTypes);
  });

  it('should verify that getDefaults and getTypes are subsets of it output', () => {
    const defaultProps = getDefaults(propInfo);
    const propTypes = getTypes(propInfo);
    const result = getPropInfo(propInfo);

    expect(defaultProps).toEqual(result.defaultProps);
    expect(propTypes).toEqual(result.propTypes);
  });
});

describe('getTypes', () => {
  it('should pass a simple usecase', () => {
    const propInfo = {
      installPackage: 'func',
      isCool: 'bool',
      name: 'string',
      version: {
        type: 'number',
        default: 1,
        isRequired: true
      }
    };
    const propTypes = getTypes(propInfo);
    const result = {
      installPackage: PropTypes.func,
      isCool: PropTypes.bool,
      name: PropTypes.string,
      version: PropTypes.number.isRequired
    };

    expect(propTypes).toEqual(result);
  });

  it('should pass all of the simple prop-type types', () => {
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
      optionalElementType: 'elementType'
    };
    const propTypes = getTypes(propInfo);
    const result = {
      optionalArray: PropTypes.array,
      optionalBool: PropTypes.bool,
      optionalFunc: PropTypes.func,
      optionalNumber: PropTypes.number,
      optionalObject: PropTypes.object,
      optionalString: PropTypes.string,
      optionalSymbol: PropTypes.symbol,
      optionalNode: PropTypes.node,
      optionalElement: PropTypes.element,
      optionalElementType: PropTypes.elementType
    };

    expect(propTypes).toEqual(result);
  });
});

describe('addPropTypes', () => {
  it('should add propTypes', () => {
    const Test = ({name}) => <p>hello {name}</p>;
    const propInfo = {
      name: 'string'
    };

    addPropTypes(Test, propInfo);

    const testRenderer = TestRenderer.create(<Test name="mello" />);

    expect(testRenderer.toJSON().children).toEqual(['hello ', 'mello']);
  });

  it('should add defaultProps', () => {
    const Test = ({name}) => <p>hello {name}</p>;
    const propInfo = {
      name: {
        type: 'string',
        default: 'world',
        isRequired: true
      }
    };

    addPropTypes(Test, propInfo);

    const testRenderer = TestRenderer.create(<Test />);
    const testInstance = testRenderer.root;

    expect(testInstance.props).toEqual({name: 'world'});
    expect(testRenderer.toJSON().children).toEqual(['hello ', 'world']);
  });
});
