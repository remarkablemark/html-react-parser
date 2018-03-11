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

    /**
     * HTML DOM property to React prop.
     */
    describe('HTML DOM', function() {

        it('converts attributes to React props', function() {
            assert.deepEqual(
                attributesToProps({
                    'class': 'ic',
                    'for': 'tran',
                    'http-equiv': 'refresh'
                }),
                {
                    className: 'ic',
                    htmlFor: 'tran',
                    httpEquiv: 'refresh'
                }
            );
        });

        it('converts standard properties to React props', function() {
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

        it('converts RDFa properties to React props', function() {
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

        it('converts non-standard properties to React props', function() {
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

        it('keeps `data-` and `aria-` attributes as is', function() {
            assert.deepEqual(
                attributesToProps({
                    'data-foo': 'bar',
                    'aria-live': 'polite'
                }),
                {
                    'data-foo': 'bar',
                    'aria-live': 'polite'
                }
            );
        });

        it('converts properties with weird capitalization', function() {
            assert.deepEqual(
                attributesToProps({
                    'ACCEPT-CHARSET': 'ISO-8859-1',
                    formNOvalidate: true,
                    sEcUrItY: 'restricted',
                    'data-FOO': 'bar'
                }),
                {
                    acceptCharset: 'ISO-8859-1',
                    formNoValidate: true,
                    security: 'restricted',
                    'data-FOO': 'bar'
                }
            );
        });

        it('converts bool properties', function() {
            assert.deepEqual(
                attributesToProps({
                    readonly: ''
                }),
                {
                    readOnly: true
                }
            );

            assert.deepEqual(
                attributesToProps({
                    disabled: 'disabled'
                }),
                {
                    disabled: true
                }
            );
        });

    });

    /**
     * SVG DOM property to React prop.
     */
    describe('SVG DOM properties', function() {

        it('converts attributes/properties to React props', function() {
            assert.deepEqual(
                attributesToProps({
                    edgeMode: 'edgeMode',
                    'fill-opacity': '0.42',
                    'fill-rule': 'evenodd',
                    'glyph-orientation-vertical': 'auto',
                    'horiz-adv-x': '9001',
                    stroke: 'none',
                    'xml:base': 'http://example.org'
                }),
                {
                    edgeMode: 'edgeMode',
                    fillOpacity: '0.42',
                    fillRule: 'evenodd',
                    glyphOrientationVertical: 'auto',
                    horizAdvX: '9001',
                    stroke: 'none',
                    xmlBase: 'http://example.org'
                }
            );
        });

        it('does not convert incorrectly capitalized properties', function() {
            assert.deepEqual(
                attributesToProps({
                    'XLINK:HREF': '#',
                    ychannelselector: 'G',
                    ZoomAndPan: 'disable'
                }),
                {
                    /*
                    xlinkHref: '#',
                    yChannelSelector: 'G',
                    zoomAndPan: 'disable'
                    */
                }
            );
        });

    });

    /**
     * Style string to object.
     */
    describe('style', function() {

        it('converts CSS style string to JS style object', function() {
            // proper css
            assert.deepEqual(
                attributesToProps({
                    style: 'color: #f00; font-size: 42px; z-index: -1; -moz-border-radius-topright: 10px; background: url(data:image/png; base64,ivborw0kggoaaaansaaaabgdbtueaalgpc/xhbqaaaafzmuexurczmzpf399fx1+bm5mzy9avzxbesmgces5/p8/t9furvcrmu73jwlzosgsiizurcjo/ad+eqjjb4hv8bft+idpqocx1wjosbfhh2xssxeiyn3uli/6mnree07uiwjev8u8czwyuqdlkpg1bkb4nnm+veanfhqn1k4+gpt6ugqcvu2h2ovuif)'
                }),
                {
                    style: {
                        color: '#f00',
                        fontSize: '42px',
                        zIndex: '-1',
                        MozBorderRadiusTopright: '10px',
                        background: 'url(data:image/png; base64,ivborw0kggoaaaansaaaabgdbtueaalgpc/xhbqaaaafzmuexurczmzpf399fx1+bm5mzy9avzxbesmgces5/p8/t9furvcrmu73jwlzosgsiizurcjo/ad+eqjjb4hv8bft+idpqocx1wjosbfhh2xssxeiyn3uli/6mnree07uiwjev8u8czwyuqdlkpg1bkb4nnm+veanfhqn1k4+gpt6ugqcvu2h2ovuif)'
                    }
                }
            );

            // valid but messy
            assert.deepEqual(
                attributesToProps({
                    style: 'border-bottom-left-radius:1em;border-right-style:solid;Z-Index:-1;-moz-border-radius-bottomleft:20px'
                }),
                {
                    style: {
                        borderBottomLeftRadius: '1em',
                        borderRightStyle: 'solid',
                        zIndex: '-1',
                        MozBorderRadiusBottomleft: '20px'
                    }
                }
            );
        });

    });

});
