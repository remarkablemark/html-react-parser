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

    it('converts multiple DOM nodes to React', function() {
        var html = data.html.multiple;
        var reactElements = domToReact(htmlToDOM(html));
        reactElements.forEach(function(reactElement) {
            assert(React.isValidElement(reactElement));
            assert(reactElement.key);
        });
        assert.deepEqual(
            reactElements,
            [
                React.createElement('p', { key: 0 }, 'foo'),
                React.createElement('p', { key: 1 }, 'bar')
            ]
        );
    });

    // https://facebook.github.io/react/docs/forms.html#why-textarea-value
    it('converts <textarea> correctly', function() {
        var html = data.html.textarea;
        var reactElement = domToReact(htmlToDOM(html));
        assert(React.isValidElement(reactElement));
        assert.deepEqual(
            reactElement,
            React.createElement('textarea', {
                defaultValue: 'foo'
            }, null)
        );
    });

    it('converts <script> correctly', function() {
        var html = data.html.script;
        var reactElement = domToReact(htmlToDOM(html));
        assert(React.isValidElement(reactElement));
        assert.deepEqual(
            reactElement,
            React.createElement('script', {
                dangerouslySetInnerHTML: {
                    __html: 'alert(1 < 2);'
                }
            }, null)
        );
    });

});
