const PropTypes = require('prop-types');
const React = require('react');
const TestRenderer = require('react-test-renderer');

const addPropTypes = require('../index');
const {getPropInfo, getDefaults, getTypes} = require('../index');

describe('getPropInfo', () => {
  it('should match', () => {
    const propInfo = {
      installPackage: 'func',
      isCool: 'bool',
      name: 'string',
      version: {
        type: 'number',
        default: '1',
        isRequired: true
      }
    };
    const {propTypes} = getPropInfo(propInfo);
    const result = {
      installPackage: PropTypes.func,
      isCool: PropTypes.bool,
      name: PropTypes.string,
      version: PropTypes.number.isRequired
    };

    expect(propTypes).toEqual(result);
  });
});

describe('addPropTypes', () => {
  it('should add propTypes', () => {
    const App = ({name}) => <p>hello {name}</p>;
    const propInfo = {
      name: 'string'
    };

    addPropTypes(App, propInfo);

    const testRenderer = TestRenderer.create(<App name="mello" />);

    expect(testRenderer.toJSON().children).toEqual(['hello ', 'mello']);
  });

  it('should add defaultProps', () => {
    const App = ({name}) => <p>hello {name}</p>;
    const propInfo = {
      name: {
        type: 'string',
        default: 'world',
        isRequired: true
      }
    };

    addPropTypes(App, propInfo);

    const testRenderer = TestRenderer.create(<App />);
    const testInstance = testRenderer.root;

    expect(testInstance.props).toEqual({name: 'world'});
    expect(testRenderer.toJSON().children).toEqual(['hello ', 'world']);
  });
});
