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

/*

TODO: maybe implementation of other types?

const decodeType = (type, typeValue) =>
  // eslint-disable-next-line no-use-before-define
  shorthandTypes[type] ? PropTypes[type] : objectTypes[type](typeValue);

const objectTypes = {
  instanceOf: value => PropTypes.instanceOf(value),
  oneOf: values => PropTypes.oneOf(values),
  oneOfType: values =>
    PropTypes.oneOfType(
      values
        .map(value => {
          if (PropTypes[value]) {
            return PropTypes[value];
          }

          return;
        })
        .filter(type => type)
    ),
  arrayOf: values =>
    isFunc(values)
      ? values
      : PropTypes.arrayOf(
          values
            .map(value => {
              if (PropTypes[value]) {
                return PropTypes[value];
              }

              return;
            })
            .filter(type => type)
        ),
  objectOf: value =>
    PropTypes.objectOf(value => {
      if (PropTypes[value]) {
        return PropTypes[value];
      }

      return;
    }),
  // eslint-disable-next-line no-use-before-define
  shape: value => PropTypes.shape(getPropInfo(value)),
  // eslint-disable-next-line no-use-before-define
  exact: value => PropTypes.exact(getPropInfo(value))
};

const getPropInfo = (propObj, propTypes = {}, defaultProps = {}) => {
  Object.keys(propObj).forEach(key => {
    const propValue = propObj[key];
    const type = isObject(propValue) ? propValue.type : propValue;

    // set key as the function and move on
    if (isFunc(propValue)) {
      propTypes[key] = propValue;
      return;
    }

    if (!type) {
      console.error('throw error for no type');
      return;
    }

    if (!shorthandTypes[type] && !objectTypes[type]) {
      console.error('throw error for unsupported type', type);
      return;
    }

    const {default: defaultValue, isRequired, typeValue} = isObject
      ? propValue
      : {type};
    const propType = decodeType(type, typeValue);

    propTypes[key] = isRequired ? propType.isRequired : propType;

    // Should I just loop shit and use deep set?
    if (typeof defaultValue !== 'undefined') {
      defaultProps[key] = defaultValue;
    }
  });

  return {defaultProps, propTypes};
};

 */
