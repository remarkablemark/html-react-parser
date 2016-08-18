'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var React = require('react');
var htmlToDOM = require('../lib/html-to-dom');
var domToReact = require('../lib/dom-to-react');
var data = require('./data');

/**
 * Tests for `domToReact`.
 */
describe('dom-to-react parser', function() {

    it('converts single DOM node to React', function() {
        var html = data.html.single;
        var reactElement = domToReact(htmlToDOM(html));
        assert(React.isValidElement(reactElement));
        assert.deepEqual(
            reactElement,
            React.createElement('p', {}, 'foo')
        );
    });

});
