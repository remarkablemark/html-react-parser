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

The parser converts a string of HTML to [React Element(s)](https://facebook.github.io/react/docs/glossary.html#react-elements).

There is also an option to [replace](#replacedomnode) element(s) with your own React Element(s) via the [parser options](#options).

#### Example

```js
var Parser = require('html-react-parser');
Parser('<p>Hello, world!</p>');
// same output as `React.createElement('p', {}, 'Hello, world!')`
```

## Installation

```sh
$ npm install html-react-parser
```

Or you can download the script from a CDN:

```html
<!-- HTMLReactParser depends on React -->
<script src="https://unpkg.com/react@latest/dist/react.min.js"></script>
<script src="https://unpkg.com/html-react-parser@latest/dist/html-react-parser.min.js"></script>
```

See more [examples](https://github.com/remarkablemark/html-react-parser/tree/master/examples).

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

#### replace(domNode)

The `replace` method allows you to swap an element with your own React element.

The first argument is `domNode`, which is an object which shares the same schema as the output from [htmlparser2.parseDOM](https://github.com/fb55/domhandler#example).

```js
Parser('<p id="replace">text</p>', {
    replace: function(domNode) {
        console.log(domNode);
        // {  type: 'tag',
        //    name: 'p',
        //    attribs: { id: 'replace' },
        //    children: [],
        //    next: null,
        //    prev: null,
        //    parent: null }

        return;
        // element is not replaced because
        // a valid React element is not returned
    }
});
```

Simple example:

```js
var Parser = require('html-react-parser');
var React = require('react');

var html = (
    '<div>' +
        '<p id="replace">'
            'replace me' +
        '</p>' +
    '</div>'
);

var reactElement = Parser(html, {
    replace: function(domNode) {
        if (domNode.attribs && domNode.attribs.id === 'replace') {
            return React.createElement('span', {
                style: { fontSize: '42px' }
            }, 'replaced!');
            // equivalent jsx syntax:
            // return <span style={{ fontSize: '42px' }}>replaced!</span>;
        }
    }
});

require('react-dom').render(
    reactElement,
    document.getElementById('root')
);
// <div>
//     <span style="font-size: 42px;">
//         replaced!
//     </span>
// </div>
```

Advanced example (the replaced element's children are kept):

```js
var Parser = require('html-react-parser');
var React = require('react');

// used for recursively parsing DOM created from the HTML
var domToReact = require('html-react-parser/lib/dom-to-react');

var html = (
    '<div>' +
        '<p id="main">' +
            '<span class="prettify">' +
                'keep me and make me pretty!' +
            '</span>' +
        '</p>' +
    '</div>'
);

var parserConfig = {
    replace: function(domNode) {
        var parsedChildren;
        if (domNode.attribs) {
            if (domNode.attribs.id === 'main') {
                // continue parsing domNode's children with same config
                parsedChildren = domToReact(domNode.children, parserConfig);
                return React.createElement('span', {
                    style: { fontSize: '42px' }
                }, parsedChildren);
                // equivalent jsx syntax:
                // return <span style={{ fontSize: '42px' }}>{parsedChildren}</span>;

            } else if (domNode.attribs.class === 'prettify') {
                // continue parsing domNode's children with same config
                parsedChildren = domToReact(domNode.children, parserConfig);
                return React.createElement('span', {
                    style: { color: 'hotpink' }
                }, parsedChildren);
                // equivalent jsx syntax:
                // return <span style={{ color: 'hotpink' }}>{parsedChildren}</span>;
            }
        }
    }
};

require('react-dom').render(
    Parser(html, parserConfig),
    document.getElementById('root')
);
// <div>
//     <span style="font-size: 42px;">
//         <span class="prettify" style="color: hotpink;">
//             keep me and make me pretty!
//         </span>
//     </span>
// </div>
```

## Testing

```sh
$ npm test
$ npm run lint
```

## Special Thanks

- To [htmlparser2](https://github.com/fb55/htmlparser2).
- To all the [contributors](https://github.com/remarkablemark/html-react-parser/graphs/contributors).
- To [benox3](https://github.com/benox3) and [tdlm](https://github.com/tdlm) for their feedback and review.

## License

[MIT](https://github.com/remarkablemark/html-react-parser/blob/master/LICENSE)
