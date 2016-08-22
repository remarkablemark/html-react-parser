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

## Testing

```sh
$ npm test
```

## License

[MIT](https://github.com/remarkablemark/html-react-parser/blob/master/LICENSE)
