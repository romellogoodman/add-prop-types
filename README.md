# prop-up

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

propUp(Component, {
  installPackage: 'func',
  name: 'string',
  version: {
    type: 'number',
    default: 1,
    isRequired: true
  },
});
```
