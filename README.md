# html-react-parser

[![NPM](https://nodei.co/npm/html-react-parser.png)](https://nodei.co/npm/html-react-parser/)

[![NPM version](https://img.shields.io/npm/v/html-react-parser.svg)](https://www.npmjs.com/package/html-react-parser)
[![Build Status](https://travis-ci.org/remarkablemark/html-react-parser.svg?branch=master)](https://travis-ci.org/remarkablemark/html-react-parser)
[![Coverage Status](https://coveralls.io/repos/github/remarkablemark/html-react-parser/badge.svg?branch=master)](https://coveralls.io/github/remarkablemark/html-react-parser?branch=master)
[![Dependency status](https://david-dm.org/remarkablemark/html-react-parser.svg)](https://david-dm.org/remarkablemark/html-react-parser)

An HTML to React parser.

```
Parser(htmlString[, options])
```

The parser converts an HTML string to [React element(s)](https://facebook.github.io/react/docs/glossary.html#react-elements). You can also `replace` element(s) with your own custom React element(s) via the parser options.

### Example

```js
var Parser = require('html-react-parser');
var reactElement = (
    Parser('<p>Hello, world!</p>') // equivalent to `React.createElement('p', {}, 'Hello, world!')`
);
require('react-dom').render(reactElement, document.getElementById('root'));
```

## Installation

```sh
$ npm install html-react-parser
```

## Usage

Render to DOM:

```js
var Parser = require('html-react-parser');
var ReactDOM = require('react-dom');

// single element
ReactDOM.render(
    Parser('<p>single</p>'),
    document.getElementById('root')
);

// adjacent elements
ReactDOM.render(
    // the parser returns an array for adjacent elements
    // so make sure they are nested under a parent React element
    React.createElement('div', {}, Parser('<p>one</p><p>two</p>'))
    document.getElementById('root')
);

// nested elements
ReactDOM.render(
    Parser('<ul><li>inside</li></ul>'),
    document.getElementById('root')
);

// attributes are preserved
ReactDOM.render(
    Parser('<section id="foo" class="bar baz" data-qux="42">look at me now</section>'),
    document.getElementById('root')
);
```

### Options

#### replace(domNode, key)

The `replace` method allows you to swap an element with your own React element.

The method has 2 parameters:
1. `domNode`: An object which shares the same schema as the output from [htmlparser2.parseDOM](https://github.com/fb55/domhandler#example).
2. `key`: A number to keep track of the element. You should set it as the ["key" prop](https://fb.me/react-warning-keys) in case your element has siblings.

```js
Parser('<p id="replace">text</p>', {
    replace: function(domNode, key) {
        console.log(domNode);
        // {  type: 'tag',
        //    name: 'p',
        //    attribs: { id: 'replace' },
        //    children: [],
        //    next: null,
        //    prev: null,
        //    parent: null }

        console.log(key); // 0

        return;
        // element is not replaced because
        // a valid React element is not returned
    }
});
```

Working example:

```js
var Parser = require('html-react-parser');
var React = require('react');

var html = '<div><p id="main">replace me</p></div>';

var reactElement = Parser(html, {
    replace: function(domNode, key) {
        if (domNode.attribs && domNode.attribs.id === 'main') {
            return React.createElement('span', {
                key: key,
                style: { fontSize: '42px' } },
            'replaced!');
            // equivalent jsx syntax:
            // return <span key={key} style={{ fontSize: '42px' }}>replaced!</span>;
        }
    }
});

require('react-dom').render(reactElement, document.getElementById('root'));
// <div><span style="font-size: 42px;">replaced!</span></div>
```

## Testing

```sh
$ npm test
```

## Special Thanks

To [benox3](https://github.com/benox3) and [tdlm](https://github.com/tdlm) for their feedback and review.

## License

[MIT](https://github.com/remarkablemark/html-react-parser/blob/master/LICENSE)
