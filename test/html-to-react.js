'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Parser = require('../');
var data = require('./data');

/**
 * Render a React element to static HTML markup.
 *
 * @param  {ReactElement} reactElement - The React element.
 * @return {String}                    - The static HTML markup.
 */
function render(reactElement) {
    return ReactDOMServer.renderToStaticMarkup(reactElement);
}

/**
 * Tests for `htmlToReact`.
 */
describe('html-to-react parser', function() {

    it('converts single HTML element to React', function() {
        var html = data.html.single;
        var reactElement = Parser(html);
        assert.equal(render(reactElement), html);
    });

    it('converts multiple HTML elements to React', function() {
        var html = data.html.multiple;
        var reactElements = Parser(html);
        assert.equal(
            render(React.createElement('div', {}, reactElements)),
            '<div>' + html + '</div>'
        );
    });

    it('converts complex HTML to React', function() {
        var html = data.html.complex;
        var reactElement = Parser(html);
        assert.equal(render(reactElement), html);
    });

});
