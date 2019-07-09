var domToReact = require('./lib/dom-to-react');
var htmlToDOM = require('html-dom-parser');

// decode HTML entities by default for `htmlparser2`
var domParserOptions = { decodeEntities: true, lowerCaseAttributeNames: false };

/**
 * Converts HTML string to React elements.
 *
 * @param  {String}   html              - The HTML string to parse to React.
 * @param  {Object}   [options]         - The parser options.
 * @param  {Function} [options.replace] - The replace method.
 * @return {ReactElement|Array|String}  - When parsed with HTML string, returns React elements; otherwise, returns string or empty array.
 */
function HTMLReactParser(html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string');
  }
  return domToReact(htmlToDOM(html, domParserOptions), options);
}

HTMLReactParser.domToReact = domToReact;
HTMLReactParser.htmlToDOM = htmlToDOM;

module.exports = HTMLReactParser;
