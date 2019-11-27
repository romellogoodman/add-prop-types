const PropTypes = require('prop-types');

const {getTypes} = require('../index');

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
  optionalElementType: PropTypes.elementType
};

describe('integration', () => {
  it('should test full specification', () => {
    const propTypes = getTypes(propInfo);

    expect(propTypes).toEqual(propResults);
  });
});
