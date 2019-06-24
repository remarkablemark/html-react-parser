# html-react-parser

[![NPM](https://nodei.co/npm/html-react-parser.png)](https://nodei.co/npm/html-react-parser/)

[![NPM version](https://img.shields.io/npm/v/html-react-parser.svg)](https://www.npmjs.com/package/html-react-parser)
[![Build Status](https://travis-ci.org/remarkablemark/html-react-parser.svg?branch=master)](https://travis-ci.org/remarkablemark/html-react-parser)
[![Coverage Status](https://coveralls.io/repos/github/remarkablemark/html-react-parser/badge.svg?branch=master)](https://coveralls.io/github/remarkablemark/html-react-parser?branch=master)
[![Dependency status](https://david-dm.org/remarkablemark/html-react-parser.svg)](https://david-dm.org/remarkablemark/html-react-parser)
[![NPM downloads](https://img.shields.io/npm/dm/html-react-parser.svg?style=flat-square)](https://www.npmjs.com/package/html-react-parser)

HTML to React parser that works on both the server (Node.js) and client (browser):

```
HTMLReactParser(string[, options])
```

It converts an HTML string to one or more [React elements](https://reactjs.org/docs/react-api.html#creating-react-elements). There's also an option to [replace an element](#replacedomnode) with your own.

#### Example:

```js
var parse = require('html-react-parser');
parse('<div>text</div>'); // equivalent to `React.createElement('div', {}, 'text')`
```

[CodeSandbox](https://codesandbox.io/s/940pov1l4w) | [JSFiddle](https://jsfiddle.net/remarkablemark/7v86d800/) | [Repl.it](https://repl.it/@remarkablemark/html-react-parser) | [Examples](https://github.com/remarkablemark/html-react-parser/tree/master/examples).

## Installation

[NPM](https://www.npmjs.com/package/html-react-parser):

```sh
$ npm install html-react-parser --save
```

[Yarn](https://yarnpkg.com/package/html-react-parser):

```sh
$ yarn add html-react-parser
```

[CDN](https://unpkg.com/html-react-parser/):

```html
<!-- HTMLReactParser depends on React -->
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/html-react-parser@latest/dist/html-react-parser.min.js"></script>
<script>
  window.HTMLReactParser(/* string */);
</script>
```

## Usage

Import the module:

```js
// CommonJS
const parse = require('html-react-parser');

// ES Modules
import parse from 'html-react-parser';
```

Parse single element:

```js
parse('<h1>single</h1>');
```

Parse multiple elements:

```js
parse('<li>Item 1</li><li>Item 2</li>');
```

But make sure to render the parsed adjacent elements under a parent element since the parsed output is an array:

```jsx
import React from 'react';
import parse from 'html-react-parser';

function App() {
  return (
    <ul>
      {parse(`
        <li>Item 1</li>
        <li>Item 2</li>
      `)}
    </ul>
  );
}
```

Parse nested elements:

```js
parse('<body><p>Lorem ipsum</p></body>');
```

Parse element with attributes:

```js
parse(
  '<hr id="foo" class="bar" data-attr="baz" custom="qux" style="top:42px;">'
);
```

### Options

#### replace(domNode)

The `replace` method allows you to swap an element with your own React element.

The first argument is `domNode`―an object with the same output as [htmlparser2](https://github.com/fb55/htmlparser2)'s [domhandler](https://github.com/fb55/domhandler#example).

The element is replaced only if a valid React element is returned.

```js
parse('<p id="replace">text</p>', {
  replace: function(domNode) {
    if (domNode.attribs && domNode.attribs.id === 'replace') {
      return React.createElement('span', {}, 'replaced');
    }
  }
});
```

[Example](https://repl.it/@remarkablemark/html-react-parser-replace-example) that modifies an element but keeps the children:

```jsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import parse, { domToReact } from 'html-react-parser';

const html = `
  <p id="main">
    <span class="prettify">
      keep me and make me pretty!
    </span>
  </p>
`;

const options = {
  replace: ({ attribs, children }) => {
    if (!attribs) return;

    if (attribs.id === 'main') {
      return (
        <h1 style={{ fontSize: 42 }}>{domToReact(children, parserOptions)}</h1>
      );
    } else if (attribs.class === 'prettify') {
      return (
        <span style={{ color: 'hotpink' }}>
          {domToReact(children, parserOptions)}
        </span>
      );
    }
  }
};

const reactElement = parse(html, options);
console.log(renderToStaticMarkup(reactElement));
```

Output:

```html
<h1 style="font-size:42px">
  <span style="color:hotpink">
    keep me and make me pretty!
  </span>
</h1>
```

[Example](https://repl.it/@remarkablemark/html-react-parser-issue-56) that excludes an element:

```jsx
parse('<p><br id="remove"></p>', {
  replace: ({ attribs }) =>
    attribs && attribs.id === 'remove' && <React.Fragment />
});
```

## FAQ

#### Is this library XSS safe?

No, this library does **_not_** sanitize against [XSS (Cross-Site Scripting)](https://wikipedia.org/wiki/Cross-site_scripting). See [#94](https://github.com/remarkablemark/html-react-parser/issues/94).

#### Are `<script>` tags parsed?

No, `<script>` tags are skipped because [react-dom](https://reactjs.org/docs/react-dom.html) does not render the contents. See [#98](https://github.com/remarkablemark/html-react-parser/issues/98).

#### My HTML attributes aren't getting called.

That's because [inline event handlers](https://developer.mozilla.org/docs/Web/Guide/Events/Event_handlers) like `onclick` are parsed as a _string_ rather than a _function_. See [#73](https://github.com/remarkablemark/html-react-parser/issues/73).

## Testing

Run tests:

```sh
$ npm test
```

Run tests with coverage:

```sh
$ npm run test:coverage
```

Lint files:

```sh
$ npm run lint
```

Fix lint errors:

```sh
$ npm run lint:fix
```

## Benchmarks

```sh
$ npm run test:benchmark
```

Here's an example output of the benchmarks run on a MacBook Pro 2017:

```
html-to-react - Single x 415,186 ops/sec ±0.92% (85 runs sampled)
html-to-react - Multiple x 139,780 ops/sec ±2.32% (87 runs sampled)
html-to-react - Complex x 8,118 ops/sec ±2.99% (82 runs sampled)
```

## Release

Only collaborators with credentials can release and publish:

```sh
$ npm run release
$ git push --follow-tags && npm publish
```

## Special Thanks

- [Contributors](https://github.com/remarkablemark/html-react-parser/graphs/contributors)
- [html-dom-parser](https://github.com/remarkablemark/html-dom-parser)
- [react-dom-core](https://github.com/remarkablemark/react-dom-core)
- [style-to-object](https://github.com/remarkablemark/style-to-object)

## License

[MIT](https://github.com/remarkablemark/html-react-parser/blob/master/LICENSE)
