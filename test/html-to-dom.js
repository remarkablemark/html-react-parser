'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var util = require('util');
var parseDOM = require('../lib/html-to-dom');
var htmlparser = require('htmlparser2');
var data = require('./data');

/**
 * Tests for `parseDOM`.
 */
describe('html-to-dom parser', function() {

    it('works the same as `require("htmlparser2").parseDOM`', function() {
        var html = data.html.complex;
        // use `util.inspect` to resolve circular references
        assert.equal(
            util.inspect(parseDOM(html), { showHidden: true, depth: null }),
            util.inspect(htmlparser.parseDOM(html), { showHidden: true, depth: null })
        );
    });

});
