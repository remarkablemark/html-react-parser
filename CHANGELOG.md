# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com) and this project adheres to [Semantic Versioning](http://semver.org).

## [0.0.3](https://github.com/remarkablemark/html-react-parser/compare/v0.0.2...v0.0.3) - 2016-08-24
### Added
- Make package [UMD](https://github.com/ForbesLindesay/umd/blob/master/template.js) compatible (#9)
- Throw an error if first argument is not a string (#10)

### Changed
- Differentiate between node and browser environments for parser (#5)

### Fixed
- HTML to DOM conversion on the client (#10)

## [0.0.2](https://github.com/remarkablemark/html-react-parser/compare/v0.0.1...v0.0.2) - 2016-08-23
### Added
- [ESLint](http://eslint.org) as the linter (#2)
- [Travis CI](https://travis-ci.org) (#4)

### Fixed
- `package.json` **peerDependencies** for `react` and `react-dom`

## [0.0.1](https://github.com/remarkablemark/html-react-parser/tree/v0.0.1) - 2016-08-23
### Added
- HTML to React parser which consists of:
  - HTML string to DOM object converter
  - DOM object to React nodes converter
- Tests
- README
