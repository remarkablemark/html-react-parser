# html-react-parser

[![NPM](https://nodei.co/npm/html-react-parser.png)](https://nodei.co/npm/html-react-parser/)

[![NPM version](https://img.shields.io/npm/v/html-react-parser.svg)](https://www.npmjs.com/package/html-react-parser)
[![Build Status](https://travis-ci.org/remarkablemark/html-react-parser.svg?branch=master)](https://travis-ci.org/remarkablemark/html-react-parser)
[![Coverage Status](https://coveralls.io/repos/github/remarkablemark/html-react-parser/badge.svg?branch=master)](https://coveralls.io/github/remarkablemark/html-react-parser?branch=master)
[![Dependency status](https://david-dm.org/remarkablemark/html-react-parser.svg)](https://david-dm.org/remarkablemark/html-react-parser)

An HTML to React parser:

```
Parser(htmlString[, options])
```

The parser converts an HTML string to [React Element(s)](https://facebook.github.io/react/docs/react-api.html#creating-react-elements).

There is also an option to [replace](#replacedomnode) element(s) with your own React Element(s) via the [parser options](#options).

#### Example

```js
var Parser = require('html-react-parser');
Parser('<p>Hello, world!</p>');
// same output as `React.createElement('p', {}, 'Hello, world!')`
```

[JSFiddle](https://jsfiddle.net/remarkablemark/7v86d800/)

## Installation

[NPM](https://www.npmjs.com/package/html-react-parser):

```sh
$ npm install html-react-parser
```

Or if you're using react <15.4:

```sh
$ npm install html-react-parser@0.2
```

[CDN](https://unpkg.com/html-react-parser/):

```html
<!-- HTMLReactParser depends on React and ReactDOM -->
<script src="https://unpkg.com/react@latest/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@latest/dist/react-dom.min.js"></script>
<script src="https://unpkg.com/html-react-parser@latest/dist/html-react-parser.min.js"></script>
```

See more [examples](https://github.com/remarkablemark/html-react-parser/tree/master/examples).

## Usage

Given that you have the following required:

```js
// ES6
import Parser from 'html-react-parser';
import { render } from 'react-dom';
```

You may render one element:

```js
render(
    Parser('<p>single</p>'),
    document.getElementById('root')
);
```

You may render adjacent elements:

```js
// with JSX
render(
    // the parser returns an array for adjacent elements
    // so make sure they are nested under a parent React element
    <div>
        {Parser('<p>brother</p><p>sister</p>')}
    </div>,
    document.getElementById('root')
);

// without JSX
render(
    React.createElement('div', {},
        Parser('<p>brother</p><p>sister</p>')
    ),
    document.getElementById('root')
);
```

You may render nested elements:

```js
render(
    Parser('<ul><li>inside</li></ul>'),
    document.getElementById('root')
);
```

The parser will also preserve attributes:

```js
render(
    Parser('<section id="foo" class="bar baz" data-qux="42">look at me now</section>'),
    document.getElementById('root')
);
```

### Options

#### replace(domNode)

The `replace` method allows you to swap an element with your own React Element.

The first argument is `domNode`, which is an object that has the same output as [htmlparser2.parseDOM](https://github.com/fb55/domhandler#example).

The element is only replaced if a valid React Element is returned.

```js
// with JSX
Parser('<p id="replace">text</p>', {
    replace: function(domNode) {
        if (domNode.attribs && domNode.attribs.id === 'replace') {
            return <span>replaced</span>;
        }
    }
});
```

Advanced example (keep the replaced children):

```js
// with ES6 and JSX

// converts dom object to React Elements
import domToReact from 'html-react-parser/lib/dom-to-react';

const html = `
    <div>
        <p id="main">
            <span class="prettify">
                keep me and make me pretty!
            </span>
        </p>
    </div>
`;

// parser config
const options = {
    replace: (domNode) => {
        // do not replace if element has no attributes
        if (!domNode.attribs) return;

        if (domNode.attribs.id === 'main') {
            return (
                <span style={{ fontSize: '42px' }}>
                    {domToReact(domNode.children, options)}
                </span>
            );

        } else if (domNode.attribs.class === 'prettify') {
            return (
                <span style={{ color: 'hotpink' }}>
                    {domToReact(domNode.children, options)}
                </span>
            );
        }
    }
};

render(
    Parser(html, options),
    document.getElementById('root')
);
```

You will get the following:

```html
<div>
    <span style="font-size: 42px;">
        <span class="prettify" style="color: hotpink;">
            keep me and make me pretty!
        </span>
    </span>
</div>
```

## Testing

```sh
$ npm test
$ npm run lint
```

## Special Thanks

- [html-dom-parser](https://github.com/remarkablemark/html-dom-parser)
- [Contributors](https://github.com/remarkablemark/html-react-parser/graphs/contributors)

## License

[MIT](https://github.com/remarkablemark/html-react-parser/blob/master/LICENSE)
