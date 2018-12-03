var domToReact = require('./lib/dom-to-react');
var htmlToDOM = require('html-dom-parser');

// decode HTML entities by default for `htmlparser2`
var defaultDomParserOptions = {
  decodeEntities: true,
  lowerCaseAttributeNames: false
};

/**
 * Convert HTML string to React elements.
 *
 * @param  {String}   html              - The HTML string.
 * @param  {Object}   [options]         - The additional options.
 * @param  {Function} [options.replace] - The replace method.
 * @param  {Object}   [options.domParserOptions] - Additional domParserOptions options.
 * @return {ReactElement|Array}
 */
function HTMLReactParser(html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  // adding new options to domParserOptions
  // var domParserOptions = Object.assign(defaultDomParserOptions, (options && options.domParserOptions) || {});
  var domParserOptions = defaultDomParserOptions;
  if (options && options.domParserOptions instanceof Object) {
    domParserOptions = options.domParserOptions;
    for (var key in defaultDomParserOptions) {
      if (domParserOptions[key] === undefined) {
        domParserOptions[key] = defaultDomParserOptions[key];
      }
    }
  }

  return domToReact(htmlToDOM(html, domParserOptions), options);
}

/**
 * Export HTML to React parser.
 */
module.exports = HTMLReactParser;
