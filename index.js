const PropTypes = require('prop-types');

const isFunc = item => typeof item === 'function';
const isObject = item => typeof item === 'object';

const shorthandTypes = {
  array: true,
  bool: true,
  func: true,
  number: true,
  object: true,
  string: true,
  symbol: true,
  node: true,
  element: true,
  elementType: true
};

const getPropInfo = propObj => {
  const defaultProps = {};
  const propTypes = {};

  Object.keys(propObj).forEach(key => {
    const propValue = propObj[key];
    const propValueType = isObject(propValue) ? propValue.type : propValue;

    if (isFunc(propValue)) {
      propTypes[key] = propValue;
      return;
    }

    const {default: defaultValue, isRequired, type} = isObject
      ? {
          type: PropTypes[propValueType],
          default: propValue.default,
          isRequired: propValue.isRequired
        }
      : {type: PropTypes[propValueType]};

    if (shorthandTypes[propValueType] && type) {
      propTypes[key] = isRequired ? type.isRequired : type;

      if (typeof defaultValue !== 'undefined') {
        defaultProps[key] = defaultValue;
      }
    }
  });

  return {defaultProps, propTypes};
};

const getDefaults = propObj => {
  return getPropInfo(propObj).defaultProps;
};

const getTypes = propObj => {
  return getPropInfo(propObj).propTypes;
};

const addPropTypes = (Component, propObj) => {
  const {defaultProps, propTypes} = getPropInfo(propObj);

  Component.defaultProps = defaultProps;
  Component.propTypes = propTypes;

  return Component;
};

const moduleExport = (module.exports = addPropTypes);

moduleExport.getPropInfo = getPropInfo;
moduleExport.getDefaults = getDefaults;
moduleExport.getTypes = getTypes;
