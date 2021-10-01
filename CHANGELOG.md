# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.4.0](https://www.github.com/remarkablemark/html-react-parser/compare/v1.3.0...v1.4.0) (2021-10-01)


### Features

* added CRA typescript example ([42f42e5](https://www.github.com/remarkablemark/html-react-parser/commit/42f42e519c05c382476a14a73d45b5f700fecdbb))
* export domhandler's Element ([0473e83](https://www.github.com/remarkablemark/html-react-parser/commit/0473e832ac65b3e8ce5f8da69c740cbd84f62863))

## [1.3.0](https://www.github.com/remarkablemark/html-react-parser/compare/v1.2.9...v1.3.0) (2021-09-07)


### Features

* upgrade `react-property` to get react-dom 17 DOM/SVG properties ([f0fbbff](https://www.github.com/remarkablemark/html-react-parser/commit/f0fbbffa7b14262b696fb7ec33f050701bdf2e37))

### [1.2.9](https://www.github.com/remarkablemark/html-react-parser/compare/v1.2.8...v1.2.9) (2021-09-06)


### Build System

* **deps:** bump domhandler from 4.2.0 to 4.2.2 ([cac7ddf](https://www.github.com/remarkablemark/html-react-parser/commit/cac7ddfb370fb0fdf8daaec02dfb2a3c3a3f77c6))
* **deps:** bump html-dom-parser from 1.0.1 to 1.0.2 ([72cccad](https://www.github.com/remarkablemark/html-react-parser/commit/72cccad24661b0c2e74370f183b96cdfb5da98d0))
* **deps:** bump react-property from 1.0.1 to 1.0.2 ([9feedd7](https://www.github.com/remarkablemark/html-react-parser/commit/9feedd722db49bd1752b38476b0e14ca93ea41c1))

## [1.2.8](https://github.com/remarkablemark/html-react-parser/compare/v1.2.7...v1.2.8) (2021-08-12)

### Bug Fixes

- rename unit test per feedback ([f39cf38](https://github.com/remarkablemark/html-react-parser/commit/f39cf387cdf1d4866b7ff9538189cb1e1c862199))
- **utilities:** skip corrupted style attributes ([509486e](https://github.com/remarkablemark/html-react-parser/commit/509486e94a45477b17630850b35c0db1faf0a31e)), closes [#256](https://github.com/remarkablemark/html-react-parser/issues/256)

## [1.2.7](https://github.com/remarkablemark/html-react-parser/compare/v1.2.6...v1.2.7) (2021-06-19)

## [1.2.6](https://github.com/remarkablemark/html-react-parser/compare/v1.2.5...v1.2.6) (2021-04-18)

### Bug Fixes

- **attributes-to-props:** correct attributes-to-props type `Props` ([1bd1824](https://github.com/remarkablemark/html-react-parser/commit/1bd182464773e39cf1865f48231ad55df95d42f9)), closes [#242](https://github.com/remarkablemark/html-react-parser/issues/242)

## [1.2.5](https://github.com/remarkablemark/html-react-parser/compare/v1.2.4...v1.2.5) (2021-04-13)

### Bug Fixes

- **package:** add domhandler to dependencies ([88cb7ad](https://github.com/remarkablemark/html-react-parser/commit/88cb7addcf326b17fbc39755fbb38121b6bb0808)), closes [#240](https://github.com/remarkablemark/html-react-parser/issues/240)

## [1.2.4](https://github.com/remarkablemark/html-react-parser/compare/v1.2.3...v1.2.4) (2021-02-01)

### Bug Fixes

- **index:** refactor ES module from ES6 to ES5 syntax ([9112250](https://github.com/remarkablemark/html-react-parser/commit/911225089fbebea5f5cfcf0e06b7b3fac76f624a)), closes [#222](https://github.com/remarkablemark/html-react-parser/issues/222)

## [1.2.3](https://github.com/remarkablemark/html-react-parser/compare/v1.2.2...v1.2.3) (2021-01-28)

### Bug Fixes

- **index:** make sure to export the named exports ([1689bd9](https://github.com/remarkablemark/html-react-parser/commit/1689bd9b2c3a3dd6d9d7b3c06d9d3fa7436c65b5)), closes [#217](https://github.com/remarkablemark/html-react-parser/issues/217)

## [1.2.2](https://github.com/remarkablemark/html-react-parser/compare/v1.2.1...v1.2.2) (2021-01-28)

### Bug Fixes

- **index:** export without const in `index.mjs` ([9639afb](https://github.com/remarkablemark/html-react-parser/commit/9639afbdf9ddf121af8d030660e63a472763c028)), closes [#214](https://github.com/remarkablemark/html-react-parser/issues/214) [#213](https://github.com/remarkablemark/html-react-parser/issues/213)

## [1.2.1](https://github.com/remarkablemark/html-react-parser/compare/v1.2.0...v1.2.1) (2021-01-15)

### Bug Fixes

- **package:** add missing file ([70cdb4c](https://github.com/remarkablemark/html-react-parser/commit/70cdb4c65ecc4fd84241ef67949a0efd18b3e5e7))

## [1.2.0](https://github.com/remarkablemark/html-react-parser/compare/v1.1.2...v1.2.0) (2021-01-15)

### Features

- **package:** add es module entry point ([ca0340a](https://github.com/remarkablemark/html-react-parser/commit/ca0340a25e9c9c56758656b3352267ade7e37a21))

## [1.1.2](https://github.com/remarkablemark/html-react-parser/compare/v1.1.1...v1.1.2) (2021-01-12)

### Bug Fixes

- **index:** include domhandler `Node` in `DOMNode` type ([ac4aff3](https://github.com/remarkablemark/html-react-parser/commit/ac4aff3e094254d985124759c590d14eaa506168)), closes [#207](https://github.com/remarkablemark/html-react-parser/issues/207)

## [1.1.1](https://github.com/remarkablemark/html-react-parser/compare/v1.1.0...v1.1.1) (2020-12-27)

### Bug Fixes

- escape tags inside of `<title>` (html-dom-parser@1.0.0) ([07e1055](https://github.com/remarkablemark/html-react-parser/commit/07e10551f5febfa70075df22255cb2eb1dec5f54)), closes [#202](https://github.com/remarkablemark/html-react-parser/issues/202)

## [1.1.0](https://github.com/remarkablemark/html-react-parser/compare/v1.0.0...v1.1.0) (2020-12-26)

### Features

- **index:** export `domhandler` node types ([dfa0c19](https://github.com/remarkablemark/html-react-parser/commit/dfa0c1978684f42cdcabd32e95379dfb52ef1d0c))

## [1.0.0](https://github.com/remarkablemark/html-react-parser/compare/v0.14.3...v1.0.0) (2020-12-14)

### Build System

- **package:** upgrade dependency `html-dom-parser` to 0.5.0 ([5568ed7](https://github.com/remarkablemark/html-react-parser/commit/5568ed72fb2c31c1924eac114f38d6294c3ba342))

### BREAKING CHANGES

- **package:** upgrade dependency `html-dom-parser` to 0.5.0

## [0.14.3](https://github.com/remarkablemark/html-react-parser/compare/v0.14.2...v0.14.3) (2020-12-12)

### Bug Fixes

- **dom-to-react:** transform style to object for Web Components ([83efbce](https://github.com/remarkablemark/html-react-parser/commit/83efbce1123d3fb6d28b066cf60559a769e9a138)), closes [#188](https://github.com/remarkablemark/html-react-parser/issues/188)

## [0.14.2](https://github.com/remarkablemark/html-react-parser/compare/v0.14.1...v0.14.2) (2020-11-23)

## [0.14.1](https://github.com/remarkablemark/html-react-parser/compare/v0.14.0...v0.14.1) (2020-11-03)

## [0.14.0](https://github.com/remarkablemark/html-react-parser/compare/v0.13.0...v0.14.0) (2020-09-11)

### Features

- export attributesToProps ([00fbef2](https://github.com/remarkablemark/html-react-parser/commit/00fbef2))
- update readme ([76f8b0c](https://github.com/remarkablemark/html-react-parser/commit/76f8b0c))

## [0.13.0](https://github.com/remarkablemark/html-react-parser/compare/v0.12.0...v0.13.0) (2020-06-07)

### Features

- **dom-to-react:** add option `trim` that skips whitespace nodes ([413eaa0](https://github.com/remarkablemark/html-react-parser/commit/413eaa0))
- **index:** type `trim` in HTMLReactParserOptions ([be71b13](https://github.com/remarkablemark/html-react-parser/commit/be71b13))

## [0.12.0](https://github.com/remarkablemark/html-react-parser/compare/v0.11.1...v0.12.0) (2020-06-04)

### Features

- **index:** add htmlparser2 type to HTMLReactParserOptions ([81f74fb](https://github.com/remarkablemark/html-react-parser/commit/81f74fb))
- **index:** add options.htmlparser2 ([c4ecf64](https://github.com/remarkablemark/html-react-parser/commit/c4ecf64))

## [0.11.1](https://github.com/remarkablemark/html-react-parser/compare/v0.11.0...v0.11.1) (2020-06-03)

### Performance Improvements

- **index:** return empty array if first argument is empty string ([7f61f97](https://github.com/remarkablemark/html-react-parser/commit/7f61f97))

## [0.11.0](https://github.com/remarkablemark/html-react-parser/compare/v0.10.5...v0.11.0) (2020-06-02)

### Features

- **package:** upgrade html-dom-parser@0.3.0 ([d30bfdc](https://github.com/remarkablemark/html-react-parser/commit/d30bfdc))

## [0.10.5](https://github.com/remarkablemark/html-react-parser/compare/v0.10.4...v0.10.5) (2020-05-26)

### Tests

- **html-to-react:** tidy and organize tests in html-to-react.js ([8dfbfe0](https://github.com/remarkablemark/html-react-parser/commit/8dfbfe03a65f900b2661dc80227883a77bef766c))

### Build System

- **package:** add missing peerDependency `typescript` ([91fb693](https://github.com/remarkablemark/html-react-parser/commit/91fb693c9ca9e4c473b1f532d0e03e6c42b90916))
- **package:** upgrade devDependencies ([b2dc83b](https://github.com/remarkablemark/html-react-parser/commit/b2dc83b9834b70424c1525d5b30b7c6c32016838))
- **rollup:** upgrade rollup, consolidate config, remove cross-env ([55b2b4e](https://github.com/remarkablemark/html-react-parser/commit/55b2b4e7a647e9829e89a45524ece86d0ab620bd))

## [0.10.4](https://github.com/remarkablemark/html-react-parser/compare/v0.10.3...v0.10.4) (2020-05-25)

### Tests

- **attributes-to-props:** test that CSS comment is not parsed ([0c27987](https://github.com/remarkablemark/html-react-parser/commit/0c27987ff10fa13f3f2f35ba1aba0b88b0e0d92e))
- **dom-to-react:** tidy tests and add case for single node replace ([452f6be](https://github.com/remarkablemark/html-react-parser/commit/452f6be01500adffd740b0b1edb7a06790ba46f7))
- tidy tests, replace `assert.equal` with `assert.strictEqual` ([ef04eff](https://github.com/remarkablemark/html-react-parser/commit/ef04effebdd2f753c99f706599d656b314442d08))

## [0.10.3](https://github.com/remarkablemark/html-react-parser/compare/v0.10.2...v0.10.3) (2020-03-28)

### Bug Fixes

- update .d.ts docstrings ([bae05c0](https://github.com/remarkablemark/html-react-parser/commit/bae05c0a00ac4917b8d0d3137098010a13f8377d))
- use JSX.Element for type definitions ([d8e2ada](https://github.com/remarkablemark/html-react-parser/commit/d8e2adad4410544bbff4b5c9b827225aa96ed5d5))

## [0.10.2](https://github.com/remarkablemark/html-react-parser/compare/v0.10.1...v0.10.2) (2020-03-13)

### Bug Fixes

- **index:** add default export for parser ([6259959](https://github.com/remarkablemark/html-react-parser/commit/62599594de72c12c0c9fe9a8642ee52ed0488734))

### Tests

- **html-to-react:** add test to ensure default export for parser ([efba1d4](https://github.com/remarkablemark/html-react-parser/commit/efba1d402000b25b8800e33c2b934351b64bac0c))
- **html-to-react:** have a stronger assert ([064f0df](https://github.com/remarkablemark/html-react-parser/commit/064f0dfc742f67d57941a02bfdb70a76b56be472))

## [0.10.1](https://github.com/remarkablemark/html-react-parser/compare/v0.10.0...v0.10.1) (2020-02-08)

### Bug Fixes

- **index:** make `replace` property optional in `index.d.ts` ([801512b](https://github.com/remarkablemark/html-react-parser/commit/801512ba353e46ba931ee018ea8a9ec6c2d5da60)), closes [#134](https://github.com/remarkablemark/html-react-parser/issues/134)

## [0.10.0](https://github.com/remarkablemark/html-react-parser/compare/v0.9.2...v0.10.0) (2019-11-09)

### Build System

- **package:** upgrade dependency style-to-object@0.3.0 ([87a0486](https://github.com/remarkablemark/html-react-parser/commit/87a0486))
- **package:** upgrade devDependencies ([aaddf1b](https://github.com/remarkablemark/html-react-parser/commit/aaddf1b))

### Features

- **dom-to-react:** support Preact ([c3e77bb](https://github.com/remarkablemark/html-react-parser/commit/c3e77bb))

### Tests

- **types:** move TypeScript tests from `lint` to `test` directory ([7c9ab9d](https://github.com/remarkablemark/html-react-parser/commit/7c9ab9d))

## [0.9.2](https://github.com/remarkablemark/html-react-parser/compare/v0.9.1...v0.9.2) (2019-11-04)

### Bug Fixes

- refactor TypeScript declaration file for `index.d.ts` ([f1fc00b](https://github.com/remarkablemark/html-react-parser/commit/f1fc00b))

### Build System

- **package:** remove `opencollective-postinstall` ([6e0b870](https://github.com/remarkablemark/html-react-parser/commit/6e0b870))
- **package:** upgrade dependency html-dom-parser@0.2.3 ([891eda4](https://github.com/remarkablemark/html-react-parser/commit/891eda4)), closes [#126](https://github.com/remarkablemark/html-react-parser/issues/126)

## [0.9.1](https://github.com/remarkablemark/html-react-parser/compare/v0.9.0...v0.9.1) (2019-07-09)

### Build System

- replace `webpack` with `rollup` in order to optimize bundle ([a04ef27](https://github.com/remarkablemark/html-react-parser/commit/a04ef27))
- **index:** fix rollup error of mixing named and default exports ([230de70](https://github.com/remarkablemark/html-react-parser/commit/230de70))

## [0.9.0](https://github.com/remarkablemark/html-react-parser/compare/v0.8.1...v0.9.0) (2019-07-09)

### Bug Fixes

- **attributes-to-props:** handle attr named after Object properties ([3f857bb](https://github.com/remarkablemark/html-react-parser/commit/3f857bb))

### Build System

- **package:** update `react-property` to 1.0.1 ([26ebef9](https://github.com/remarkablemark/html-react-parser/commit/26ebef9))

### Features

- **attributes-to-props:** check for overloaded boolean values ([1151cfb](https://github.com/remarkablemark/html-react-parser/commit/1151cfb))
- **attributes-to-props:** replace `react-dom` with `react-property` ([d6274b9](https://github.com/remarkablemark/html-react-parser/commit/d6274b9)), closes [#107](https://github.com/remarkablemark/html-react-parser/issues/107)

### Tests

- **attributes-to-props:** improve test names ([17fbdfd](https://github.com/remarkablemark/html-react-parser/commit/17fbdfd))

## [0.8.1](https://github.com/remarkablemark/html-react-parser/compare/v0.8.0...v0.8.1) (2019-07-03)

### Tests

- **html-to-react:** update variable name to fix test ([73237dd](https://github.com/remarkablemark/html-react-parser/commit/73237dd))

## [0.8.0](https://github.com/remarkablemark/html-react-parser/compare/v0.7.1...v0.8.0) (2019-06-24)

### Bug Fixes

- **attributes-to-props:** fix lint error `no-prototype-builtins` ([fa66dfc](https://github.com/remarkablemark/html-react-parser/commit/fa66dfc))

### Build System

- **package:** refactor webpack config and generate sourcemap ([5dd4f07](https://github.com/remarkablemark/html-react-parser/commit/5dd4f07))
- **package:** rename npm script `cover` to `test:cover` ([7d806c8](https://github.com/remarkablemark/html-react-parser/commit/7d806c8))
- **package:** update `html-dom-parser@0.2.2` and devDependencies ([b39ac53](https://github.com/remarkablemark/html-react-parser/commit/b39ac53))
- **package:** update dependencies and devDependencies ([8765ea9](https://github.com/remarkablemark/html-react-parser/commit/8765ea9))
- **package:** update dependency `style-to-object` to 0.2.3 ([c2cc2ec](https://github.com/remarkablemark/html-react-parser/commit/c2cc2ec))

### Features

- **dom-to-react:** skip and do not parse <script> content ([1fb5ee2](https://github.com/remarkablemark/html-react-parser/commit/1fb5ee2))

### Tests

- **html-to-react:** add test that verifies `domToReact` is exported ([320c364](https://github.com/remarkablemark/html-react-parser/commit/320c364))
- verify invalid style for `attributesToProps` throws an error ([b97f2e1](https://github.com/remarkablemark/html-react-parser/commit/b97f2e1))

## [0.7.1](https://github.com/remarkablemark/html-react-parser/compare/v0.7.0...v0.7.1) (2019-05-27)

## [0.7.0](https://github.com/remarkablemark/html-react-parser/compare/v0.6.4...v0.7.0) (2019-04-05)

### Bug Fixes

- **coveralls:** moved dtslint tests to lint folder ([306fceb](https://github.com/remarkablemark/html-react-parser/commit/306fceb))
- **types:** html-dom-parser > html-react-parser ([438b9af](https://github.com/remarkablemark/html-react-parser/commit/438b9af))

### Features

- **types:** add lib/dom-to-react declaration ([27ed8b6](https://github.com/remarkablemark/html-react-parser/commit/27ed8b6))

## [0.6.4](https://github.com/remarkablemark/html-react-parser/compare/v0.6.3...v0.6.4) (2019-03-29)

### Bug Fixes

- **dom-to-react:** allow custom keys for replacement ([abf20a2](https://github.com/remarkablemark/html-react-parser/commit/abf20a2))
- **dom-to-react:** fix typos in the test ([4eec53e](https://github.com/remarkablemark/html-react-parser/commit/4eec53e))

## [0.6.3](https://github.com/remarkablemark/html-react-parser/compare/v0.6.2...v0.6.3) (2019-03-19)

### Bug Fixes

- **typescript:** test.tsx after dtslint run ([38e6bba](https://github.com/remarkablemark/html-react-parser/commit/38e6bba))

## [0.6.2](https://github.com/remarkablemark/html-react-parser/compare/v0.6.1...v0.6.2) (2019-03-07)

## [0.6.1](https://github.com/remarkablemark/html-react-parser/compare/v0.6.0...v0.6.1) (2019-01-03)

### Bug Fixes

- **utilities:** allow numbers in custom style names ([5a6600f](https://github.com/remarkablemark/html-react-parser/commit/5a6600f))

## [0.6.0](https://github.com/remarkablemark/html-react-parser/compare/v0.5.0...v0.6.0) (2018-12-17)

### Features

- **utilities:** add support for custom styles beginning with "--\*" ([2c0a9dc](https://github.com/remarkablemark/html-react-parser/commit/2c0a9dc))

## [0.5.0](https://github.com/remarkablemark/html-react-parser/compare/v0.4.7...v0.5.0) (2018-12-16)

### Bug Fixes

- **attributes-to-props:** undo default function parameter ([1017b25](https://github.com/remarkablemark/html-react-parser/commit/1017b25))

### Features

- support custom elements in React 16 ([7b2c5a8](https://github.com/remarkablemark/html-react-parser/commit/7b2c5a8))

## [0.4.7](https://github.com/remarkablemark/html-react-parser/compare/v0.4.6...v0.4.7) (2018-09-14)

## [0.4.6](https://github.com/remarkablemark/html-react-parser/compare/v0.4.5...v0.4.6) (2018-05-13)

### Bug Fixes

- accidentally left a console ([953e564](https://github.com/remarkablemark/html-react-parser/commit/953e564))
- added test case for viewBox ([261ffb7](https://github.com/remarkablemark/html-react-parser/commit/261ffb7))
- moving svg mock to correct place ([6ffb148](https://github.com/remarkablemark/html-react-parser/commit/6ffb148))
- svg attributes now correctly handled ([94643e1](https://github.com/remarkablemark/html-react-parser/commit/94643e1))

## [0.4.5](https://github.com/remarkablemark/html-react-parser/compare/v0.4.4...v0.4.5) (2018-05-09)

### Bug Fixes

- **package:** upgrade style-to-object@0.2.1 ([d065c60](https://github.com/remarkablemark/html-react-parser/commit/d065c60))

## [0.4.4](https://github.com/remarkablemark/html-react-parser/compare/v0.4.3...v0.4.4) (2018-05-07)

### Bug Fixes

- **package:** upgrade react-dom-core@0.0.3 ([b4a1c6e](https://github.com/remarkablemark/html-react-parser/commit/b4a1c6e))

## [0.4.3](https://github.com/remarkablemark/html-react-parser/compare/v0.4.2...v0.4.3) (2018-03-27)

### Bug Fixes

- **parser:** fix boolean attributes parsing ([e478a44](https://github.com/remarkablemark/html-react-parser/commit/e478a44))
- **parser:** fix case when style is empty string ([fa2a8b4](https://github.com/remarkablemark/html-react-parser/commit/fa2a8b4))

## [0.4.2](https://github.com/remarkablemark/html-react-parser/compare/v0.4.1...v0.4.2) (2018-02-20)

### Bug Fixes

- **package:** upgrade html-dom-parser@0.1.3 and devDependencies ([1c236ed](https://github.com/remarkablemark/html-react-parser/commit/1c236ed))
- **release:** do not lint standard-version commit message ([2d35a1f](https://github.com/remarkablemark/html-react-parser/commit/2d35a1f))

## [0.4.1](https://github.com/remarkablemark/html-react-parser/compare/v0.4.0...v0.4.1) (2017-11-28)

### Bug Fixes

- **attributes-to-props.js:** Remove unappropriate console logging and remove double quote from tests ([10ff149](https://github.com/remarkablemark/html-react-parser/commit/10ff149))
- **attributes-to-props.js:** Use AST to transform style attributes into an style object ([68cd565](https://github.com/remarkablemark/html-react-parser/commit/68cd565))
- **utilities.js:** Format string to lowercase before converting to camel case and assert the string is a string ([4522666](https://github.com/remarkablemark/html-react-parser/commit/4522666))

## [0.4.0](https://github.com/remarkablemark/html-react-parser/compare/v0.3.6...v0.4.0) (2017-10-01)

### Added

- [react-dom-core](https://github.com/remarkablemark/react-dom-core) to dependencies (closes [#43](https://github.com/remarkablemark/html-react-parser/issues/43))
  - `react-dom` 16 no longer exposes `lib`, which includes the DOM property configs
  - Upgrade devDependencies of `react` and `react-dom` to 16
  - Update README and examples

## [0.3.6](https://github.com/remarkablemark/html-react-parser/compare/v0.3.5...v0.3.6) (2017-09-30)

### Changed

- Dependencies
  - html-dom-parser@0.1.2
    - Fixes IE9 client parser bug
  - Set react and react-dom versions to `^15.4`
    - Version 16 no longer exposes `HTMLDOMPropertyConfig` and `SVGDOMPropertyConfig`

## [0.3.5](https://github.com/remarkablemark/html-react-parser/compare/v0.3.4...v0.3.5) (2017-06-26)

### Changed

- Dependencies
  - html-dom-parser@0.1.1
    - Fixes IE client parser bug
  - eslint@4.1.1
  - webpack@3.0.0
- Update webpack to enable scope hoisting

## [0.3.4](https://github.com/remarkablemark/html-react-parser/compare/v0.3.3...v0.3.4) (2017-06-17)

### Changed

- Dependencies:
  - html-dom-parser@0.1.0
  - coveralls@2.13.1
  - eslint@4.0.0
  - mocha@3.4.2
  - webpack@2.6.1

### Removed

- Dependencies:
  - jsdomify

## [0.3.3](https://github.com/remarkablemark/html-react-parser/compare/v0.3.2...v0.3.3) (2017-01-27)

### Added

- Created CHANGELOG with details on each version release ([#37](https://github.com/remarkablemark/html-react-parser/issues/37))

### Changed

- Update examples to load parser from relative `dist/` directory ([#36](https://github.com/remarkablemark/html-react-parser/issues/36))
- Removed unnecessary field "browser" in `package.json` ([#36](https://github.com/remarkablemark/html-react-parser/issues/36))

## [0.3.2](https://github.com/remarkablemark/html-react-parser/compare/v0.3.1...v0.3.2) (2017-01-26)

### Fixed

- Decode HTML entities by default on node ([#34](https://github.com/remarkablemark/html-react-parser/issues/34))

## [0.3.1](https://github.com/remarkablemark/html-react-parser/compare/v0.3.0...v0.3.1) (2017-01-10)

### Changed

- Updated README by fixing CDN installation instructions and adding JSFiddle

## [0.3.0](https://github.com/remarkablemark/html-react-parser/compare/v0.2.0...v0.3.0) (2016-11-18)

### Changed

- Upgrade `react` and `react-dom` to >15.4

## [0.2.0](https://github.com/remarkablemark/html-react-parser/compare/v0.1.1...v0.2.0) (2016-11-18)

### Added

- Create npm script `clean` that removes `dist/` directory

### Fixed

- Silence webpack warning by keeping react <15.4 in this version

## [0.1.1](https://github.com/remarkablemark/html-react-parser/compare/v0.1.0...v0.1.1) (2016-11-17)

### Fixed

- `HTMLDOMPropertyConfig.js` and `SVGDOMPropertyConfig.js` have been moved from `react/lib/` to `react-dom/lib/` in v15.4

## [0.1.0](https://github.com/remarkablemark/html-react-parser/compare/v0.0.7...v0.1.0) (2016-10-14)

### Changed

- Replace HTML to DOM converter with [html-dom-parser](https://github.com/remarkablemark/html-dom-parser) ([#28](https://github.com/remarkablemark/html-react-parser/issues/28))
  - Save `html-dom-parser`
  - Remove `domhandler` and `htmlparser2`
- Update tests and README

## [0.0.7](https://github.com/remarkablemark/html-react-parser/compare/v0.0.6...v0.0.7) (2016-09-27)

### Added

- Examples of using the parser with script tag and RequireJS ([#26](https://github.com/remarkablemark/html-react-parser/issues/26))

### Changed

- Update build ([#25](https://github.com/remarkablemark/html-react-parser/issues/25))
- Update README description, instructions, and examples ([#27](https://github.com/remarkablemark/html-react-parser/issues/27))

## [0.0.6](https://github.com/remarkablemark/html-react-parser/compare/v0.0.5...v0.0.6) (2016-09-27)

### Added

- README example with advanced usage of `replace` option from @poacher2k ([#17](https://github.com/remarkablemark/html-react-parser/issues/17))
- Contributors section to README ([#21](https://github.com/remarkablemark/html-react-parser/issues/21))

### Changed

- Use webpack to build UMD bundle ([#22](https://github.com/remarkablemark/html-react-parser/issues/22))

### Fixed

- Regex bug on client parser ([#24](https://github.com/remarkablemark/html-react-parser/issues/24))

## [0.0.5](https://github.com/remarkablemark/html-react-parser/compare/v0.0.4...v0.0.5) (2016-08-30)

### Changed

- Remove `key` parameter from `replace` and use `React.cloneElement` ([#18](https://github.com/remarkablemark/html-react-parser/issues/18))

### Fixed

- Parsing of `<script>` and `<style>` tags ([#20](https://github.com/remarkablemark/html-react-parser/issues/20))

## [0.0.4](https://github.com/remarkablemark/html-react-parser/compare/v0.0.3...v0.0.4) (2016-08-29)

### Added

- Send coverage report generated by [istanbul](http://gotwarlost.github.io/istanbul/) to [coveralls](https://coveralls.io) ([#12](https://github.com/remarkablemark/html-react-parser/issues/12))
- Display badges in README ([#13](https://github.com/remarkablemark/html-react-parser/issues/13), [#15](https://github.com/remarkablemark/html-react-parser/issues/15))
- Update parser's `replace` option with additional 2nd parameter `key` ([#16](https://github.com/remarkablemark/html-react-parser/issues/16))

### Fixed

- Void elements (e.g., `<img />`) should not have children ([#16](https://github.com/remarkablemark/html-react-parser/issues/16))
- Set default `key` parameter for sibling elements due to [keys warning](https://fb.me/react-warning-keys) ([#16](https://github.com/remarkablemark/html-react-parser/issues/16))

## [0.0.3](https://github.com/remarkablemark/html-react-parser/compare/v0.0.2...v0.0.3) (2016-08-24)

### Added

- Make package [UMD](https://github.com/ForbesLindesay/umd/blob/master/template.js) compatible ([#9](https://github.com/remarkablemark/html-react-parser/issues/9))
- Throw an error if first argument is not a string ([#10](https://github.com/remarkablemark/html-react-parser/issues/10))

### Changed

- Differentiate between node and browser environments for parser ([#5](https://github.com/remarkablemark/html-react-parser/issues/5))

### Fixed

- HTML to DOM conversion on the client ([#10](https://github.com/remarkablemark/html-react-parser/issues/10))

## [0.0.2](https://github.com/remarkablemark/html-react-parser/compare/v0.0.1...v0.0.2) (2016-08-23)

### Added

- [ESLint](http://eslint.org) as the linter ([#2](https://github.com/remarkablemark/html-react-parser/issues/2))
- [Travis CI](https://travis-ci.org) ([#4](https://github.com/remarkablemark/html-react-parser/issues/4))

### Fixed

- `package.json` **peerDependencies** for `react` and `react-dom`

## [0.0.1](https://github.com/remarkablemark/html-react-parser/tree/v0.0.1) (2016-08-23)

### Added

- HTML to React parser which consists of:
  - HTML string to DOM object converter
  - DOM object to React nodes converter
- Tests
- README
