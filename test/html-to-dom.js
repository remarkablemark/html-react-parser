'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var util = require('util');
var jsdomify = require('jsdomify').default;
var htmlparser = require('htmlparser2');
var parseDOM = require('../lib/html-to-dom');
var formatDOM = require('../lib/html-to-dom-client');
var helpers = require('./helpers/');
var data = require('./data');

/**
 * Tests for HTML to DOM parser.
 */
describe('html-to-dom', function() {

    /**
     * Node environment.
     */
    describe('server parser', function() {

        it('works the same as `require("htmlparser2").parseDOM`', function() {
            var html = data.html.complex;
            // use `util.inspect` to resolve circular references
            assert.equal(
                util.inspect(parseDOM(html), { showHidden: true, depth: null }),
                util.inspect(htmlparser.parseDOM(html), { showHidden: true, depth: null })
            );
        });

    });

    /**
     * Browser environment.
     */
    describe('client parser', function() {

        // setup mock browser environment
        before(function() {
            jsdomify.create();
        });

        // teardown mock browser environment
        after(function() {
            jsdomify.destroy();
        });

        it('formats the nodes like `htmlparser2.parseDOM`', function() {
            var html = data.html.attributes + data.html.nested + data.html.comment + data.html.script;
            var root = document.createElement('div');
            root.innerHTML = html;
            var clientNodes = formatDOM(root.childNodes);
            var serverNodes = parseDOM(html);
            helpers.deepEqualCircular(clientNodes, serverNodes);
        });

    });

});
