# propellor

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

propellor(Component, {
  installPackage: 'func',
  name: 'string',
  version: {
    type: 'number',
    default: 1,
    isRequired: true
  },
});
```
