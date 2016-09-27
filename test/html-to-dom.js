'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var util = require('util');
var jsdomify = require('jsdomify').default;
var htmlparser = require('htmlparser2');
var htmlToDOMServer = require('../lib/html-to-dom-server');
var htmlToDOMClient = require('../lib/html-to-dom-client');
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
                util.inspect(htmlToDOMServer(html), { showHidden: true, depth: null }),
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

        it('outputs the same result as the server parser', function() {
            var html = (
                data.html.attributes +
                data.html.nested +
                data.html.comment +
                data.html.script
            );

            helpers.deepEqualCircular(
                htmlToDOMClient(html),
                htmlToDOMServer(html)
            );
        });

        it('works with `window.DOMParser`', function() {
            var html = (
                data.html.attributes +
                data.html.nested +
                data.html.comment +
                data.html.script
            );

            // mock `window.DOMParser`
            // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
            window.DOMParser = function() {
                this.parseFromString = function(html) {
                    jsdomify.create(html);
                    return document;
                };
            };

            helpers.deepEqualCircular(
                htmlToDOMClient(html),
                htmlToDOMServer(html)
            );
        });
    });

});
