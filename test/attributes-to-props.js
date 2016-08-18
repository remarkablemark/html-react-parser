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
