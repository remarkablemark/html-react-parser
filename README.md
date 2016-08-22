# html-react-parser

An HTML to React parser.

```js
var Parser = require('html-react-parser');
// Parser(htmlString[, options]);

var reactElement = Parser('<p>Hello, world!</p>');
// ReactDOM.render(reactElement, node);
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
    document.getElementById('single')
);

// adjacent elements
ReactDOM.render(
    React.createElement('div', {}, Parser('<p>one</p><p>two</p>'))
    document.getElementById('adjacent')
);

// nested elements
ReactDOM.render(
    Parser('<ul><li>inside</li></ul>'),
    document.getElementedById('nested')
);

// attributes are preserved
ReactDOM.render(
    Parser('<section id="foo" class="bar baz" data-qux="42">look at me now</section>'),
    document.getElementById('attributes')
);
```

### Options

#### replace(domNode)

```js
var Parser = require('html-react-parser');
var React = require('react');
var ReactDOM = require('react-dom');

var reactElement = Parser('<div><p id="main">replace me</p></div>', {
    replace: function(domNode) {
        if (domNode.attribs && domNode.attribs.id === 'main') {
            // element is replaced only if a valid React element is returned
            return React.createElement('span', { style: { fontSize: '42px' } }, 'replaced!');
        }
    }
});

ReactDOM.render(
    reactElement,
    document.getElementById('replace')
);
// <div><span style="font-size: 42px;">replaced!</span></div>
```

The object properties of `domNode` is the same as the output from `require('htmlparser2').parseDOM`.

## Testing

```sh
$ npm test
```

## License

[MIT](https://github.com/remarkablemark/html-react-parser/blob/master/LICENSE)
