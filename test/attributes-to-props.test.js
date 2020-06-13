const assert = require('assert');
const attributesToProps = require('../lib/attributes-to-props');
const utilities = require('../lib/utilities');

describe('attributes to props', () => {
  describe('HTML', () => {
    it('converts attributes to React props', () => {
      assert.deepEqual(
        attributesToProps({
          class: 'ic',
          for: 'tran',
          'http-equiv': 'refresh'
        }),
        {
          className: 'ic',
          htmlFor: 'tran',
          httpEquiv: 'refresh'
        }
      );
    });

    it('converts standard attributes to React props', () => {
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

    it('converts RDFa attributes to React props', () => {
      assert.deepEqual(
        attributesToProps({
          property: 'foo',
          typeof: 'bar'
        }),
        {
          property: 'foo',
          typeof: 'bar'
        }
      );
    });

    it('converts non-standard attributes to React props', () => {
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

    it('keeps `data-*` and `aria-*` attributes as is', () => {
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

    it('converts attributes with weird capitalization', () => {
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

    it('converts boolean attributes', () => {
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

    it('converts overloaded boolean attributes', () => {
      assert.deepEqual(
        attributesToProps({
          download: ''
        }),
        {
          download: true
        }
      );

      assert.deepEqual(
        attributesToProps({
          download: 'filename'
        }),
        {
          download: 'filename'
        }
      );
    });
  });

  describe('SVG', () => {
    it('converts attributes to React props', () => {
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

    it('keeps incorrectly capitalized attributes', () => {
      assert.deepEqual(
        attributesToProps({
          'XLINK:HREF': '#',
          YChannelSelector: 'G',
          ZoomAndPan: 'disable'
        }),
        {
          'XLINK:HREF': '#',
          YChannelSelector: 'G',
          ZoomAndPan: 'disable'
        }
      );
    });
  });

  // cssToJs
  describe('style', () => {
    it('parses empty inline style to object', () => {
      assert.deepEqual(attributesToProps({ style: '' }), { style: {} });
    });

    it('does not parse CSS comment', () => {
      assert.deepEqual(attributesToProps({ style: '/* comment */' }), {
        style: {}
      });
    });

    it('parses inline style to object', () => {
      assert.deepEqual(
        attributesToProps({
          style:
            'color: #f00; font-size: 42px; z-index: -1; -moz-border-radius-topright: 10px; background: url(data:image/png; base64,ivborw0kggoaaaansaaaabgdbtueaalgpc/xhbqaaaafzmuexurczmzpf399fx1+bm5mzy9avzxbesmgces5/p8/t9furvcrmu73jwlzosgsiizurcjo/ad+eqjjb4hv8bft+idpqocx1wjosbfhh2xssxeiyn3uli/6mnree07uiwjev8u8czwyuqdlkpg1bkb4nnm+veanfhqn1k4+gpt6ugqcvu2h2ovuif)'
        }),
        {
          style: {
            color: '#f00',
            fontSize: '42px',
            zIndex: '-1',
            MozBorderRadiusTopright: '10px',
            background:
              'url(data:image/png; base64,ivborw0kggoaaaansaaaabgdbtueaalgpc/xhbqaaaafzmuexurczmzpf399fx1+bm5mzy9avzxbesmgces5/p8/t9furvcrmu73jwlzosgsiizurcjo/ad+eqjjb4hv8bft+idpqocx1wjosbfhh2xssxeiyn3uli/6mnree07uiwjev8u8czwyuqdlkpg1bkb4nnm+veanfhqn1k4+gpt6ugqcvu2h2ovuif)'
          }
        }
      );

      assert.deepEqual(
        attributesToProps({
          style:
            'border-bottom-left-radius:1em;border-right-style:solid;Z-Index:-1;-moz-border-radius-bottomleft:20px'
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

      assert.deepEqual(
        attributesToProps({
          style: null
        }),
        {
          style: null
        }
      );

      assert.deepEqual(
        attributesToProps({
          style: undefined
        }),
        {
          style: undefined
        }
      );
    });
  });

  describe('custom', () => {
    it('converts attributes named after Object properties', () => {
      // handled as custom attributes
      const attributes = {
        __defineGetter__: '',
        __defineSetter__: '',
        __lookupGetter__: '',
        __lookupSetter__: '',
        __proto__: '',
        constructor: '',
        hasOwnProperty: '',
        isPrototypeOf: '',
        propertyIsEnumerable: '',
        toLocaleString: '',
        toString: '',
        valueOf: ''
      };
      assert.deepEqual(attributesToProps(attributes), attributes);
    });

    describe('when utilties.PRESERVE_CUSTOM_ATTRIBUTES=false', () => {
      const { PRESERVE_CUSTOM_ATTRIBUTES } = utilities;

      beforeAll(() => {
        utilities.PRESERVE_CUSTOM_ATTRIBUTES = false;
      });

      afterAll(() => {
        utilities.PRESERVE_CUSTOM_ATTRIBUTES = PRESERVE_CUSTOM_ATTRIBUTES;
      });

      it('omits unknown attributes', () => {
        assert.deepEqual(
          attributesToProps({
            unknownAttribute: 'someValue'
          }),
          {}
        );
      });

      it('omits incorrectly capitalized attributes', () => {
        assert.deepEqual(
          attributesToProps({
            'XLINK:HREF': '#',
            YChannelSelector: 'G',
            ZoomAndPan: 'disable'
          }),
          {}
        );
      });
    });
  });
});
