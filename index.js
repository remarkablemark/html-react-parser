var domToReact = require('./lib/dom-to-react');
var attributesToProps = require('./lib/attributes-to-props');
var htmlToDOM = require('html-dom-parser');

// support backwards compatibility for ES Module
htmlToDOM =
  /* istanbul ignore next */
  typeof htmlToDOM.default === 'function' ? htmlToDOM.default : htmlToDOM;

var domParserOptions = { lowerCaseAttributeNames: false };

/**
 * Converts HTML string to React elements.
 *
 * @param  {String}   html                    - HTML string.
 * @param  {Object}   [options]               - Parser options.
 * @param  {Object}   [options.htmlparser2]   - htmlparser2 options.
 * @param  {Object}   [options.library]       - Library for React, Preact, etc.
 * @param  {Function} [options.replace]       - Replace method.
 * @return {JSX.Element|JSX.Element[]|String} - React element(s), empty array, or string.
 */
function HTMLReactParser(html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string');
  }
  if (html === '') {
    return [];
  }
  options = options || {};
  return domToReact(
    htmlToDOM(html, options.htmlparser2 || domParserOptions),
    options
  );
}

HTMLReactParser.domToReact = domToReact;
HTMLReactParser.htmlToDOM = htmlToDOM;
HTMLReactParser.attributesToProps = attributesToProps;
HTMLReactParser.Element = require('domhandler/lib/node').Element;

// support CommonJS and ES Modules
module.exports = HTMLReactParser;
module.exports.default = HTMLReactParser;
