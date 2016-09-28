'use strict';

/**
 * Module dependencies.
 */
var domToReact = require('./lib/dom-to-react');
var htmlToDOM = (
    process.browser ?
    require('./lib/html-to-dom-client') :
    require('./lib/html-to-dom-server')
);

/**
 * Convert HTML string to React elements.
 *
 * @param  {String}   html              - The HTML string.
 * @param  {Object}   [options]         - The additional options.
 * @param  {Function} [options.replace] - The replace method.
 * @return {ReactElement|Array}
 */
function HTMLReactParser(html, options) {
    if (typeof html !== 'string') {
        throw new TypeError('First argument must be a string');
    }
    return domToReact(htmlToDOM(html), options);
}

/**
 * Export HTML to React parser.
 */
module.exports = HTMLReactParser;
