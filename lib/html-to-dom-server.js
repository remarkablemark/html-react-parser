'use strict';

/**
 * Module dependencies.
 */
var Parser = require('htmlparser2/lib/Parser');
var DomHandler = require('domhandler');

/**
 * Parse HTML string to DOM nodes.
 * This is the same method as `require('htmlparser2').parseDOM`.
 *
 * @param  {String} html    - The HTML.
 * @param  {Object} options - The parser options.
 * @return {Object}         - The DOM nodes.
 */
function htmlToDOMServer(html, options) {
    var handler = new DomHandler(options);
    new Parser(handler, options).end(html);
    return handler.dom;
}

/**
 * Export HTML to DOM parser (server).
 */
module.exports = htmlToDOMServer;
