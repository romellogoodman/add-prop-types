const PropTypes = require('prop-types');
const React = require('react');
const TestRenderer = require('react-test-renderer');

const propUp = require('../index');
const {getPropInfo, getDefaults, getTypes} = require('../index');

describe('propUp', () => {
  it('should test 1', () => {
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
    const propTypes = getPropInfo(propInfo);
    const result = {
      installPackage: PropTypes.func,
      isCool: PropTypes.bool,
      name: PropTypes.string,
      version: PropTypes.number.isRequired
    };

    expect(propTypes).toEqual(result);
  });

  it('should something propTypes', () => {
    const App = ({name}) => <p>hello {name}</p>;
    const propInfo = {
      name: 'string'
    };

    propUp(App, propInfo);

    const testRenderer = TestRenderer.create(<App name="mello" />);

    expect(testRenderer.toJSON().children).toEqual(['hello ', 'mello']);
  });

  it('should something defaultProps', () => {
    const App = ({name}) => <p>hello {name}</p>;
    const propInfo = {
      name: {
        type: 'string',
        default: 'world',
        isRequired: true
      }
    };

    propUp(App, propInfo);

    const testRenderer = TestRenderer.create(<App />);
    const testInstance = testRenderer.root;

    expect(testInstance.props).toEqual({name: 'world'});
    expect(testRenderer.toJSON().children).toEqual(['hello ', 'world']);
  });
});
