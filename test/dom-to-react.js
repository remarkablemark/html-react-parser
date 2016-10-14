'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var React = require('react');
var htmlToDOM = require('html-dom-parser');
var domToReact = require('../lib/dom-to-react');
var helpers = require('./helpers/');
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

    it('does not escape <script> content', function() {
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

    it('does not escape <style> content', function() {
        var html = data.html.style;
        var reactElement = domToReact(htmlToDOM(html));
        assert(React.isValidElement(reactElement));
        assert.deepEqual(
            reactElement,
            React.createElement('style', {
                dangerouslySetInnerHTML: {
                    __html: 'body > .foo { color: #f00; }'
                }
            }, null)
        );
    });

    it('does not have `children` for void elements', function() {
        var html = data.html.img;
        var reactElement = domToReact(htmlToDOM(html));
        assert(!reactElement.props.children);
    });

    it('does not throw an error for void elements', function() {
        var html = data.html.void;
        var reactElements = domToReact(htmlToDOM(html));
        assert.doesNotThrow(function() {
            helpers.render(React.createElement('div', {}, reactElements));
        });
    });

    it('skips HTML comments', function() {
        var html = [data.html.single, data.html.comment, data.html.single].join('');
        var reactElements = domToReact(htmlToDOM(html));
        reactElements.forEach(function(reactElement) {
            assert(React.isValidElement(reactElement));
            assert(reactElement.key);
        });
        assert.deepEqual(
            reactElements,
            [
                React.createElement('p', { key: 0 }, 'foo'),
                // comment is in the middle
                React.createElement('p', { key: 2 }, 'foo')
            ]
        );
    });

});
