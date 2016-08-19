'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var attributesToProps = require('../lib/attributes-to-props');

/**
 * Tests for attributes to props helper.
 */
describe('attributes to props helper', function() {

    it('converts DOM attributes to React props', function() {
        assert.deepEqual(
            attributesToProps({
                'class': 'ic',
                'for': 'tran',
                'http-equiv': 'refresh'
            }),
            {
                className: 'ic',
                htmlFor: 'tran',
                httpEquiv: 'refresh',
            }
        );
    });

    it('converts DOM standard properties to React props', function() {
        assert.deepEqual(
            attributesToProps({
                allowfullscreen: true,
                charset: 'utf-8',
                tabindex: 1
            }),
            {
                allowFullScreen: true,
                charSet: 'utf-8',
                tabIndex: 1
            }
        );
    });

    it('converts DOM RDFa properties to React props', function() {
        assert.deepEqual(
            attributesToProps({
                property: 'foo',
                'typeof': 'bar'
            }),
            {
                property: 'foo',
                'typeof': 'bar'
            }
        );
    });

    it('converts DOM non-standard properties to React props', function() {
        assert.deepEqual(
            attributesToProps({
                itemscope: true,
                itemid: 1337
            }),
            {
                itemScope: true,
                itemID: 1337
            }
        );
    });

    it('converts CSS style string to JS style object', function() {
        // proper css
        assert.deepEqual(
            attributesToProps({
                style: 'color: #f00; font-size: 42px; z-index: -1;'
            }),
            {
                style: {
                    color: '#f00',
                    fontSize: '42px',
                    zIndex: '-1'
                }
            }
        );

        // valid but messy
        assert.deepEqual(
            attributesToProps({
                style: 'border-bottom-left-radius:1em;border-right-style:solid;Z-Index:-1'
            }),
            {
                style: {
                    borderBottomLeftRadius: '1em',
                    borderRightStyle: 'solid',
                    zIndex: '-1'
                }
            }
        );
    });

});
