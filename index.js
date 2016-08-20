'use strict';

/**
 * Module dependencies.
 */
var htmlToDOM = require('./lib/html-to-dom');
var domToReact = require('./lib/dom-to-react');

/**
 * Convert HTML to React.
 *
 * @param  {String}   html              - The HTML.
 * @param  {Object}   [options]         - The additional options.
 * @param  {Function} [options.replace] - The replace method.
 * @return {ReactElement|Array}
 */
function htmlToReact(html, options) {
    return domToReact(htmlToDOM(html), options);
}

/**
 * Export HTML to React parser.
 */
module.exports = htmlToReact;
