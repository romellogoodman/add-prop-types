# add-prop-types

Making [prop-types]('https://reactjs.org/docs/typechecking-with-proptypes.html') easy to work with.

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
