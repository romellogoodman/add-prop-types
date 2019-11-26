const PropTypes = require('prop-types');

const getPropInfo = propObj => {
  const defaultProps = {};
  const propTypes = {};

  console.log('addPropTypes -', propObj, Object.keys(propObj));

  Object.keys(propObj).forEach(key => {
    const propValue = propObj[key];
    const isObject = typeof propValue === 'object';

    const {default: defaultValue, isRequired, type} = isObject
      ? {
          type: PropTypes[propValue.type],
          default: propValue.default,
          isRequired: propValue.isRequired
        }
      : {type: PropTypes[propValue]};

    if (type) {
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
