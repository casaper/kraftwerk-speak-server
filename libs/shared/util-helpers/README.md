# General non-angular helper functions and types

Code that is generally reused, but is not intended to be productive.

For example, useable in build scripts or something that is solving more generic problems – things that are out of the libs scope.

## Usage

A library that uses this one needs to add it as a implicit dependency:

```json
{
  "implicitDependencies": ["shared-util-helpers"]
}
```

The library installs iteself as an optional npm dependency on it's build.

The reason for this is, that use of this library will not interfer with nx dependency graph. Any library or application or even generator can import it, and even in JavaScript files it can be used.

This way it does not depend or interfer with tsconfig.json of other projects.

Condition to do this, is that this library only contains very basic TypeScript and JavaScript utilities, that have no direct connection to the actual implementation done in the libraries.

