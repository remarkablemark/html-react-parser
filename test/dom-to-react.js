'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var React = require('react');
var htmlToDOM = require('html-dom-parser');
var domToReact = require('../lib/dom-to-react');
var helpers = require('./helpers/');
var mocks = helpers.mocks;
var render = helpers.render;

/**
 * Tests for `domToReact`.
 */
describe('dom-to-react parser', function() {

    it('converts single DOM node to React', function() {
        var html = mocks.html.single;
        var reactElement = domToReact(htmlToDOM(html));

        assert(React.isValidElement(reactElement));
        assert.deepEqual(
            reactElement,
            React.createElement('p', {}, 'foo')
        );
    });

    it('converts multiple DOM nodes to React', function() {
        var html = mocks.html.multiple;
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
        var html = mocks.html.textarea;
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
        var html = mocks.html.script;
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
        var html = mocks.html.style;
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
        var html = mocks.html.img;
        var reactElement = domToReact(htmlToDOM(html));
        assert(!reactElement.props.children);
    });

    it('does not throw an error for void elements', function() {
        var html = mocks.html.void;
        var reactElements = domToReact(htmlToDOM(html));
        assert.doesNotThrow(function() {
            render(React.createElement('div', {}, reactElements));
        });
    });

    it('skips doctype and comments', function() {
        var html = [
            mocks.html.doctype,
            mocks.html.single,
            mocks.html.comment,
            mocks.html.single
        ].join('');

        var reactElements = domToReact(htmlToDOM(html));
        reactElements.forEach(function(reactElement) {
            assert(React.isValidElement(reactElement));
            assert(reactElement.key);
        });

        assert.deepEqual(
            reactElements,
            [
                // doctype
                React.createElement('p', { key: 1 }, 'foo'),
                // comment is in the middle
                React.createElement('p', { key: 3 }, 'foo')
            ]
        );
    });

    
    it('handles svg\'s with a viewBox', function() {
        var html = mocks.html.svg;
        var reactElement = domToReact(htmlToDOM(html, { lowerCaseAttributeNames: false }));

        console.log(reactElement);

        assert.deepEqual(
            reactElement,
            React.createElement('svg', { viewBox: '0 0 512 512', id: 'foo' }, 'Inner')
        );
    });
});
