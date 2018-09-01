# html-react-parser

[![NPM](https://nodei.co/npm/html-react-parser.png)](https://nodei.co/npm/html-react-parser/)

[![NPM version](https://img.shields.io/npm/v/html-react-parser.svg)](https://www.npmjs.com/package/html-react-parser)
[![Build Status](https://travis-ci.org/remarkablemark/html-react-parser.svg?branch=master)](https://travis-ci.org/remarkablemark/html-react-parser)
[![Coverage Status](https://coveralls.io/repos/github/remarkablemark/html-react-parser/badge.svg?branch=master)](https://coveralls.io/github/remarkablemark/html-react-parser?branch=master)
[![Dependency status](https://david-dm.org/remarkablemark/html-react-parser.svg)](https://david-dm.org/remarkablemark/html-react-parser)

An HTML to React parser that works on the server and the browser:
```
HTMLReactParser(htmlString[, options])
```

It converts an HTML string to [React elements](https://facebook.github.io/react/docs/react-api.html#creating-react-elements).

There's also an [option](#options) to [replace](#replacedomnode) elements with your own custom React elements.

## Example

```js
var Parser = require('html-react-parser');
Parser('<p>Hello, world!</p>');
// same output as `React.createElement('p', {}, 'Hello, world!')`
```

[JSFiddle](https://jsfiddle.net/remarkablemark/7v86d800/) | [repl.it](https://repl.it/@remarkablemark/html-react-parser)

## Installation

[NPM](https://www.npmjs.com/package/html-react-parser):

```sh
npm install html-react-parser --save
```

[Yarn](https://yarn.fyi/html-react-parser):

```sh
yarn add html-react-parser
```

[CDN](https://unpkg.com/html-react-parser/):

```html
<!-- HTMLReactParser depends on React -->
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/html-react-parser@latest/dist/html-react-parser.min.js"></script>
```

More [examples](https://github.com/remarkablemark/html-react-parser/tree/master/examples).

## Usage

Given you have the following imported:
```js
// ES Modules
import Parser from 'html-react-parser';
import { render } from 'react-dom';
```

Render a single element:
```js
render(
  Parser('<h1>single</h1>'),
  document.getElementById('root')
);
```

Render multiple elements:
```js
// with JSX
render(
  // the parser returns an array for adjacent elements
  // so make sure they're nested under a parent React element
  <div>{Parser('<p>brother</p><p>sister</p>')}</div>,
  document.getElementById('root')
);

// or without JSX
render(
  React.createElement('div', {}, Parser('<p>brother</p><p>sister</p>')),
  document.getElementById('root')
);
```

Render nested elements:
```js
render(
  Parser('<ul><li>inside</li></ul>'),
  document.getElementById('root')
);
```

Renders with attributes preserved:
```js
render(
  Parser('<p id="foo" class="bar baz" data-qux="42">look at me now</p>'),
  document.getElementById('root')
);
```

### Options

#### replace(domNode)

The `replace` method allows you to swap an element with your own React element.

The first argument is `domNode`--an object with the same output as [htmlparser2](https://github.com/fb55/htmlparser2)'s [domhandler](https://github.com/fb55/domhandler#example).

The element is replaced only if a valid React element is returned.

```js
Parser('<p id="replace">text</p>', {
  replace: function(domNode) {
    if (domNode.attribs && domNode.attribs.id === 'replace') {
      return React.createElement('span', {}, 'replaced');
    }
  }
});
```

Here's an [example](https://repl.it/@remarkablemark/html-react-parser-replace-example) that replaces but keeps the children:
```js
// with ES6 and JSX
import domToReact from 'html-react-parser/lib/dom-to-react';

const htmlString = `
  <p id="main">
    <span class="prettify">
      keep me and make me pretty!
    </span>
  </p>
`;

const parserOptions = {
  replace: ({ attribs, children }) => {
    if (!attribs) return;

    if (attribs.id === 'main') {
      return (
        <h1 style={{ fontSize: 42 }}>
          {domToReact(children, parserOptions)}
        </h1>
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

const reactElement = Parser(htmlString, parserOptions);
ReactDOMServer.renderToStaticMarkup(reactElement);
```

[Output](https://repl.it/@remarkablemark/html-react-parser-replace-example):
```html
<h1 style="font-size:42px">
  <span style="color:hotpink">
    keep me and make me pretty!
  </span>
</h1>
```

## Testing

```sh
npm test
npm run lint # npm run lint:fix
```

## Benchmarks

```sh
npm run test:benchmark
```

Here's an example output of the benchmarks run on a MacBook Pro 2017:

```
html-to-react - Single x 415,186 ops/sec ±0.92% (85 runs sampled)
html-to-react - Multiple x 139,780 ops/sec ±2.32% (87 runs sampled)
html-to-react - Complex x 8,118 ops/sec ±2.99% (82 runs sampled)
```

## Release

```sh
npm run release
npm publish
git push --follow-tags
```

## Special Thanks

- [Contributors](https://github.com/remarkablemark/html-react-parser/graphs/contributors)
- [html-dom-parser](https://github.com/remarkablemark/html-dom-parser)
- [react-dom-core](https://github.com/remarkablemark/react-dom-core)
- [style-to-object](https://github.com/remarkablemark/style-to-object)

## License

[MIT](https://github.com/remarkablemark/html-react-parser/blob/master/LICENSE)
