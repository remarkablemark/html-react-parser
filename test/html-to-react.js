'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var React = require('react');
var Parser = require('../');
var helpers = require('./helpers/');
var data = require('./data');

/**
 * Tests for `htmlToReact`.
 */
describe('html-to-react', function() {

    /**
     * Parser conversion.
     */
    describe('parser', function() {

        it('errors if first argument is not a string', function() {
            assert.throws(function() { Parser(); }, TypeError);

            [undefined, null, {}, [], 42].forEach(function(arg) {
                assert.throws(function() { Parser(arg); }, TypeError);
            });
        });

        it('returns original argument if it is unable to parse the HTML', function() {
            assert.equal(Parser('foo'), 'foo');
        });

        it('converts single HTML element to React', function() {
            var html = data.html.single;
            var reactElement = Parser(html);
            assert.equal(helpers.render(reactElement), html);
        });

        it('converts single HTML element and ignores comment', function() {
            var html = data.html.single;
            // comment should be ignored
            var reactElement = Parser(html + data.html.comment);
            assert.equal(helpers.render(reactElement), html);
        });

        it('converts multiple HTML elements to React', function() {
            var html = data.html.multiple;
            var reactElements = Parser(html);
            assert.equal(
                helpers.render(React.createElement('div', {}, reactElements)),
                '<div>' + html + '</div>'
            );
        });

        it('converts complex HTML to React', function() {
            var html = data.html.complex;
            var reactElement = Parser(html);
            assert.equal(helpers.render(reactElement), html);
        });

        it('converts empty <script> to React', function() {
            var html = '<script></script>';
            var reactElement = Parser(html);
            assert.equal(helpers.render(reactElement), html);
        });

        it('converts empty <style> to React', function() {
            var html = '<style></style>';
            var reactElement = Parser(html);
            assert.equal(helpers.render(reactElement), html);
        });

        it('converts SVG to React', function() {
            var svg = data.svg.complex;
            var reactElement = Parser(svg);
            assert.equal(helpers.render(reactElement), svg);
        });

    });

    /**
     * Options.
     */
    describe('options', function() {

        describe('replace', function() {

            it('overrides the element if replace is valid', function() {
                var html = data.html.complex;
                var reactElement = Parser(html, {
                    replace: function(node) {
                        if (node.name === 'title') {
                            return React.createElement('title', {}, 'Replaced Title');
                        }
                    }
                });
                assert.equal(
                    helpers.render(reactElement),
                    html.replace('<title>Title</title>', '<title>Replaced Title</title>')
                );
            });

            it('does not override the element if replace is invalid', function() {
                var html = data.html.complex;
                var reactElement = Parser(html, {
                    replace: function(node) {
                        if (node.attribs && node.attribs.id === 'header') {
                            return {
                                type: 'h1',
                                props: { children: 'Heading' }
                            };
                        }
                    }
                });
                assert.notEqual(
                    helpers.render(reactElement),
                    html.replace(
                        '<header id="header">Header</header>',
                        '<h1>Heading</h1>'
                    )
                );
            });

        });

    });

});
